import { FlatList, StyleSheet, Text, View } from 'react-native'

import ChatCard from './ChatCard'
import Header from '../../components/headers/Header'
import React from 'react'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { useChatRooms } from '../../graphql/chatRoom'
import useRefreshing from '../../hooks/useRefreshing'
import { GRAY1 } from '../../constants/styles'

const Chat = () => {

    const { data, fetchMore, refetch } = useChatRooms({ variables: { take: 10 } })

    const refreshing = useRefreshing(refetch)

    return (
        <ScreenLayout>
            <Header title='채팅' backBtn='none' underline />
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
                ListEmptyComponent={
                    <Text style={{ alignSelf: 'center', marginTop: 80, color: GRAY1 }} >아직 채팅이 없어요</Text>
                }
            />
            < TabScreenBottomTabBar />
        </ScreenLayout >
    )
}

export default Chat

const styles = StyleSheet.create({})
