import { BackHandler, FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { useChatCreated, useChats } from '../../graphql/chat'

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

export interface ChatDetailProps {
    id: string
}

const ChatDetail = () => {

    const drawerRef = useRef<DrawerLayout>(null)

    const { addListener } = useNavigation()
    const { params: { id } } = useRoute<Route<'ChatDetail', ChatDetailProps>>()
    const { bottom } = useSafeAreaInsets()
    const { user } = useContext(AuthContext)

    // const { } = useChatCreated({ variables: { userId: user?.uid || '', chatRoomId: id } })
    const { data, fetchMore } = useChats({ variables: { chatRoomId: id }, fetchPolicy: 'network-only' })

    const [isDrawerOpened, setIsDrawerOpened] = useState(false)
    const [isScreenFocused, setIsScreenFocused] = useState(true)

    // android backbutton handler listner for drawer layout close
    useEffect(() => {
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
            renderNavigationView={() => data?.chatRoom ? <ChatDetailDrawer data={data.chatRoom} /> : null}
        >
            <ScreenLayout>
                <KeyboardAvoidingView
                    behavior={IS_IOS ? 'padding' : 'height'}
                    style={{ flex: 1, backgroundColor: COLOR1 }}
                >
                    <View style={{ backgroundColor: '#fff', flex: 1 }} >
                        <Header
                            title={data?.chatRoom?.name || '채팅'}
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
                        <ChatDetailFooter chatRoomId={id} />
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