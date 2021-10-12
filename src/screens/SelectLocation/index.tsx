import { DEFAULT_REGION, DEFAULT_REGION_LAT_LOG, DELTA_LEVEL, IS_IOS } from '../../constants/values'
import { DEFAULT_SHADOW, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import MapView, { Coord, Region } from 'react-native-nmap'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, useNavigation, useRoute } from '@react-navigation/native'

import Footer from '../../components/footers/Footer'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LocationHereIcon from '../../components/svgs/LocationHereIcon'
import MyPosFab from '../../components/fabs/MyPosFab'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createAddress_createAddress } from '../../graphql/__generated__/createAddress'
import { useCreateAddress } from '../../graphql/address'

export interface SelectLocationProps {
    onSelect: (data: createAddress_createAddress) => void
}

const SelectLocation = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<Route<'SelectLocation', SelectLocationProps>>()
    const [createAddress, { loading, data }] = useCreateAddress()

    const mapRef = useRef<MapView>(null)

    const { bottom } = useSafeAreaInsets()

    const [myPos, setMyPos] = useState<Coord | null>(null)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)


    // 내위치 & 카메라 초기화
    useEffect(() => {
        if (IS_IOS) Geolocation.requestAuthorization()
        Geolocation.getCurrentPosition(
            (position) => {
                setMyPos(position.coords)
                setTimeout(() => {
                    mapRef.current?.animateToRegion({
                        ...position.coords,
                        ...DELTA_LEVEL[3]
                    })
                }, 500);
            },
            (error) => { console.log(error.code, error.message) }
        )
    }, [])

    const onMyPos = useCallback(() => {
        if (!myPos) return
        mapRef.current?.animateToRegion({
            latitude: myPos.latitude,
            longitude: myPos.longitude,
            ...DELTA_LEVEL[3]
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
        const id = setTimeout(() => {
            setTimer(null)
            createAddress({
                variables: {
                    latitude: event.latitude,
                    longitude: event.longitude
                }
            })
        }, 1000)
        setTimer(id)
    }, [timer])

    const onSubmit = useCallback(() => {
        if (loading) return
        if (!data) return
        if (!data.createAddress) return
        params.onSelect(data.createAddress)
        goBack()
    }, [data, params, loading])


    return (
        <ScreenLayout style={{ justifyContent: 'center' }} translucent >

            <MapView
                ref={mapRef}
                style={{ flex: 1, zIndex: -999 }}
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
            />

            <Pressable
                style={styles.backBtn}
                onPress={goBack}
                android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
            >
                <Icon name='keyboard-arrow-left' color='#000' size={24} />
            </Pressable>

            <View pointerEvents='none' style={styles.iconContainer} >
                <LocationHereIcon />
            </View>

            <MyPosFab onPress={onMyPos} marginBottom={56 + 16} />

            <View style={[styles.addressContainer, { bottom: 56 + bottom + 16 }]} >
                {!data
                    ? <Text>검색중...</Text>
                    : !data.createAddress
                        ? <Text>검색 결과 없음</Text>
                        : <Text>{data.createAddress.land.name}</Text>
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
        transform: [{ translateY: -30.5 }] // 아이콘 height가 61임
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