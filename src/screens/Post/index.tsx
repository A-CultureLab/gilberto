import React, { createContext, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { PostsAdressFilterInput } from '../../../__generated__/globalTypes'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { usePosts } from '../../graphql/post'
import PostCard from './PostCard'
import PostHeader from './PostHeader'

interface PostContextInterface {
    filter: PostsAdressFilterInput, setFilter: (filter: PostsAdressFilterInput) => void
}

export const PostContext = createContext<PostContextInterface>({} as any)

const Post = () => {

    const [filter, setFilter] = useState<PostsAdressFilterInput>({})

    const { data } = usePosts({
        variables: { filter }
    })

    const contextValue = useMemo<PostContextInterface>(() => ({
        filter, setFilter
    }), [filter, setFilter])

    return (
        <PostContext.Provider value={contextValue} >
            <ScreenLayout>
                <PostHeader />
                <FlatList
                    data={data?.posts || []}
                    renderItem={({ item }) => <PostCard {...item} />}
                />
                <TabScreenBottomTabBar />
            </ScreenLayout>
        </PostContext.Provider>
    )
}

export default Post


