import { useRoute, Route, useNavigation } from '@react-navigation/core'
import React, { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PostCommentCard from '../../components/cards/PostCommentCard'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { usePostComment } from '../../graphql/postComment'
import { usePostReplyComments } from '../../graphql/postReplyComment'
import useRefreshing from '../../hooks/useRefreshing'
import PostCommentDetailFooter from './PostCommentDetailFooter'

interface PostCommentDetailProps {
    id: string
    focus?: boolean
}

interface PostCommentDetailContextInterface {
    inputRef: React.RefObject<TextInput>
    postCommentId: string
    refetch: () => void
}

export const PostCommentDetailContext = createContext<PostCommentDetailContextInterface>({} as any)

const PostCommentDetail = () => {

    const { goBack } = useNavigation()
    const { params: { id, focus } } = useRoute<Route<"PostCommentDetail", PostCommentDetailProps>>()
    const { bottom } = useSafeAreaInsets()

    const { data: commentData } = usePostComment({ variables: { id } })
    const { data: replyCommentsData, refetch, fetchMore } = usePostReplyComments({ variables: { postId: id } })
    const refreshing = useRefreshing(refetch)

    const inputRef = useRef<TextInput>(null)

    const contextValue = useMemo(() => ({
        inputRef,
        postCommentId: id,
        refetch
    }), [inputRef, id, refetch])


    useEffect(() => {
        if (focus) inputRef.current?.focus()
    }, [])



    return (
        <PostCommentDetailContext.Provider value={contextValue} >
            <ScreenLayout>
                <KeyboardAvoidingView
                    behavior={IS_IOS ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <Header title='답글쓰기' />
                    <View style={{ flex: 1 }} >
                        {commentData && replyCommentsData && <FlatList
                            {...refreshing}
                            data={replyCommentsData.postReplyComments}
                            overScrollMode='never'
                            onEndReachedThreshold={0.5}
                            onEndReached={() => fetchMore({ variables: { skip: replyCommentsData.postReplyComments.length } })}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <>
                                    <View style={{ height: 24 }} />
                                    <PostCommentCard
                                        hideReplyBtn
                                        onDeleted={goBack}
                                        data={commentData.postComment}
                                    />
                                </>
                            }
                            renderItem={({ item }) => <PostCommentCard onDeleted={() => refreshing.onRefresh()} isReply data={item} />}
                        />}
                    </View>
                    <PostCommentDetailFooter />
                </KeyboardAvoidingView>
                <View style={{ backgroundColor: COLOR1, width: '100%', height: bottom }} />
            </ScreenLayout >
        </PostCommentDetailContext.Provider>
    )
}

export default PostCommentDetail

const styles = StyleSheet.create({})