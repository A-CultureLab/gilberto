import { gql } from '@apollo/client'
import React, { createContext, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { MediasAdressFilterInput } from '../../../__generated__/globalTypes'
import MediaCard from '../../components/cards/MediaCard'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import useRefreshing from '../../hooks/useRefreshing'
import { createQueryHook } from '../../lib/createApolloHook'
import MediaHeader from './MediaHeader'
import { recommendMedias, recommendMediasVariables } from './__generated__/recommendMedias'

const MEDIAS = gql`
query recommendMedias($cursor:String, $filter:MediasAdressFilterInput) {
    recommendedMedias(cursor:$cursor, take:10, filter:$filter) {
        id
        isInstagram
        content
        commentCount
        likeCount
        isILiked
        recentComments {
            id
            content
            user {
                id
                profileId
            }
        }
        images {
            id
            url
        }
        tagedPets {
            id
            image
            name
        }
        user {
            id
            profileId
            image
            isMe
            isIFollowed
            address {
                id
                distance
            }   
        }
    }
}
`


interface MediaContextInterface {
    filter: MediasAdressFilterInput,
    setFilter: (filter: MediasAdressFilterInput) => void
}

export const MediaContext = createContext<MediaContextInterface>({} as any)

const Media = () => {


    const [filter, setFilter] = useState<MediasAdressFilterInput>({})

    const { data, fetchMore, refetch } = createQueryHook<recommendMedias, recommendMediasVariables>(MEDIAS)({
        variables: { filter }
    })
    const refreshing = useRefreshing(refetch)


    const contextValue = useMemo<MediaContextInterface>(() => ({
        filter, setFilter,
    }), [filter, setFilter])

    return (
        <MediaContext.Provider value={contextValue} >
            <ScreenLayout>
                <FlatList
                    stickyHeaderIndices={[0]}
                    stickyHeaderHiddenOnScroll
                    ListHeaderComponent={
                        <MediaHeader />
                    }
                    {...refreshing}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => fetchMore({ variables: { cursor: data?.recommendedMedias[data.recommendedMedias.length - 1].id } })}
                    data={data?.recommendedMedias || []}
                    renderItem={({ item }) => <MediaCard {...item} />}
                />
                <TabScreenBottomTabBar />
            </ScreenLayout>
        </MediaContext.Provider>
    )
}

export default Media

const styles = StyleSheet.create({})
