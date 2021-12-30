import { gql } from '@apollo/client'
import dayjs from 'dayjs'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { MediaCommentsScreenContext } from '.'
import { GRAY1, GRAY2 } from '../../constants/styles'
import useGlobalUi from '../../hooks/useGlobalUi'
import { createMutationHook } from '../../lib/createApolloHook'
import { deleteMediaCommentVariables } from './__generated__/deleteMediaComment'
import { deleteMediaReplyComment } from './__generated__/deleteMediaReplyComment'
import { mediaReplyComments_mediaReplyComments } from './__generated__/mediaReplyComments'
import SirenIcon from '../../assets/svgs/siren.svg'
import useNavigation from '../../hooks/useNavigation'

const DELETE_MEDIA_REPLY_COMMENT = gql`
mutation deleteMediaReplyComment($id:String!){
    deleteMediaReplyComment(id: $id) {
        id
        replyCommentCount
    }
}
`

interface MediaCommentsReplyCardProps {
    onRefetch?: () => Promise<any>
    mediaCommentId: string
}

const MediaCommentsReplyCard: React.FC<mediaReplyComments_mediaReplyComments & MediaCommentsReplyCardProps> = (props) => {

    const { setTargetCommentUser } = useContext(MediaCommentsScreenContext)
    const { confirm, toast } = useGlobalUi()
    const { push } = useNavigation()

    const { id, content, createdAt, user, onRefetch, mediaCommentId } = props

    const [deleteMediaReplyComment] = createMutationHook<deleteMediaReplyComment, deleteMediaCommentVariables>(DELETE_MEDIA_REPLY_COMMENT)({ variables: { id } })

    const onDelete = useCallback(() => {
        confirm({
            title: '댓글 삭제',
            content: '정말 삭제하시겠습니까?',
            onPress: async (isYes) => {
                if (!isYes) return
                await deleteMediaReplyComment()
                onRefetch && await onRefetch()
            }
        })
    }, [id, onRefetch])

    const onReport = useCallback(() => {
        toast({ content: '신고가 접수되었습니다' })
    }, [])

    return (
        <>
            <Pressable style={styles.container} onPress={() => setTargetCommentUser({ commentId: mediaCommentId, userId: user.id, profileId: user.profileId })} >
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
        </>
    )
}

export default MediaCommentsReplyCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: 20,
        paddingLeft: 68,
        paddingVertical: 12,
        flexDirection: 'row'
    }
})