import { COLOR2, DEFAULT_SHADOW, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles';
import { DEFAULT_REGION, DEFAULT_REGION_DELTA, IS_IOS } from '../../constants/values';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { IS_SIGNEDUP, useIsSignedup, useUpdateFcmToken } from '../../graphql/user';
import MapView, { Coordinate, LatLng, Marker, Region } from 'react-native-maps';
import PushNotification, { Importance } from 'react-native-push-notification';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AuthContext } from '..';
import Geolocation from '@react-native-community/geolocation';
import HomeHeader from './HomeHeader'
import MyPosFab from '../../components/fabs/MyPosFab';
import PetMarker from './PetMarker';
import PetsBottomSheet from './PetsBottomSheet';
import ScreenLayout from '../../components/layout/ScreenLayout';
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import auth from '@react-native-firebase/auth'
import { isSignedup } from '../../graphql/__generated__/isSignedup';
import useAuth from '../../hooks/useAuth';
import { usePetGroupByAddress } from '../../graphql/pet';

interface HomeScreenContextInterface {
    selectedPetGroupId: string | null
    setSelectedPetGroupId: (v: string | null) => void
    mapRef: React.RefObject<MapView>
}

export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const mapRef = useRef<MapView>(null)

    const { query } = useApolloClient()
    const { navigate } = useNavigation()

    const { user } = useContext(AuthContext)
    const { logout } = useAuth()
    const [updateFcmToken] = useUpdateFcmToken()


    const [cameraPos, setCameraPos] = useState<Region>(DEFAULT_REGION)

    const { data: petGroupByAddressData } = usePetGroupByAddress({ variables: { cameraRegion: cameraPos } })

    const [myPos, setMyPos] = useState<LatLng | null>(null)

    // Context Values
    const [selectedPetGroupId, setSelectedPetGroupId] = useState<string | null>(null)
    const contextValue = useMemo<HomeScreenContextInterface>(() => ({
        selectedPetGroupId,
        setSelectedPetGroupId,
        mapRef
    }), [selectedPetGroupId, setSelectedPetGroupId, mapRef])


    // 회원가입 안되있을시 파이어베이스 로그아웃
    useEffect(() => {
        (async () => {
            if (!auth().currentUser) return // 파이어베이스 로그인이 안되어있다면 이 프로세스와는 무관함
            const { data } = await query<isSignedup, {}>({ query: IS_SIGNEDUP, fetchPolicy: 'network-only' })
            if (!data.isSignedup) logout()
        })()

    }, [])

    // 내위치 초기화
    useEffect(() => {
        if (IS_IOS) Geolocation.requestAuthorization()

        // 최초 1회 카메라 위치, 내 위치 지정
        Geolocation.getCurrentPosition(
            (position) => {
                setMyPos({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                setTimeout(() => {
                    mapRef.current?.animateToRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        ...DEFAULT_REGION_DELTA
                    })
                }, 500); // animateToRegion이 안드로이드에서 앱을켠후 작동가능까지 조금 시간이 걸리는 듯

            },
            (error) => { console.log(error.code, error.message) }
        )

        // 내 위치로 사용할 위치 옵져빙
        const watch = Geolocation.watchPosition(
            (position) => {
                setMyPos({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            (error) => { console.log(error.code, error.message) }
        )

        return () => {
            Geolocation.clearWatch(watch)
        }
    }, [])

    const onMyPos = useCallback(() => {
        setSelectedPetGroupId(null)
        if (!myPos) return
        mapRef.current?.animateToRegion({
            latitude: myPos.latitude,
            longitude: myPos.longitude,
            ...DEFAULT_REGION_DELTA
        })
    }, [myPos])

    // PUSH MESSAGE ------------------------------------------------------------------------------------------------------------------------------------------------------//

    // foreground push listner
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (message: FirebaseMessagingTypes.RemoteMessage) => {
            if (message.notification) {
                PushNotification.localNotification({
                    message: message.notification.body || '',
                    title: message.notification.title,
                    bigPictureUrl: message.notification.android?.imageUrl,
                    playSound: false,
                    vibrate: false
                })
            }
        })
        return unsubscribe
    }, [])

    // background push listner
    useEffect(() => {
        const backgroundNotificationHandler = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            const data = remoteMessage.data
            if (!data) return
            if (data.type === 'chat') {
                console.log(data.chatRoomId)
                navigate('ChatDetail', { id: Number(data.chatRoomId) })
            }
        }
        // 푸시를 눌러서 열었을때 IOS는 백그라운드, QUIT상태 둘다 onNotificationOpendApp이 작동함
        // 안드로이드는 백그라운드 상태에서만 onNotificationOpendApp이 작동해서 푸시 눌러서 앱 초기 실행할때는 messaging().getInitialNotification() 로 처리해주세요
        messaging().onNotificationOpenedApp(backgroundNotificationHandler)
        // android quit push listner
        // Android Only ios는 언제나 null
        // 트리거 형식이라 한번만 작동함
        messaging().getInitialNotification().then((remoteMessage) => remoteMessage ? backgroundNotificationHandler(remoteMessage) : null)
    }, [])


    // fcm token listner
    useEffect(() => {
        if (!user) return

        const fcmInit = async () => {
            await messaging().requestPermission()
            const token = await messaging().getToken()
            await updateFcmToken({ variables: { token } })
        }

        const fcmRefresh = async (token: string) => {
            await updateFcmToken({ variables: { token } })
        }

        fcmInit()
        return messaging().onTokenRefresh(fcmRefresh)
    }, [user])
    // ------------------------------------------------------------------------------------------------------------------------------------------------------//



    return (
        <HomeScreenContext.Provider value={contextValue} >
            <ScreenLayout translucent >
                <MapView
                    ref={mapRef}
                    style={{ flex: 1, zIndex: -999 }}
                    rotateEnabled={false}
                    initialRegion={cameraPos}
                    mapPadding={{ bottom: IS_IOS ? 56 : 0, top: IS_IOS ? 56 : 0, left: 0, right: 0 }}
                >
                    {petGroupByAddressData?.petGroupByAddress.petGroup.map((v) => (
                        <PetMarker {...v} groupBy={petGroupByAddressData.petGroupByAddress.groupBy} key={v.id} />
                    ))}
                    {myPos && <Marker
                        coordinate={myPos}
                    >
                        <View style={[{ width: 24, height: 24, backgroundColor: COLOR2 }, styles.myPosMarker]}>
                            <View style={[{ width: 20, height: 20, backgroundColor: '#fff', }, styles.myPosMarker]}>
                                <View style={[{ width: 16, height: 16, backgroundColor: COLOR2, }, styles.myPosMarker]} />
                            </View>
                        </View>
                    </Marker>}
                </MapView>


                <HomeHeader />
                <MyPosFab onPress={onMyPos} />
                <TabScreenBottomTabBar isMap smallMode={!!selectedPetGroupId} />

                <PetsBottomSheet />
            </ScreenLayout>
        </HomeScreenContext.Provider>
    )
}

export default Home

const styles = StyleSheet.create({
    myPosMarker: {
        alignItems: 'center',
        justifyContent: 'center',
        ...DEFAULT_SHADOW,
        borderRadius: 20,
        elevation: 0
    }
})
