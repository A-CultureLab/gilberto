import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import MapView, { Coordinate, LatLng, Marker, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { IS_IOS } from '../../constants/values';
import { COLOR2, DEFAULT_SHADOW, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles';
import ScreenLayout from '../../components/layout/ScreenLayout';
import MyPosFab from '../../components/fabs/MyPosFab';
import HomeHeader from './HomeHeader'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar';
import auth from '@react-native-firebase/auth'
import { useIsSignedup } from '../../graphql/user';
import { useMapPets } from '../../graphql/pet';
import PetMarker from './PetMarker';
import PetsBottomSheet from './PetsBottomSheet';
import { useChatCreated, useCreateChat } from '../../graphql/chat';
import { AuthContext } from '..';

interface HomeScreenContextInterface {
    selectedPostcode: string | null
    setSelectedPostcode: (v: string | null) => void
    mapRef: React.RefObject<MapView>
}

export const HomeScreenContext = createContext<HomeScreenContextInterface>({} as any)

const Home = () => {

    const mapRef = useRef<MapView>(null)

    const { user } = useContext(AuthContext)
    const { data } = useIsSignedup({ fetchPolicy: 'network-only' })


    const [cameraPos, setCameraPos] = useState<Region>({
        latitude: 37.50367232610927,
        longitude: 126.98522503284602,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })

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
        if (!data.isSignedup) auth().signOut()
    }, [data])

    // 내위치 초기화
    useEffect(() => {
        // auth().signOut()
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
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        })
    }, [myPos])





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
