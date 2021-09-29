import { APPSTORE_ID, DEFAULT_REGION, DEFAULT_REGION_DELTA, IS_IOS, IS_RATED, PLAYSTORE_PACKAGE_NAME, RATE_OPEN_TIMES_KEY, RATE_PERIOD } from '../../constants/values';
import { IS_SIGNEDUP, useUpdateFcmToken } from '../../graphql/user';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import NaverMapView, { Coord, Marker, Region } from "react-native-nmap";


import { AuthContext } from '..';
import Geolocation from '@react-native-community/geolocation';
import HomeHeader from './HomeHeader'
import MyPosFab from '../../components/fabs/MyPosFab';
import HomePetMarker from './HomePetMarker';
import ScreenLayout from '../../components/layout/ScreenLayout';
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import auth from '@react-native-firebase/auth'
import { isSignedup } from '../../graphql/__generated__/isSignedup';
import useAuth from '../../hooks/useAuth';
import { usePetGroupByAddress } from '../../graphql/pet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeGroupByAddressBottomSheet from './HomeGroupByAddressBottomSheet';
import HomeRefetchButton from './HomeRefetchButton';
import { petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PermissionsAndroid } from 'react-native';
import Rate from 'react-native-rate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalUi from '../../hooks/useGlobalUi';

interface HomeScreenContextInterface {
    selectedGroupByAddress: petGroupByAddress_petGroupByAddress_petGroup | null
    setSelectedGroupByAddress: (v: petGroupByAddress_petGroupByAddress_petGroup | null) => void
    bottomSheetSnapIndex: number
    setBottomSheetSnapIndex: (v: number) => void
    mapRef: React.RefObject<NaverMapView>
}


export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const mapRef = useRef<NaverMapView>(null)
    // const mapView = useRef<NaverMapView>(null);

    const { query } = useApolloClient()
    const { navigate } = useNavigation()

    const { user } = useContext(AuthContext)
    const { confirm } = useGlobalUi()
    const { logout } = useAuth()
    const { bottom } = useSafeAreaInsets()


    const [myPos, setMyPos] = useState<Coord | null>(null)
    const [cameraRegion, setCameraRegion] = useState<Region | null>(null)

    const [petGroupByAddress, { data: petGroupByAddressData, loading: petGroupByAddressLoading }] = usePetGroupByAddress()
    const [petGroupByAddressRefetchEnable, setPetGroupByAddressRefetchEnable] = useState(false)
    // Context Values
    const [selectedGroupByAddress, setSelectedGroupByAddress] = useState<petGroupByAddress_petGroupByAddress_petGroup | null>(null)
    const [bottomSheetSnapIndex, setBottomSheetSnapIndex] = useState(-1)
    const contextValue = useMemo<HomeScreenContextInterface>(() => ({
        selectedGroupByAddress,
        setSelectedGroupByAddress,
        bottomSheetSnapIndex,
        setBottomSheetSnapIndex,
        mapRef
    }), [selectedGroupByAddress, setSelectedGroupByAddress, mapRef, setBottomSheetSnapIndex, bottomSheetSnapIndex])



    useEffect(() => {
        // 회원가입 안되있을시 파이어베이스 로그아웃
        (async () => {
            if (!auth().currentUser) return // 파이어베이스 로그인이 안되어있다면 이 프로세스와는 무관함
            const { data } = await query<isSignedup, {}>({ query: IS_SIGNEDUP, fetchPolicy: 'network-only' })
            if (!data.isSignedup) logout()
        })()


        let watch: number

        (async () => {

            // 권한 요청
            if (IS_IOS) Geolocation.requestAuthorization()
            else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (!granted) return
            }

            // 최초 1회 카메라 위치, 내 위치 지정
            Geolocation.getCurrentPosition(
                (position) => {
                    setMyPos({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    const defaultCameraRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        ...DEFAULT_REGION_DELTA
                    }
                    mapRef.current?.animateToRegion(defaultCameraRegion)
                    petGroupByAddress({ variables: { cameraRegion: defaultCameraRegion } })
                },
                (error) => { console.log(error.code, error.message) }
            )

            // 내 위치로 사용할 위치 옵져빙
            watch = Geolocation.watchPosition(
                (position) => setMyPos({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                (error) => { console.log(error.code, error.message) }
            )
        })()

        return () => {
            Geolocation.clearWatch(watch)
        }
    }, [])

    useEffect(() => {
        setPetGroupByAddressRefetchEnable(false)
    }, [petGroupByAddressLoading])

    const onPetGroupByAddressRefetch = useCallback(() => {
        if (!cameraRegion) return
        if (!petGroupByAddressRefetchEnable) return

        petGroupByAddress({ variables: { cameraRegion } })
    }, [petGroupByAddressRefetchEnable, cameraRegion])

    const onMyPos = useCallback(() => {
        setSelectedGroupByAddress(null)
        if (!myPos) return
        mapRef.current?.animateToRegion({
            latitude: myPos.latitude,
            longitude: myPos.longitude,
            ...DEFAULT_REGION_DELTA
        })
    }, [myPos, setSelectedGroupByAddress])

    const onRegionChange = useCallback(async (event: {
        latitude: number;
        longitude: number;
        zoom: number;
        contentsRegion: [Coord, Coord, Coord, Coord, Coord];
        coveringRegion: [Coord, Coord, Coord, Coord, Coord];
    }) => {

        if (!petGroupByAddressLoading) setPetGroupByAddressRefetchEnable(true)

        const latitudeDelta = event.coveringRegion[1].latitude - event.coveringRegion[0].latitude
        const longitudeDelta = event.coveringRegion[2].longitude - event.coveringRegion[1].longitude

        setCameraRegion({
            latitude: event.latitude,
            longitude: event.longitude,
            latitudeDelta,
            longitudeDelta
        })
    }, [setCameraRegion])


    // 평가요청
    const onRate = useCallback(async () => {
        const openTimes = Number(await AsyncStorage.getItem(RATE_OPEN_TIMES_KEY) || 0)
        const isRated = !!(await AsyncStorage.getItem(IS_RATED))

        await AsyncStorage.setItem(RATE_OPEN_TIMES_KEY, (openTimes + 1).toString())
        if (isRated) return

        if (openTimes !== 0 && openTimes % RATE_PERIOD === 0) {
            confirm({
                title: '평가남기기',
                content: '평가는 개발자에게 힘이 됩니다!',
                noText: '다음에',
                yesText: '지금',
                onPress: (isYes) => {
                    if (!isYes) return
                    Rate.rate({
                        AppleAppID: APPSTORE_ID,
                        GooglePackageName: PLAYSTORE_PACKAGE_NAME,
                        preferInApp: true,
                        openAppStoreIfInAppFails: true
                    }, async (success) => {
                        if (success) await AsyncStorage.setItem(IS_RATED, JSON.stringify(true))
                    })
                }
            })
        }
    }, [])

    useEffect(() => { onRate() }, [])
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
                        <HomePetMarker {...v} groupBy={petGroupByAddressData.petGroupByAddress.groupBy} key={v.id} />
                    ))}
                    {myPos && <Marker
                        zIndex={-1}
                        coordinate={myPos}
                        width={56}
                        height={56}
                        image={require('../../assets/my-pos.png')}
                    />}
                </NaverMapView>

                {/* <HomeHeader /> */}
                <HomeRefetchButton onPress={onPetGroupByAddressRefetch} enable={bottomSheetSnapIndex === -1 && petGroupByAddressRefetchEnable} />
                <MyPosFab onPress={onMyPos} />
                <TabScreenBottomTabBar isMap />
                <HomeGroupByAddressBottomSheet />
            </ScreenLayout>
        </HomeScreenContext.Provider>
    )
}

export default Home
