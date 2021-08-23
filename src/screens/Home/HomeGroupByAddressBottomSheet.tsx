import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeScreenContext } from '.'
import { COLOR1, DEFAULT_SHADOW, GRAY2, GRAY3, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { usePetsByAddress } from '../../graphql/pet'
import HomeGroupByAddressBottomSheetCard from './HomeGroupByAddressBottomSheetCard'
import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeGroupByAddressBottomSheet = () => {

    const { selectedGroupByAddress, setSelectedGroupByAddress, setBottomSheetSnapIndex, bottomSheetSnapIndex } = useContext(HomeScreenContext)
    const { data, loading, fetchMore } = usePetsByAddress({
        skip: !selectedGroupByAddress,
        variables: {
            addressGroupId: selectedGroupByAddress?.id || '',
        }
    })


    const { bottom } = useSafeAreaInsets()
    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = useMemo(() => [HEIGHT / 2 - 50, HEIGHT - STATUSBAR_HEIGHT - 16 - 56 - 40], [])

    const onChange = useCallback((index: number) => {
        setBottomSheetSnapIndex(index)
        if (index === -1) setSelectedGroupByAddress(null)
    }, [setBottomSheetSnapIndex, setSelectedGroupByAddress])

    useEffect(() => {
        if (!selectedGroupByAddress) bottomSheetRef.current?.close()
        else bottomSheetRef.current?.snapToIndex(0)
    }, [selectedGroupByAddress])

    const onEndReached = useCallback(() => {
        if (!selectedGroupByAddress) return

        fetchMore({ variables: { skip: data?.petsByAddress.length } })
    }, [selectedGroupByAddress, data])

    const onClose = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    return (
        <>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose
                index={-1}
                onClose={() => setBottomSheetSnapIndex(-1)}
                onAnimate={(_, i) => setBottomSheetSnapIndex(i)}
                onChange={onChange}
                handleComponent={() =>
                    <View>
                        <View style={styles.swiperContainer} >
                            <View style={styles.swiper} />
                        </View>
                        <View style={styles.headerContainer} ><Text numberOfLines={1} style={styles.headerTitle} >{selectedGroupByAddress?.groupName || ''}</Text></View>
                    </View>
                }
            >
                {data && <BottomSheetFlatList
                    data={data?.petsByAddress}
                    keyExtractor={({ id }) => id.toString()}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => <HomeGroupByAddressBottomSheetCard {...item} />}
                />}
            </BottomSheet>
            {bottomSheetSnapIndex >= 0 && <Pressable style={[styles.closeButton, { bottom: bottom + 40 }]} onPress={onClose} >
                <Icon name="location-on" size={16} color="#fff" />
                <Text style={styles.closeButtonText} >지도보기</Text>
            </Pressable>}
        </>
    )
}

export default HomeGroupByAddressBottomSheet

const styles = StyleSheet.create({
    swiperContainer: {
        width: WIDTH,
        height: 16,
        paddingTop: 16,
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff'
    },
    swiper: {
        width: 32,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: GRAY2
    },
    headerContainer: {
        marginTop: 24,
        marginBottom: 16,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    closeButton: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR1,
        paddingHorizontal: 16,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 16,
        ...DEFAULT_SHADOW
    },
    closeButtonText: {
        color: '#fff',
        marginLeft: 8
    }
})