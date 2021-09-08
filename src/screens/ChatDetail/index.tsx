import { BackHandler, FlatList, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { useChatCreated, useChats, useChatUpdated } from '../../graphql/chat'

import { AuthContext } from '..'
import { COLOR1, GRAY1, WIDTH } from '../../constants/styles'
import ChatDetailCard from './ChatDetailCard'
import ChatDetailFooter from './ChatDetailFooter'
import Header from '../../components/headers/Header'
import { IS_IOS } from '../../constants/values'
import React from 'react'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerLayout } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRef } from 'react'
import ChatDetailDrawer from './ChatDetailDrawer'
import { useEffect } from 'react'
import { useState } from 'react'
import { useChatRoom } from '../../graphql/chatRoom'

export interface ChatDetailProps {
    id?: string
    userId?: string
}

const ChatDetail = () => {

    const drawerRef = useRef<DrawerLayout>(null)

    const { addListener } = useNavigation()
    const { params: { id, userId } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()
    const { bottom } = useSafeAreaInsets()
    const { user } = useContext(AuthContext)

    const { data: chatRoomData } = useChatRoom({
        variables: { id, userId },
        fetchPolicy: 'network-only'
    })
    const { data, fetchMore } = useChats({
        variables: { chatRoomId: id || chatRoomData?.chatRoom.id || '' },
        fetchPolicy: 'network-only',
        skip: !(id || chatRoomData?.chatRoom.id)
    })

    const { } = useChatCreated({
        skip: !(id || chatRoomData?.chatRoom.id),
        variables: { userId: user?.uid || '', chatRoomId: id || chatRoomData?.chatRoom.id || '' }
    })

    const { } = useChatUpdated({
        skip: !(id || chatRoomData?.chatRoom.id),
        variables: { userId: user?.uid || '', chatRoomId: id || chatRoomData?.chatRoom.id || '' }
    })

    const [isDrawerOpened, setIsDrawerOpened] = useState(false)
    const [isScreenFocused, setIsScreenFocused] = useState(true)

    // android backbutton handler listner for drawer layout close
    useEffect(() => {
        if (IS_IOS) return
        if (!isDrawerOpened || !isScreenFocused) return
        const listner = BackHandler.addEventListener('hardwareBackPress', () => {
            drawerRef.current?.closeDrawer()
            return true
        })

        return () => { listner.remove() }
    }, [isDrawerOpened, isScreenFocused])

    // Screen focus listner
    useEffect(() => {
        const focusListner = addListener('focus', () => setIsScreenFocused(true))
        const blurListner = addListener('blur', () => setIsScreenFocused(false))

        return () => {
            focusListner()
            blurListner()
        }
    }, [])


    return (

        <DrawerLayout
            ref={drawerRef}
            drawerWidth={WIDTH - 96}
            drawerPosition='right'
            drawerType="front"
            onDrawerStateChanged={(_, isOpend) => setIsDrawerOpened(isOpend)}
            drawerBackgroundColor="#fff"
            renderNavigationView={() => chatRoomData ? <ChatDetailDrawer data={chatRoomData.chatRoom} /> : null}
        >
            <ScreenLayout>
                <StatusBar barStyle='dark-content' />
                <KeyboardAvoidingView
                    behavior={IS_IOS ? 'padding' : 'height'}
                    style={{ flex: 1, backgroundColor: COLOR1 }}
                >
                    <View style={{ backgroundColor: '#fff', flex: 1 }} >
                        <Header
                            title={chatRoomData?.chatRoom.name || '채팅'}
                            right={() => (
                                <Pressable
                                    onPress={() => drawerRef.current?.openDrawer()}
                                    style={styles.menuButton}
                                >
                                    <Icon name='menu' size={24} color={GRAY1} />
                                </Pressable>
                            )}
                        />
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
                        {chatRoomData && <ChatDetailFooter data={chatRoomData.chatRoom} />}
                    </View>
                </KeyboardAvoidingView>
                <View style={{ backgroundColor: COLOR1, width: '100%', height: bottom }} />
            </ScreenLayout>
        </DrawerLayout >
    )
}

export default ChatDetail

const styles = StyleSheet.create({
    menuButton: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})