import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { usePosts } from '../../graphql/post'
import PostCard from './PostCard'
import PostHeader from './PostHeader'

const Post = () => {

    const { data } = usePosts({
        variables: {
            filter: {

            }
        }
    })

    return (
        <ScreenLayout>
            <PostHeader />
            <FlatList
                data={data?.posts || []}
                renderItem={({ item }) => <PostCard {...item} />}
            />
            <TabScreenBottomTabBar />
        </ScreenLayout>
    )
}

export default Post


