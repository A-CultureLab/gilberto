import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { HomeScreenContext } from '.'
import { GRAY2, GRAY3, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { useUserGroupByAddress } from '../../graphql/user'

const HomeGroupByAddressBottomSheet = () => {


    const { navigate } = useNavigation()
    const { selectedGroupByAddressId, setSelectedGroupByAddressId } = useContext(HomeScreenContext)
    const { data, loading, fetchMore } = useUserGroupByAddress({
        skip: !selectedGroupByAddressId,
        variables: {
            groupByAddress: selectedGroupByAddressId || '',
        }
    })

    console.log(data)

    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = useMemo(() => [0, HEIGHT / 2 - 100, HEIGHT - STATUSBAR_HEIGHT - 16 - 56 - 40], [])

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) setSelectedGroupByAddressId(null)
    }, [])

    useEffect(() => {
        if (!selectedGroupByAddressId) bottomSheetRef.current?.snapTo(0)
        else bottomSheetRef.current?.snapTo(1)
    }, [selectedGroupByAddressId])

    const onEndReached = useCallback(() => {
        if (!selectedGroupByAddressId) return

        fetchMore({ variables: { skip: data?.userGroupByAddress.length } })
    }, [selectedGroupByAddressId, data])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={0}
            handleComponent={() =>
                <View style={styles.swiperContainer} >
                    <View style={styles.swiper} />
                </View>
            }
            onChange={handleSheetChanges}
        >

            {data && <BottomSheetFlatList
                data={data?.userGroupByAddress}
                keyExtractor={({ id }) => id.toString()}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => navigate('UserDetail', { id: item.id })}
                        style={{ height: 100, borderBottomColor: GRAY3, borderBottomWidth: 1 }}
                    >
                        <FastImage
                            style={{ width: 80, height: 80, marginLeft: 20 }}
                            source={{ uri: item.image }}
                        />
                        <Text>{item.id}</Text>
                    </Pressable>
                }
            />}
        </BottomSheet>
    )
}

export default HomeGroupByAddressBottomSheet

const styles = StyleSheet.create({
    swiperContainer: {
        width: WIDTH,
        height: 40,
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
})