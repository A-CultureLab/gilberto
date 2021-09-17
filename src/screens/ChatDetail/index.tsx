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
import PushNotification from 'react-native-push-notification'
import useAppState from 'react-native-appstate-hook';
import notificationIdGenerator from '../../utils/notificationIdGenerator'

export interface ChatDetailProps {
    id?: string
    userId?: string
}

const ChatDetail = () => {

    const drawerRef = useRef<DrawerLayout>(null)

    const { addListener, goBack, navigate, setParams } = useNavigation()
    const { params: { id, userId } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()
    const { bottom } = useSafeAreaInsets()
    const { appState } = useAppState()
    const { user } = useContext(AuthContext)

    const { data: chatRoomData } = useChatRoom({
        variables: { id: userId ? undefined : id, userId },
        fetchPolicy: 'network-only',
    })
    const { data, fetchMore } = useChats({
        variables: { chatRoomId: id || '' },
        fetchPolicy: 'network-only',
        skip: !id
    })

    const { } = useChatCreated({
        variables: { userId: user?.uid || '', chatRoomId: id || '' },
        skip: !id,
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

    // 미 로그인시 접근 막기
    useEffect(() => {
        if (!user) {
            goBack()
            navigate('Login')
        }
    }, [])

    // ChatRoom이 없는 상테에서 호출했을때 chatRoomId가 존재하지 않음
    // useChatRoom으로 최초 1회 호춮 하면 id가 생성됨 그 id를 넣어주면 됨
    useEffect(() => {
        if (id) return // 이미 id가 있다면 다룰 필요 없음
        if (!chatRoomData) return
        setParams({ id: chatRoomData.chatRoom.id, userId })
    }, [chatRoomData])

    useEffect(() => {
        // push notification 삭제
        PushNotification.cancelLocalNotification(notificationIdGenerator(id || '').toString())
    }, [appState])


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