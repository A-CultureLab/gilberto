import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Footer from '../../components/footers/Footer'
import UserFooter from '../../components/footers/UserFooter'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, DEFAULT_SHADOW, GRAY1, GRAY3, WIDTH } from '../../constants/styles'
import { useUser } from '../../graphql/user'
import genderGenerator from '../../lib/genderGenerator'

export interface UserDetailProps {
    id: string
}

const UserDetail = () => {

    const { params: { id } } = useRoute<Route<'UserDetail', UserDetailProps>>()
    const { data } = useUser({ variables: { where: { id } } })
    const { navigate } = useNavigation()

    const user = data?.user

    return (
        <ScreenLayout>
            <Header underline={false} />
            {user && <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
            >
                <View style={styles.userProfileContainer} >
                    <FastImage
                        style={styles.image}
                        source={{ uri: user.image }}
                    />
                    <Text style={styles.name} >{user.name}</Text>
                    <Text style={styles.genderAge} >{genderGenerator.user(user.gender)}, {user.age}세</Text>
                    <Text style={styles.address} >{user.address.land.fullName}</Text>
                </View>
                {!!user.introduce && <View style={styles.introCotnainer} >
                    <Text style={styles.intro} >{user.introduce}</Text>
                </View>}
                <View>
                    <Text style={styles.familyTitle} >가족</Text>
                    <ScrollView
                        style={styles.familyScrollView}
                        horizontal
                        contentContainerStyle={{ alignItems: 'center' }}
                    >
                        <View style={{ width: 8 }} />
                        {user.pets.map(v => (
                            <Pressable
                                key={v.id}
                                onPress={() => navigate('PetDetail', { id: v.id })}
                            >
                                <FastImage
                                    style={styles.familyImage}
                                    source={{ uri: v.image }}
                                />
                            </Pressable>
                        ))}
                        <View style={{ width: 8 }} />
                    </ScrollView>
                </View>
            </ScrollView>
            }
            {user && <UserFooter
                user={user}
            />}
        </ScreenLayout>
    )
}

export default UserDetail

const styles = StyleSheet.create({
    userProfileContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    image: {
        width: WIDTH / 2,
        height: WIDTH / 2,
        borderRadius: WIDTH / 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24
    },
    genderAge: {
        fontSize: 18,
        color: GRAY1,
        marginTop: 8
    },
    address: {
        marginTop: 24,
        color: COLOR1,
        fontWeight: 'bold'
    },
    introCotnainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    intro: {

    },
    familyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24,
        marginLeft: 16
    },
    familyScrollView: {
        height: 72 + 24 + 24,
    },
    familyImage: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginHorizontal: 8
    }
})