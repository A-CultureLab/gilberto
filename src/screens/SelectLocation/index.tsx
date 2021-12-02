import { DEFAULT_REGION, DEFAULT_REGION_LAT_LOG, DELTA_LEVEL, DEVICE_RATIO, IS_IOS } from '../../constants/values'
import { COLOR1, DEFAULT_SHADOW, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import MapView, { Coord, Region } from 'react-native-nmap'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useNavigation from '../../hooks/useNavigation'

import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createAddress_createAddress } from '../../graphql/__generated__/createAddress'
import { useCreateAddress } from '../../graphql/address'
import useRoute from '../../hooks/useRoute'
import Button from '../../components/buttons/Button'
import PinHere from '../../assets/svgs/pin-here.svg'
import Pin from '../../assets/svgs/pin.svg'
import MyPosIcon from '../../assets/svgs/current-location.svg'

export interface SelectLocationProps {
    onSelect: (data: createAddress_createAddress) => void
}

const SelectLocation = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<'SelectLocation'>()
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
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005 * DEVICE_RATIO
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005 * DEVICE_RATIO
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
                <PinHere height={52} />
            </View>

            <Pressable
                onPress={onMyPos}
                style={styles.myPos}
            >
                <MyPosIcon width={24} height={24} fill={COLOR1} />
            </Pressable>

            <View style={[styles.addressContainer, { bottom: 44 + bottom + 50 }]} >
                <Pin height={28} width={28} style={{ position: 'absolute', left: 12 }} />
                {!data
                    ? <Text>검색중...</Text>
                    : !data.createAddress
                        ? <Text>검색 결과 없음</Text>
                        : <Text>{data.createAddress.land.name}</Text>
                }
            </View>

            <View style={{ position: 'absolute', bottom: 28 + bottom, left: 20, right: 20 }} >
                <Button onPress={onSubmit}>이 위치로 주소 설정</Button>
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
        transform: [{ translateY: -26 }] // 아이콘 height가 52임
    },
    addressContainer: {
        width: WIDTH - 40,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        ...DEFAULT_SHADOW,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 8,
        paddingHorizontal: 20
    },
    myPos: {
        width: 44,
        height: 44,
        borderRadius: 8,
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 56 + 12,
        right: 20,
        backgroundColor: '#fff',
        ...DEFAULT_SHADOW,
        alignItems: 'center',
        justifyContent: 'center'
    }
})