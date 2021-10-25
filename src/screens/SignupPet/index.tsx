import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import DraggableFlatList, { DragEndParams } from "react-native-draggable-flatlist";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GRAY1, GRAY2, GRAY3, SPRING_CONFIG } from '../../constants/styles'
import { useCallback } from 'react'
import PetInfoCard from '../../components/cards/PetInfoCard'
import useNavigation from '../../hooks/useNavigation'
import { MY_PETS, useMyPets, useSortPets } from '../../graphql/pet'
import { myPets_myPets } from '../../graphql/__generated__/myPets'
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import { useEffect } from 'react'



const SignupPet = () => {

    const { cache } = useApolloClient()
    const { reset, navigate } = useNavigation()

    const { data } = useMyPets()
    const [sortPets] = useSortPets()

    const [dataTemp, setDataTemp] = useState<myPets_myPets[]>([])

    const onAdd = useCallback(() => {
        navigate('PetRegist')
    }, [])

    const onSubmit = useCallback(() => {
        reset({ routes: [{ name: 'Tab' }], index: 0 })
    }, [])

    const onDragEnd = useCallback(({ data }: DragEndParams<myPets_myPets>) => {
        setDataTemp(data)
        cache.writeQuery({
            query: MY_PETS,
            data: { myPets: data }
        })
        sortPets({ variables: { data: data.map(v => v.id) } })
    }, [cache, sortPets])

    useEffect(() => {
        if (!data) return
        setDataTemp(data.myPets)
    }, [data])

    return (
        <ScreenLayout>
            <Header title='반려동물 정보' backBtn='none' />

            <DraggableFlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={dataTemp}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ drag, isActive, item }) => <PetInfoCard data={item} drag={drag} isActive={isActive} />}
                onDragEnd={onDragEnd}
                ListHeaderComponent={
                    dataTemp.length === 0
                        ? <Text style={styles.emptyText} >반려동물을 추가하면 다른 사용자들에게 먼저 채팅을 받을 수 있습니다. 미 등록시에는 채팅을 보낼 수 만 있습니다.</Text>
                        : null
                }
                ListFooterComponent={
                    <Pressable
                        onPress={onAdd}
                        android_ripple={{ color: GRAY2 }}
                        style={styles.addContainer}
                    >
                        <Icon name='add' size={24} color={GRAY2} />
                    </Pressable>
                }
            />
            <Footer
                text='다음'
                onPress={onSubmit}
            />
        </ScreenLayout>
    )
}

export default SignupPet

const styles = StyleSheet.create({
    addContainer: {
        width: '100%',
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        borderTopWidth: 1,
        borderTopColor: GRAY3
    },
    emptyText: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        fontWeight: 'bold',
        color: GRAY1,
        lineHeight: 20
    }
})