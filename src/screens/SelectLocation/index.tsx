import Geolocation from '@react-native-community/geolocation'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenProps } from 'react-native-screens'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MyPosFab from '../../components/fabs/MyPosFab'
import Footer from '../../components/footers/Footer'
import ScreenLayout from '../../components/layout/ScreenLayout'
import LocationHereIcon from '../../components/svgs/LocationHereIcon'
import { DEFAULT_SHADOW, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { useCoordToRegion } from '../../graphql/user'
import { coordToRegion } from '../../graphql/__generated__/coordToRegion'

export interface SelectLocationProps {
    onSelect: (data: coordToRegion) => void
}

const SelectLocation = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<Route<'SelectLocation', SelectLocationProps>>()
    const [coordToRegion, { loading, data }] = useCoordToRegion()

    const mapRef = useRef<MapView>(null)

    const { bottom } = useSafeAreaInsets()

    const [cameraPos, setCameraPos] = useState<Region>({
        latitude: 37.50367232610927,
        longitude: 126.98522503284602,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })
    const [myPos, setMyPos] = useState<LatLng | null>(null)
    const [cameraInitTrigger, setCameraInitTrigger] = useState(true)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)


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

    const onRegionChange = useCallback(async (region: Region) => {
        if (timer) clearTimeout(timer)
        const id = setTimeout(() => {
            setTimer(null)
            coordToRegion({
                variables: {
                    latitude: region.latitude,
                    longitude: region.longitude
                }
            })
        }, 1000)
        setTimer(id)
    }, [timer])

    const onSubmit = useCallback(() => {
        if (loading) return
        if (!data) return
        if (!data.coordsToRegion) return
        params.onSelect(data)
        goBack()
    }, [data, params, loading])


    return (
        <ScreenLayout style={{ justifyContent: 'center' }} translucent >

            <MapView
                ref={mapRef}
                style={{ flex: 1, zIndex: -999 }}
                rotateEnabled={false}
                initialRegion={cameraPos}
                mapPadding={{ bottom: 56, top: 56, left: 0, right: 0 }}
                onRegionChange={onRegionChange}
            />

            <Pressable
                style={styles.backBtn}
                onPress={goBack}
                android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
            >
                <Icon name='keyboard-arrow-left' color='#000' size={24} />
            </Pressable>

            <View style={styles.iconContainer} >
                <LocationHereIcon />
            </View>

            <MyPosFab onPress={onMyPos} marginBottom={56 + 16} />

            <View style={[styles.addressContainer, { bottom: 56 + bottom + 16 }]} >
                {!data
                    ? <Text>검색중...</Text>
                    : !data.coordsToRegion
                        ? <Text>검색 결과 없음</Text>
                        : <Text>{data.coordsToRegion.address}</Text>
                }
            </View>

            <View style={{ position: 'absolute', bottom: 0 }} >
                <Footer
                    text='이 위치로 주소 설정'
                    onPress={onSubmit}
                />
            </View>
        </ScreenLayout>
    )
}

export default SelectLocation

const styles = StyleSheet.create({
    backBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: STATUSBAR_HEIGHT,
        left: 0
    },
    iconContainer: {
        position: 'absolute',
        alignSelf: 'center',
        transform: [{ translateY: -30 }]
    },
    addressContainer: {
        width: WIDTH - 32,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        ...DEFAULT_SHADOW,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 4,
        paddingHorizontal: 16
    }
})