import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo, useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeScreenContext } from '.'
import { COLOR3, GRAY2, GRAY3, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { usePets } from '../../graphql/pet'

const PetsBottomSheet = () => {


    const { navigate } = useNavigation()
    const { selectedPostcode, setSelectedPostcode } = useContext(HomeScreenContext)
    const { data, loading, fetchMore } = usePets({
        variables: {
            where: { user: { addressPostcode: { equals: selectedPostcode } } },
            take: 5
        }
    })

    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = useMemo(() => [0, HEIGHT / 2 - 100, HEIGHT - STATUSBAR_HEIGHT - 16 - 56 - 40], [])

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) setSelectedPostcode(null)
    }, [])

    useEffect(() => {
        if (!selectedPostcode) bottomSheetRef.current?.snapTo(0)
        else bottomSheetRef.current?.snapTo(1)
    }, [selectedPostcode])

    const onEndReached = useCallback(() => {
        if (!selectedPostcode) return
        console.log(data?.pets.length)
        fetchMore({ variables: { skip: data?.pets.length } })
    }, [selectedPostcode, data])

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
                data={data?.pets}
                keyExtractor={({ id }) => id.toString()}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => navigate('UserDetail', { id: item.userId })}
                        style={{ height: 100, borderBottomColor: GRAY3, borderBottomWidth: 1 }}
                    >
                        <FastImage
                            style={{ width: 80, height: 80, marginLeft: 20 }}
                            source={{ uri: item.image }}
                        />
                        <Text>{item.name}</Text>
                    </Pressable>
                }
            />}
        </BottomSheet>
    )
}

export default PetsBottomSheet

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