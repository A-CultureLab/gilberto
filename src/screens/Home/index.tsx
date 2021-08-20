import { COLOR1, COLOR2, DEFAULT_SHADOW, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles';
import { DEFAULT_REGION, DEFAULT_REGION_DELTA, IS_IOS } from '../../constants/values';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { IS_SIGNEDUP, useUpdateFcmToken } from '../../graphql/user';
import PushNotification, { Importance } from 'react-native-push-notification';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import NaverMapView, { Coord, Marker } from "react-native-nmap";


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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeScreenContextInterface {
    selectedPetGroupId: string | null
    setSelectedPetGroupId: (v: string | null) => void
    mapRef: React.RefObject<NaverMapView>
}


export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const mapRef = useRef<NaverMapView>(null)
    // const mapView = useRef<NaverMapView>(null);


    const { query } = useApolloClient()
    const { navigate } = useNavigation()

    const { user } = useContext(AuthContext)
    const { logout } = useAuth()
    const [updateFcmToken] = useUpdateFcmToken()
    const { bottom } = useSafeAreaInsets()


    const [myPos, setMyPos] = useState<Coord | null>(null)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

    const [petGroupByAddress, { data: petGroupByAddressData, loading: petGroupByAddressLoading }] = usePetGroupByAddress()

    // Context Values
    const [selectedPetGroupId, setSelectedPetGroupId] = useState<string | null>(null)
    const contextValue = useMemo<HomeScreenContextInterface>(() => ({
        selectedPetGroupId,
        setSelectedPetGroupId,
        mapRef
    }), [selectedPetGroupId, setSelectedPetGroupId, mapRef])


    useEffect(() => {
        // 회원가입 안되있을시 파이어베이스 로그아웃
        (async () => {
            if (!auth().currentUser) return // 파이어베이스 로그인이 안되어있다면 이 프로세스와는 무관함
            const { data } = await query<isSignedup, {}>({ query: IS_SIGNEDUP, fetchPolicy: 'network-only' })
            if (!data.isSignedup) logout()
        })()

        // 내위치 초기화
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

    const onRegionChange = useCallback(async (event: {
        latitude: number;
        longitude: number;
        zoom: number;
        contentsRegion: [Coord, Coord, Coord, Coord, Coord];
        coveringRegion: [Coord, Coord, Coord, Coord, Coord];
    }) => {
        if (timer) clearTimeout(timer)
        if (!!selectedPetGroupId) return
        if (petGroupByAddressLoading) return

        const latitudeDelta = event.coveringRegion[1].latitude - event.coveringRegion[0].latitude
        const longitudeDelta = event.coveringRegion[2].longitude - event.coveringRegion[1].longitude

        const id = setTimeout(() => {
            setTimer(null)
            petGroupByAddress({
                variables: {
                    cameraRegion: {
                        latitude: event.latitude,
                        longitude: event.longitude,
                        latitudeDelta,
                        longitudeDelta
                    }
                }
            })
        }, 1000)
        setTimer(id)
    }, [timer, selectedPetGroupId, petGroupByAddressLoading, petGroupByAddressData])


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
                navigate('ChatDetail', { id: data.chatRoomId })
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
                <NaverMapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    onCameraChange={onRegionChange}
                    useTextureView={false}
                    showsMyLocationButton={false}
                    scaleBar={false}
                    zoomControl={false}
                    rotateGesturesEnabled={false}
                    tiltGesturesEnabled={false}
                    mapPadding={{ bottom: IS_IOS ? 56 : 0, top: IS_IOS ? 56 : 0 }}
                    logoMargin={{ bottom: 56 + 16 + bottom, left: 16 }}
                    //@ts-ignore
                    useTextureView
                >
                    {petGroupByAddressData?.petGroupByAddress.petGroup.map((v) => (
                        <PetMarker {...v} groupBy={petGroupByAddressData.petGroupByAddress.groupBy} key={v.id} />
                    ))}
                    {myPos && <Marker
                        zIndex={-1}
                        coordinate={myPos}
                        width={56}
                        height={56}
                        image={require('../../assets/my-pos.png')}
                    />}
                </NaverMapView>

                <HomeHeader />
                <MyPosFab onPress={onMyPos} />
                <TabScreenBottomTabBar isMap smallMode={!!selectedPetGroupId} />
                {/* <PetsBottomSheet /> */}
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
