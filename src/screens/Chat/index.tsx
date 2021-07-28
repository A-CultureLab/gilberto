import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import ChatCard from './ChatCard'
import { useChatRooms } from '../../graphql/chatRoom'
import auth from '@react-native-firebase/auth'
import { useChatCreated } from '../../graphql/chat'

const Chat = () => {


    const { data, loading } = useChatRooms({
        variables: {
            where: {
                users: { some: { id: { equals: auth().currentUser?.uid } } }
            },
            take: 10
        }
    })

    return (
        <ScreenLayout>
            <Header title='채팅' backBtn='none' />
            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={data?.chatRooms}
                renderItem={({ item }) => <ChatCard {...item} />}
                ListFooterComponent={<View style={{ height: 24 }} />}
            />
            <TabScreenBottomTabBar />
        </ScreenLayout>
    )
}

export default Chat

const styles = StyleSheet.create({})
