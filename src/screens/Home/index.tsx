import { COLOR2, DEFAULT_SHADOW, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import MapView, { Coordinate, LatLng, Marker, Region } from 'react-native-maps';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

import { AuthContext } from '..';
import Geolocation from '@react-native-community/geolocation';
import HomeHeader from './HomeHeader'
import { DEFAULT_REGION, DEFAULT_REGION_DELTA, IS_IOS } from '../../constants/values';
import MyPosFab from '../../components/fabs/MyPosFab';
import PetMarker from './PetMarker';
import PetsBottomSheet from './PetsBottomSheet';
import ScreenLayout from '../../components/layout/ScreenLayout';
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import auth from '@react-native-firebase/auth'
import { useIsSignedup, useUpdateFcmToken } from '../../graphql/user';
import { useMapPets } from '../../graphql/pet';
import { useNavigation, useRoute } from '@react-navigation/native';
import PushNotification, { Importance } from 'react-native-push-notification';
import useAuth from '../../hooks/useAuth';


interface HomeScreenContextInterface {
    selectedPostcode: string | null
    setSelectedPostcode: (v: string | null) => void
    mapRef: React.RefObject<MapView>
}

export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const mapRef = useRef<MapView>(null)

    const { navigate } = useNavigation()

    const { user } = useContext(AuthContext)
    const { logout } = useAuth()
    const { data } = useIsSignedup({ fetchPolicy: 'network-only' })
    const [updateFcmToken] = useUpdateFcmToken()


    const [cameraPos, setCameraPos] = useState<Region>(DEFAULT_REGION)

    const { data: mapPetsData } = useMapPets({ variables: { cameraRegion: cameraPos } })

    const [myPos, setMyPos] = useState<LatLng | null>(null)
    const [cameraInitTrigger, setCameraInitTrigger] = useState(true)

    // Context Values
    const [selectedPostcode, setSelectedPostcode] = useState<string | null>(null)
    const contextValue = useMemo(() => ({
        selectedPostcode,
        setSelectedPostcode,
        mapRef
    }), [selectedPostcode, setSelectedPostcode, mapRef])


    // 회원가입 안되있을시 파이어베이스 로그아웃
    useEffect(() => {
        if (!auth().currentUser) return
        if (!data) return
        if (!data.isSignedup) logout()
    }, [data])

    // 내위치 초기화
    useEffect(() => {
        if (IS_IOS) Geolocation.requestAuthorization()
        const watch = Geolocation.watchPosition(
            (position) => {
                // setMyPos(position.coords)
            },
            (error) => { console.log(error.code, error.message) }
        )
        return () => {
            watch && Geolocation.clearWatch(watch)
        }
    }, [])

    // 카메라 초기화
    useEffect(() => {
        if (!myPos) return
        if (cameraInitTrigger) {
            mapRef.current?.animateToRegion({
                latitude: myPos.latitude,
                longitude: myPos.longitude,
                ...DEFAULT_REGION_DELTA
            })
            setCameraInitTrigger(false)
        }
    }, [myPos])

    const onMyPos = useCallback(() => {
        setSelectedPostcode(null)
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
                    {mapPetsData?.mapPets.map((v) => (
                        <PetMarker {...v} key={v.address.postcode} />
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
                <TabScreenBottomTabBar isMap smallMode={!!selectedPostcode} />

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
