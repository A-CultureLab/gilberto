import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import DraggableFlatList from "react-native-draggable-flatlist";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GRAY2, GRAY3 } from '../../constants/styles'
import { useCallback } from 'react'
import PetInfoCard from '../../components/cards/PetInfoCard'
import { useNavigation } from '@react-navigation/native'
import { useMyPets } from '../../graphql/pet'



const SignupPet = () => {

    const { reset, navigate } = useNavigation()

    const { data } = useMyPets()

    const onAdd = useCallback(() => {
        navigate('PetRegist')
    }, [])

    const onSubmit = useCallback(() => {
        reset({ routes: [{ name: 'Tab' }], index: 0 })
    }, [])

    return (
        <ScreenLayout>
            <Header title='반려동물 정보' backBtn='none' />

            <DraggableFlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={data?.myPets || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ drag, isActive, item }) => <PetInfoCard data={item} drag={drag} isActive={isActive} />}
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
        borderBottomColor: GRAY3
    }
})