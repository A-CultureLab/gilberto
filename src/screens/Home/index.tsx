import { IS_IOS } from '../../constants/values';
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client';
import NaverMapView, { Coord, Marker, Region } from "react-native-nmap";


import Geolocation from '@react-native-community/geolocation';
import MyPosFab from '../../components/fabs/MyPosFab';
import HomePetMarker from './HomePetMarker';
import ScreenLayout from '../../components/layout/ScreenLayout';
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import useAuth from '../../hooks/useAuth';
import { usePetGroupByAddress } from '../../graphql/pet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeGroupByAddressBottomSheet from './HomeGroupByAddressBottomSheet';
import HomeRefetchButton from './HomeRefetchButton';
import { petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress';
import { PermissionsAndroid } from 'react-native';

export const DEFAULT_REGION_DELTA: Omit<Region, 'latitude' | 'longitude'> = {
    latitudeDelta: 0.47,
    longitudeDelta: 0.235
}

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
