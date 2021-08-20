import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { useChatCreated, useChats } from '../../graphql/chat'

import { AuthContext } from '..'
import { COLOR1 } from '../../constants/styles'
import ChatDetailCard from './ChatDetailCard'
import Footer from './Footer'
import Header from '../../components/headers/Header'
import { IS_IOS } from '../../constants/values'
import React from 'react'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface ChatDetailProps {
    id: string
}

const ChatDetail = () => {

    const { params: { id } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()
    const { user } = useContext(AuthContext)
    const { } = useChatCreated({ variables: { userId: user?.uid || '', chatRoomId: id } })
    const { data, fetchMore } = useChats({ variables: { chatRoomId: id }, fetchPolicy: 'network-only' })
    const { bottom } = useSafeAreaInsets()



    return (
        <ScreenLayout>
            <KeyboardAvoidingView
                behavior={IS_IOS ? 'padding' : 'height'}
                style={{ flex: 1, backgroundColor: COLOR1 }}
            >
                <View style={{ backgroundColor: '#fff', flex: 1 }} >
                    <Header title={data?.chatRoom?.name || '채팅'} />
                    <View style={{ flex: 1, overflow: 'hidden' }} >
                        <View>
                            <FlatList
                                data={data?.chats}
                                inverted
                                style={{ overflow: IS_IOS ? 'visible' : 'scroll' }}
                                overScrollMode='never'
                                onEndReachedThreshold={0.5}
                                onEndReached={() => fetchMore({ variables: { cursor: data?.chats[data.chats.length - 1].id } })}
                                renderItem={({ item }) => <ChatDetailCard {...item} />}
                                ListHeaderComponent={<View style={{ height: 16 }} />}
                            />
                        </View>
                    </View>
                    <Footer chatRoomId={id} />
                </View>
            </KeyboardAvoidingView>
            <View style={{ backgroundColor: COLOR1, width: '100%', height: bottom }} />
        </ScreenLayout>
    )
}

export default ChatDetail

const styles = StyleSheet.create({})