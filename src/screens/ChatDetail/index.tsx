import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { useChats } from '../../graphql/chat'
import Footer from './Footer'

export interface ChatDetailProps {
    id: number
}

const ChatDetail = () => {

    const { params: { id } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()
    const { data, refetch, fetchMore } = useChats({ variables: { chatRoomId: id }, fetchPolicy: 'network-only' })
    const { bottom } = useSafeAreaInsets()

    const { navigate } = useNavigation()


    return (
        <ScreenLayout>
            <KeyboardAvoidingView
                enabled={IS_IOS}
                behavior='padding'
                style={{ flex: 1, backgroundColor: COLOR1 }}
            >
                <View style={{ backgroundColor: '#fff', flex: 1 }} >
                    <Header title='채팅' />
                    <FlatList
                        data={data?.chats}
                        onEndReachedThreshold={16}
                        onEndReached={() => fetchMore({ variables: { cursor: data?.chats[data.chats.length - 1].id } })}
                        renderItem={({ item }) => <Text>{item.message}{item.id}</Text>}
                    />
                    <Footer chatRoomId={id} />
                </View>
            </KeyboardAvoidingView>
            <View style={{ backgroundColor: COLOR1, width: '100%', height: bottom }} />
        </ScreenLayout>
    )
}

export default ChatDetail

const styles = StyleSheet.create({})