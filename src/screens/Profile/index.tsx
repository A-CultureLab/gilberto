import { useApolloClient } from '@apollo/client'
import useNavigation from '../../hooks/useNavigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DraggableFlatList, { DragEndParams } from 'react-native-draggable-flatlist'
import FastImage from 'react-native-fast-image'
import { Gender } from '../../../__generated__/globalTypes'
import PetInfoCard from '../../components/cards/PetInfoCard'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Loading from '../../components/loadings/Loading'
import ThinLine from '../../components/views/ThinLine'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { MY_PETS, useMyPets, useSortPets } from '../../graphql/pet'
import { useIUser } from '../../graphql/user'
import { myPets_myPets } from '../../graphql/__generated__/myPets'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import genderGenerator from '../../lib/genderGenerator'


const Profile = () => {

    const { data: userData } = useIUser()
    const { bottom } = useSafeAreaInsets()
    // ------------------------------------------------------------------ // pet logic, please migrate to SignupPetScreen
    const { cache } = useApolloClient()
    const { navigate } = useNavigation()

    const { data } = useMyPets()
    const [sortPets] = useSortPets()

    const [dataTemp, setDataTemp] = useState<myPets_myPets[]>([])

    const onAdd = useCallback(() => {
        navigate('PetRegist')
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
    // ------------------------------------------------------------------ //


    return (
        <ScreenLayout>
            <Header title='프로필' underline={false} />
            {!userData || !data ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ><Loading /></View> :
                <>
                    <Pressable
                        android_ripple={{ color: GRAY2 }}
                        onPress={() => navigate('ProfileModify')}
                        style={styles.profileContainer}
                    >
                        <FastImage
                            style={styles.profileImage}
                            source={{ uri: userData.iUser.image }}
                        />
                        <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} >
                                <Text style={styles.profileName} >{userData.iUser.name}</Text>
                                <Text style={styles.profileInfo} > · {genderGenerator.user(userData.iUser.gender)}, {userData.iUser.age}세</Text>
                            </Text>
                            <Text numberOfLines={1} style={styles.profileAddress} >{userData.iUser.address?.land.name}</Text>
                        </View>
                        <Icon name='edit' color={GRAY2} size={16} style={{ marginRight: 4 }} />
                    </Pressable>
                    <ThinLine />
                </>
            }

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
                        android_ripple={{ color: GRAY2, }}
                        style={[styles.addContainer, { marginBottom: bottom }]}
                    >
                        <Icon name='add' size={24} color={GRAY2} />
                    </Pressable>
                }
            />
        </ScreenLayout>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    profileImage: {
        marginRight: 16,
        width: 88,
        height: 88,
        borderRadius: 44,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    profileInfo: {
        fontSize: 18,
        color: GRAY1
    },
    profileAddress: {
        color: COLOR1,
        fontWeight: 'bold',
        marginTop: 8
    },
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
        paddingHorizontal: 16,
        paddingVertical: 24,
        fontWeight: 'bold',
        color: GRAY1,
        lineHeight: 20
    }
})