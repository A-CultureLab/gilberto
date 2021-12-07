import { useApolloClient } from '@apollo/client'
import useNavigation from '../../hooks/useNavigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DraggableFlatList, { DragEndParams } from 'react-native-draggable-flatlist'
import PetInfoCard from '../../components/cards/PetInfoCard'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { MY_PETS, useMyPets, useSortPets } from '../../graphql/pet'
import { myPets_myPets } from '../../graphql/__generated__/myPets'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'


const MyPets = () => {

    const { bottom } = useSafeAreaInsets()
    const { cache } = useApolloClient()
    const { navigate } = useNavigation()

    const { data } = useMyPets() // 내 반려동물들
    const [sortPets] = useSortPets() // 반려동물 순서 변경

    // 자연스러운 순서변경 UI를 위해서 임의의 state 생성
    const [dataTemp, setDataTemp] = useState<myPets_myPets[]>([])


    const onDragEnd = useCallback(({ data }: DragEndParams<myPets_myPets>) => {
        setDataTemp(data) // 임의로 저장해 두고
        cache.writeQuery({ // 로컬 캐시에 마이그레이트
            query: MY_PETS,
            data: { myPets: data }
        })
        sortPets({ variables: { data: data.map(v => v.id) } }) // 서버에 마이그레이트
    }, [cache, sortPets])

    // 서버 데이터 변경시 마이그레이트
    useEffect(() => {
        if (!data) return
        setDataTemp(data.myPets)
    }, [data])


    return (
        <ScreenLayout>
            <Header title='반려동물 관리' />

            {dataTemp.length !== 0
                ? <DraggableFlatList
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    data={dataTemp}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ drag, isActive, item }) => <PetInfoCard data={item} drag={drag} isActive={isActive} />}
                    onDragEnd={onDragEnd}
                />
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={styles.emptyText} >반려동물을 추가하면 다른 사용자들에게 먼저 채팅을 받을 수 있습니다. 미 등록시에는 채팅을 보낼 수 만 있습니다.</Text>
                </View>
            }
            <Button style={[styles.addBtn, { marginBottom: 28 + bottom }]} onPress={() => navigate('PetRegist')} >추가</Button>
        </ScreenLayout>
    )
}

export default MyPets

const styles = StyleSheet.create({
    addContainer: {
        width: '100%',
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    emptyText: {
        width: '100%',
        paddingHorizontal: 24,
        // fontWeight: 'bold',
        textAlign: 'center',
        color: GRAY2,
        lineHeight: 20
    },
    addBtn: {
        width: 'auto',
        marginHorizontal: 20
    }
})
