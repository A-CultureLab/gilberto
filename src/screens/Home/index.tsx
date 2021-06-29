import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, Permission } from 'react-native'
import MapView, { Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { IS_IOS } from '../../constants/values';


const Home = () => {

    const mapRef = useRef<MapView>(null)
    const [currentRegion, setCurrentRegion] = useState<Region>({
        latitude: 37.50367232610927,
        longitude: 126.98522503284602,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })

    const initLocation = useCallback(async () => {
        if (IS_IOS) await Geolocation.requestAuthorization()
        Geolocation.getCurrentPosition(
            (position) => {
                mapRef.current?.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }, 0)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        )
    }, [])

    useEffect(() => {
        initLocation()
    }, [])

    useEffect(() => {
        console.log(currentRegion)
    }, [currentRegion])

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            rotateEnabled={false}
            initialRegion={currentRegion}
            onRegionChange={setCurrentRegion}
        />
    )
}

export default Home

const styles = StyleSheet.create({})
