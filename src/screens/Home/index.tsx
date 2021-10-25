import { DEFAULT_REGION_LAT_LOG, DELTA_LEVEL, DEVICE_RATIO, IS_IOS } from '../../constants/values';
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import NaverMapView, { Coord, Marker, Region } from "react-native-nmap";


import Geolocation from '@react-native-community/geolocation';
import MyPosFab from '../../components/fabs/MyPosFab';
import HomePetMarker from './HomePetMarker';
import ScreenLayout from '../../components/layout/ScreenLayout';
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import { usePetGroupByAddress } from '../../graphql/pet';
import HomeGroupByAddressBottomSheet from './HomeGroupByAddressBottomSheet';
import { petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress';
import { ActivityIndicator, PermissionsAndroid, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR1, DEFAULT_SHADOW } from '../../constants/styles';
import HomeZoom from './HomeZoom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useNavigation from '../../hooks/useNavigation'
import Icon from 'react-native-vector-icons/MaterialIcons'


interface HomeScreenContextInterface {
    selectedGroupByAddress: petGroupByAddress_petGroupByAddress_petGroup | null
    setSelectedGroupByAddress: (v: petGroupByAddress_petGroupByAddress_petGroup | null) => void
    bottomSheetSnapIndex: number
    setBottomSheetSnapIndex: (v: number) => void
    mapRef: React.RefObject<NaverMapView>
    cameraRegion: Region | null
    zoomLevel: number, setZoomLevel: (n: number) => void
}


export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const mapRef = useRef<NaverMapView>(null)

    const [myPos, setMyPos] = useState<Coord | null>(null)
    const [cameraRegion, setCameraRegion] = useState<Region | null>(null)
    const [zoomLevel, setZoomLevel] = useState(0)

    const [petGroupByAddress, { data: petGroupByAddressData, loading: petGroupByAddressLoading }] = usePetGroupByAddress()
    // Context Values
    const [selectedGroupByAddress, setSelectedGroupByAddress] = useState<petGroupByAddress_petGroupByAddress_petGroup | null>(null)
    const [bottomSheetSnapIndex, setBottomSheetSnapIndex] = useState(-1)
    const contextValue = useMemo<HomeScreenContextInterface>(() => ({
        selectedGroupByAddress,
        setSelectedGroupByAddress,
        bottomSheetSnapIndex,
        setBottomSheetSnapIndex,
        mapRef,
        cameraRegion,
        zoomLevel, setZoomLevel
    }), [selectedGroupByAddress, setSelectedGroupByAddress, mapRef, setBottomSheetSnapIndex, bottomSheetSnapIndex, cameraRegion, zoomLevel, setZoomLevel])



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
                        ...DELTA_LEVEL[zoomLevel]
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
        if (!cameraRegion) return
        mapRef.current?.animateToRegion({
            ...cameraRegion,
            ...DELTA_LEVEL[zoomLevel]
        })
    }, [zoomLevel, mapRef])


    const onMyPos = useCallback(() => {
        setSelectedGroupByAddress(null)
        if (!myPos) return
        mapRef.current?.animateToRegion({
            latitude: myPos.latitude,
            longitude: myPos.longitude,
            ...DELTA_LEVEL[zoomLevel]
        })
    }, [myPos, setSelectedGroupByAddress, zoomLevel])

    const onRegionChange = useCallback(async (event: {
        latitude: number
        longitude: number
        zoom: number
        contentsRegion: [Coord, Coord, Coord, Coord, Coord]
        coveringRegion: [Coord, Coord, Coord, Coord, Coord]
    }) => {

        if (selectedGroupByAddress) return

        const latitudeDelta = event.coveringRegion[1].latitude - event.coveringRegion[0].latitude
        const longitudeDelta = event.coveringRegion[2].longitude - event.coveringRegion[1].longitude

        setCameraRegion({
            latitude: event.latitude,
            longitude: event.longitude,
            latitudeDelta,
            longitudeDelta
        })

        petGroupByAddress({
            variables: {
                cameraRegion: {
                    latitude: event.latitude,
                    longitude: event.longitude,
                    ...DELTA_LEVEL[zoomLevel]
                }
            }
        })

    }, [setCameraRegion, selectedGroupByAddress, zoomLevel])



    return (
        <HomeScreenContext.Provider value={contextValue} >
            <ScreenLayout translucent style={{ justifyContent: 'center' }}  >
                <NaverMapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    onCameraChange={onRegionChange}
                    useTextureView={false}
                    showsMyLocationButton={false}
                    scaleBar={false}
                    zoomControl={false}
                    zoomGesturesEnabled={false}
                    rotateGesturesEnabled={false}
                    tiltGesturesEnabled={false}
                    mapPadding={{ bottom: IS_IOS ? 56 : 0, top: IS_IOS ? 56 : 0 }}
                    logoMargin={{ left: 16, bottom: 56 }}
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
                <HomeZoom />
                {!selectedGroupByAddress && <Pressable style={[styles.petListBtn, { bottom: bottom + 56 + 32 }]} onPress={() => navigate('PetList')} >
                    <Icon name="menu" size={16} color="#fff" />
                    <Text style={styles.petListBtnText} >모아보기</Text>
                </Pressable>}
                <MyPosFab onPress={onMyPos} />
                <TabScreenBottomTabBar isMap />
                {petGroupByAddressLoading && <View pointerEvents='none' style={styles.loading}><ActivityIndicator color={COLOR1} size='large' /></View>}
                <HomeGroupByAddressBottomSheet />
            </ScreenLayout>
        </HomeScreenContext.Provider>
    )
}

export default Home

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    petListBtn: {
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR1,
        paddingHorizontal: 16,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#fff',
        ...DEFAULT_SHADOW
    },
    petListBtnText: {
        color: '#fff',
        marginLeft: 8
    }
})