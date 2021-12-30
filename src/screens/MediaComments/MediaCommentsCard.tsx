import dayjs from 'dayjs'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { mediaCommentsComments_mediaComments } from './__generated__/mediaCommentsComments'
import SirenIcon from '../../assets/svgs/siren.svg'
import { MediaCommentsScreenContext } from '.'
import useGlobalUi from '../../hooks/useGlobalUi'
import { gql } from '@apollo/client'
import { createLazyQueryHook, createMutationHook } from '../../lib/createApolloHook'
import { deleteMediaComment, deleteMediaCommentVariables } from './__generated__/deleteMediaComment'
import { mediaReplyComments, mediaReplyCommentsVariables } from './__generated__/mediaReplyComments'
import MediaCommentsReplyCard from './MediaCommentsReplyCard'
import useNavigation from '../../hooks/useNavigation'

const DELETE_MEDIA_COMMENT = gql`
mutation deleteMediaComment($id:String!) {
    deleteMediaComment(id: $id) 
}
`

const MEDIA_REPLY_COMMENTS = gql`
query mediaReplyComments($mediaCommentId:String!, $skip:Int!) {
    mediaReplyComments(orderBy:{createdAt:asc}, where:{mediaCommentId:{equals:$mediaCommentId}}, take:10, skip:$skip) {
        id
        createdAt
        content
        user {
            id
            profileId
            image
            isMe
        }
    }
}
`

const MediaCommentsCard: React.FC<mediaCommentsComments_mediaComments> = (props) => {

    const { onRefresh, setTargetCommentUser } = useContext(MediaCommentsScreenContext)
    const { push } = useNavigation()
    const { confirm, toast } = useGlobalUi()

    const { id, content, createdAt, user, replyCommentCount } = props

    const [deleteMediaComment] = createMutationHook<deleteMediaComment, deleteMediaCommentVariables>(DELETE_MEDIA_COMMENT)({ variables: { id } })
    const [getMediaReplyComments, { fetchMore, data: replyCommentsData, refetch }] = createLazyQueryHook<mediaReplyComments, mediaReplyCommentsVariables>(MEDIA_REPLY_COMMENTS)({ variables: { mediaCommentId: id, skip: 0 } })

    const onDelete = useCallback(() => {
        confirm({
            title: '댓글 삭제',
            content: '정말 삭제하시겠습니까?',
            onPress: async (isYes) => {
                if (!isYes) return
                await deleteMediaComment()
                await onRefresh()
            }
        })
    }, [id])

    const onReport = useCallback(() => {
        toast({ content: '신고가 접수되었습니다' })
    }, [])

    const onMoreReplyComments = useCallback(async () => {
        if (!replyCommentsData) getMediaReplyComments()
        else fetchMore && fetchMore({ variables: { skip: replyCommentsData.mediaReplyComments.length } })
    }, [replyCommentsData, replyCommentCount])

    return (
        <>
            <Pressable style={styles.container} onPress={() => setTargetCommentUser({ commentId: id, profileId: user.profileId, userId: user.id })} >
                <Pressable onPress={() => push('UserDetail', { id: user.id })} >
                    <FastImage
                        style={{ width: 32, height: 32, borderRadius: 16, marginRight: 16 }}
                        source={{ uri: user.image }}
                    />
                </Pressable>
                <View style={{ flex: 1 }} >
                    <Text><Text style={{ fontWeight: 'bold' }} >{user.profileId} </Text>{content}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 6 }} >
                        <Text style={{ fontSize: 12, color: GRAY1 }} >{dayjs(createdAt).fromNow()}   답글달기</Text>
                        {user.isMe && <Pressable onPress={onDelete} ><Text style={{ fontSize: 12, color: GRAY1 }} >   삭제</Text></Pressable>}
                        <Pressable onPress={onReport} style={{ position: 'absolute', right: 0 }} >
                            <SirenIcon width={16} height={16} fill={GRAY2} />
                        </Pressable>
                    </View>
                </View>
            </Pressable >
            {(replyCommentsData?.mediaReplyComments || []).map((replyComment) => (
                <MediaCommentsReplyCard
                    key={replyComment.id}
                    onRefetch={refetch}
                    mediaCommentId={id}
                    {...replyComment}
                />
            ))}
            {(replyCommentCount - (replyCommentsData?.mediaReplyComments.length || 0) !== 0) &&
                <Pressable onPress={onMoreReplyComments} style={styles.moreBtn} >
                    <View style={{ height: 1, width: 32, backgroundColor: GRAY3, marginRight: 8 }} />
                    <Text style={{ fontSize: 12, color: GRAY1 }} >답글 {replyCommentCount - (replyCommentsData?.mediaReplyComments.length || 0)}개 더보기</Text>
                </Pressable>
            }
        </>
    )
}

export default MediaCommentsCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row'
    },
    moreBtn: {
        width: '100%',
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 68
    }
})