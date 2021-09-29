import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import PostHeader from './PostHeader'

const Post = () => {
    return (
        <ScreenLayout>
            <PostHeader />
            <FlatList
                data={[]}
                renderItem={() => null}
            />
            <TabScreenBottomTabBar />
        </ScreenLayout>
    )
}

export default Post

const styles = StyleSheet.create({})
