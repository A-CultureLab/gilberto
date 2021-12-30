import { gql } from '@apollo/client'
import React, { createContext, useMemo, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import useRoute from '../../hooks/useRoute'
import { createQueryHook } from '../../lib/createApolloHook'
import { mediaCommentsMedia, mediaCommentsMediaVariables } from './__generated__/mediaCommentsMedia'
import dayjs from 'dayjs'
import useNavigation from '../../hooks/useNavigation'
import { IS_IOS } from '../../constants/values'
import MediaCommentsFooter from './MediaCommentsFooter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReadMoreText from '../../components/texts/ReadMoreText'
import useRefreshing from '../../hooks/useRefreshing'
import { mediaCommentsComments, mediaCommentsCommentsVariables, mediaCommentsComments_mediaComments } from './__generated__/mediaCommentsComments'
import MediaCommentsCard from './MediaCommentsCard'

const COMMENTS = gql`
query mediaCommentsComments ($mediaId:String!, $skip:Int! ) {
    mediaComments (orderBy:{createdAt: desc}, where: {mediaId:{equals:$mediaId}}, skip: $skip, take:10){
        id
        createdAt
        content
        replyCommentCount
        user {
            id
            profileId
            image
            isMe
        }
    }
}
`

const MEDIA = gql`
query mediaCommentsMedia($id:String!) {
    media(id: $id) {
        id
        createdAt
        content
        user {
            id
            isMe
            profileId
            image
        }
    }
}
`

export interface MediaCommentsProps {
    mediaId: string
}

interface MediaCommentsScreenContextInterface {
    mediaId: string
    mediaData?: mediaCommentsMedia
    onRefresh: () => Promise<void>
    targetCommentUser: { commentId: string, userId: string, profileId: string } | null
    setTargetCommentUser: (data: { commentId: string, userId: string, profileId: string } | null) => void
}

export const MediaCommentsScreenContext = createContext<MediaCommentsScreenContextInterface>({} as any)

const MediaComments = () => {


    const { navigate } = useNavigation()
    const { params: { mediaId } } = useRoute<'MediaComments'>()
    const { bottom } = useSafeAreaInsets()

    const { data: mediaData, refetch: mediaRefetch } = createQueryHook<mediaCommentsMedia, mediaCommentsMediaVariables>(MEDIA)({ variables: { id: mediaId } })
    const { data: commentsData, refetch: commentsRefetch, fetchMore } = createQueryHook<mediaCommentsComments, mediaCommentsCommentsVariables>(COMMENTS)({ variables: { mediaId, skip: 0 } })
    const refreshing = useRefreshing(async () => await Promise.all([mediaRefetch(), commentsRefetch()]))

    const [targetCommentUser, setTargetCommentUser] = useState<{ commentId: string, userId: string, profileId: string } | null>(null)

    const contextValue = useMemo<MediaCommentsScreenContextInterface>(() => ({
        mediaId, mediaData, onRefresh: refreshing.onRefresh,
        targetCommentUser, setTargetCommentUser
    }), [mediaId, mediaData, refreshing.onRefresh, targetCommentUser, setTargetCommentUser])

    return (
        <MediaCommentsScreenContext.Provider value={contextValue} >
            <ScreenLayout>
                <KeyboardAvoidingView
                    behavior={IS_IOS ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <Header title='댓글' />
                    <FlatList
                        {...refreshing}
                        onScroll={() => Keyboard.dismiss()}
                        overScrollMode='never'
                        onEndReachedThreshold={0.5}
                        onEndReached={() => commentsData && fetchMore({ variables: { skip: commentsData.mediaComments.length } })}
                        showsVerticalScrollIndicator={false}
                        data={commentsData?.mediaComments || []}
                        ListHeaderComponent={
                            !mediaData ? null :
                                <View style={styles.mediaContainer} >
                                    <Pressable onPress={() => navigate('UserDetail', { id: mediaData.media.user.id })} >
                                        <FastImage
                                            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 16 }}
                                            source={{ uri: mediaData.media.user.image }}
                                        />
                                    </Pressable>
                                    <View style={{ flex: 1 }} >
                                        <Text><Text style={{ fontWeight: 'bold' }} >{mediaData.media.user.profileId} </Text>{mediaData.media.content}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 4 }} >
                                            <Text style={{ fontSize: 12, color: GRAY1, flex: 1 }} >{dayjs(mediaData.media.createdAt).fromNow()}</Text>
                                            {/* {!mediaData.media.user.isMe && <SirenIcon width={16} height={16} fill={GRAY2} />} */}
                                        </View>
                                    </View>
                                </View>
                        }
                        renderItem={({ item }) => <MediaCommentsCard {...item} />}
                    />
                    <MediaCommentsFooter />
                </KeyboardAvoidingView>
                <View style={{ height: bottom }} />
            </ScreenLayout>
        </MediaCommentsScreenContext.Provider>
    )
}

export default MediaComments

const styles = StyleSheet.create({
    mediaContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginBottom: 12
    }
})