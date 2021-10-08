import { FlatList, StyleSheet, View } from 'react-native'

import ChatCard from './ChatCard'
import Header from '../../components/headers/Header'
import React from 'react'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { useChatRooms } from '../../graphql/chatRoom'
import useRefreshing from '../../hooks/useRefreshing'

const Chat = () => {

    const { data, fetchMore, refetch } = useChatRooms({ variables: { take: 10 } })

    const refreshing = useRefreshing(refetch)

    return (
        <ScreenLayout>
            <Header title='채팅' backBtn='none' />
            <FlatList
                {...refreshing}
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={data?.chatRooms}
                onEndReachedThreshold={0.5}
                onEndReached={() => fetchMore({ variables: { cursor: data?.chatRooms[data.chatRooms.length - 1].id } })}
                renderItem={({ item }) => <ChatCard {...item} />}
                ListHeaderComponent={<View style={{ height: 12 }} />}
                ListFooterComponent={<View style={{ height: 12 }} />}
            />
            <TabScreenBottomTabBar />
        </ScreenLayout>
    )
}

export default Chat

const styles = StyleSheet.create({})
