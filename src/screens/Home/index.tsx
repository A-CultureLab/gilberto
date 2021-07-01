import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Coordinate, LatLng, Marker, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { IS_IOS } from '../../constants/values';
import { COLOR2, DEFAULT_SHADOW } from '../../constants/styles';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import MyPosFab from '../../components/fabs/MyPosFab';
import HomeHeader from './HomeHeader'
import CategorySelector from './CategorySelector'


export const HomeScreenContext = createContext({
    categoryVerticalMode: false,
    setCategoryVerticalMode: (v: boolean) => { }
})

const Home = () => {

    const mapRef = useRef<MapView>(null)
    const [cameraPos, setCameraPos] = useState<Region>({
        latitude: 37.50367232610927,
        longitude: 126.98522503284602,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })
    const [myPos, setMyPos] = useState<LatLng | null>(null)
    const [cameraInitTrigger, setCameraInitTrigger] = useState(true)
    // Context Values
    const [categoryVerticalMode, setCategoryVerticalMode] = useState(false)
    const contextValue = useMemo(() => ({
        categoryVerticalMode,
        setCategoryVerticalMode
    }), [categoryVerticalMode, setCategoryVerticalMode])


    // 내위치 초기화
    useEffect(() => {
        if (IS_IOS) Geolocation.requestAuthorization()
        const watch = Geolocation.watchPosition(
            (position) => {
                setMyPos(position.coords)
            },
            (error) => { console.log(error.code, error.message) }
        )
        return () => {
            watch && Geolocation.clearWatch(watch)
        }
    }, [])

    // 카메라 쵝기화
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
                    style={{ flex: 1 }}
                    rotateEnabled={false}
                    initialRegion={cameraPos}
                    onRegionChange={setCameraPos}
                >
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
                <CategorySelector />
                <MyPosFab onPress={onMyPos} />
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
