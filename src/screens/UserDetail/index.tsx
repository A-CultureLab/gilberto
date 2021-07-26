import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { WIDTH } from '../../constants/styles'
import { useUser } from '../../graphql/user'

export interface UserDetailProps {
    id: string
}

const UserDetail = () => {

    const { params: { id } } = useRoute<Route<'UserDetail', UserDetailProps>>()
    const { data } = useUser({ variables: { where: { id } } })
    const { navigate } = useNavigation()

    return (
        <ScreenLayout>
            <Header title='유저상세' />
            <View style={{ flex: 1 }} >
                <FastImage
                    style={{ width: WIDTH, height: WIDTH }}
                    source={{ uri: data?.user?.image }}
                />
                <Text>{data?.user?.name}</Text>
            </View>
            <Footer
                text='채팅'
                onPress={() => navigate('ChatDetail', { id })}
            />
        </ScreenLayout>
    )
}

export default UserDetail

const styles = StyleSheet.create({})
