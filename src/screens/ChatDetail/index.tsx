import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useUser } from '../../graphql/user'

export interface ChatDetailProps {
    id: string
}

const ChatDetail = () => {

    const { params: { id } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()

    const { navigate } = useNavigation()

    return (
        <ScreenLayout>
            <Header title='채팅' />
            <View style={{ flex: 1 }} />
            <Footer
                text='채팅'
                onPress={() => navigate('ChatDetail', { id })}
            />
        </ScreenLayout>
    )
}

export default ChatDetail

const styles = StyleSheet.create({})
