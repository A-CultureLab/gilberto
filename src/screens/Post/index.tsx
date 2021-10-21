import React, { createContext, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { PostsAdressFilterInput } from '../../../__generated__/globalTypes'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { useFeeds } from '../../graphql/feed'
import useRefreshing from '../../hooks/useRefreshing'
import NewsCard from './NewsCard'
import PostCard from './PostCard'
import PostEmpty from './PostEmpty'
import PostHeader from './PostHeader'

interface PostContextInterface {
    filter: PostsAdressFilterInput, setFilter: (filter: PostsAdressFilterInput) => void
    refetch: () => void
}

export const PostContext = createContext<PostContextInterface>({} as any)

const Post = () => {

    const flatlistRef = useRef<FlatList>(null)

    const [filter, setFilter] = useState<PostsAdressFilterInput>({})

    const { data, refetch, fetchMore } = useFeeds({
        variables: { filter }
    })
    const refreshing = useRefreshing(refetch)

    const contextValue = useMemo<PostContextInterface>(() => ({
        filter, setFilter,
        refetch
    }), [filter, setFilter, refetch])

    return (
        <PostContext.Provider value={contextValue} >
            <ScreenLayout>
                <PostHeader />
                {data?.feeds.length === 0
                    ? <PostEmpty />
                    : <FlatList
                        ref={flatlistRef}
                        {...refreshing}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => fetchMore({ variables: { skipPost: data?.feeds.filter(v => !!v.post).length, skipNews: data?.feeds.filter(v => !!v.news).length } })}
                        overScrollMode='never'
                        data={data?.feeds || []}
                        renderItem={({ item }) => !!item.post ? <PostCard {...item.post} /> : item.news ? <NewsCard {...item.news} /> : null}
                    />}
                <TabScreenBottomTabBar onFocusPress={() => flatlistRef.current?.scrollToOffset({ offset: 0, animated: true })} />
            </ScreenLayout>
        </PostContext.Provider>
    )
}

export default Post


