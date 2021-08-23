import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { HomeScreenContext } from '.'
import { GRAY2, GRAY3, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { usePetsByAddress } from '../../graphql/pet'
import HomeGroupByAddressBottomSheetCard from './HomeGroupByAddressBottomSheetCard'

const HomeGroupByAddressBottomSheet = () => {

    const { selectedGroupByAddress, setSelectedGroupByAddress, setBottomSheetSnapIndex } = useContext(HomeScreenContext)
    const { data, loading, fetchMore } = usePetsByAddress({
        skip: !selectedGroupByAddress,
        variables: {
            addressGroupId: selectedGroupByAddress?.id || '',
        }
    })


    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = useMemo(() => [0, HEIGHT / 2 - 100, HEIGHT - STATUSBAR_HEIGHT - 16 - 56 - 40], [])

    const handleSheetChanges = useCallback((index: number) => {
        setBottomSheetSnapIndex(index)
        if (index === 0) setSelectedGroupByAddress(null)
    }, [setBottomSheetSnapIndex])

    useEffect(() => {
        if (!selectedGroupByAddress) bottomSheetRef.current?.snapTo(0)
        else bottomSheetRef.current?.snapTo(1)
    }, [selectedGroupByAddress])

    const onEndReached = useCallback(() => {
        if (!selectedGroupByAddress) return

        fetchMore({ variables: { skip: data?.petsByAddress.length } })
    }, [selectedGroupByAddress, data])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={0}
            handleComponent={() =>
                <>
                    <View style={styles.swiperContainer} >
                        <View style={styles.swiper} />
                    </View>
                    <View style={styles.headerContainer} ><Text numberOfLines={1} style={styles.headerTitle} >{selectedGroupByAddress?.groupName}</Text></View>
                </>
            }
            onChange={handleSheetChanges}
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
    }
})