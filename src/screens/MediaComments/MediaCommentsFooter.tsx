import { gql } from '@apollo/client'
import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { createMutationHook, createQueryHook } from '../../lib/createApolloHook'
import { mediaCommentsIUser } from './__generated__/mediaCommentsIUser'
import SendIcon from '../../assets/svgs/send.svg'
import { COLOR1, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { createMediaComment, createMediaCommentVariables } from './__generated__/createMediaComment'
import { MediaCommentsScreenContext } from '.'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createMediaReplyComment, createMediaReplyCommentVariables } from './__generated__/createMediaReplyComment'

const I_USER = gql`
query mediaCommentsIUser {
    iUser {
        id
        image
    }
}
`

const CREATE_MEDIA_COMMENT = gql`
mutation createMediaComment ($data:MediaCommentCreateInput!) {
    createOneMediaComment(data: $data) {
        id
        media {
            id
            commentCount
            recentComments {
                id
                content
                user {
                    id
                    profileId
                }
            }
        }
    }
}
`

const CREATE_MEDIA_REPLY_COMMENT = gql`
mutation createMediaReplyComment ($data:MediaReplyCommentCreateInput!) {
    createOneMediaReplyComment(data: $data) {
        id
        mediaComment {
            id
            media {
                id
                commentCount
                recentComments {
                    id
                    content
                    user {
                        id
                        profileId
                    }
                }
            }
        }
    }
}
`


interface MediaCommentsFooterProps {

}

const MediaCommentsFooter: React.FC<MediaCommentsFooterProps> = () => {

    const { mediaId, mediaData, onRefresh, targetCommentUser, setTargetCommentUser } = useContext(MediaCommentsScreenContext)
    const { data: iUserData } = createQueryHook<mediaCommentsIUser>(I_USER)()

    const [createMediaComment, { loading }] = createMutationHook<createMediaComment, createMediaCommentVariables>(CREATE_MEDIA_COMMENT)()
    const [createMediaReplyComment, { loading: replyLoding }] = createMutationHook<createMediaReplyComment, createMediaReplyCommentVariables>(CREATE_MEDIA_REPLY_COMMENT)()

    const [content, setContent] = useState('')

    const onSend = useCallback(async () => {
        Keyboard.dismiss()
        if (!content) return
        if (!iUserData) return
        if (!mediaData) return
        const { data } = targetCommentUser
            ? await createMediaReplyComment({
                variables: {
                    data: {
                        content,
                        mediaComment: { connect: { id: targetCommentUser.commentId } },
                        user: { connect: { id: iUserData.iUser.id } },
                        targetUser: { connect: { id: targetCommentUser.userId } }
                    }
                }
            })
            : await createMediaComment({
                variables: {
                    data: {
                        content,
                        user: { connect: { id: iUserData.iUser.id } },
                        media: { connect: { id: mediaId } }
                    }
                }
            })
        if (!data) return
        setContent('')
        setTargetCommentUser(null)
        onRefresh()
    }, [iUserData, mediaData, content, onRefresh, targetCommentUser])

    if (!iUserData) return null

    return (
        <>
            {targetCommentUser && <View style={styles.targetCommentContainer} >
                <Text style={{ flex: 1, fontSize: 12, color: GRAY1 }} >{targetCommentUser.profileId}님에게 답글 남기는 중</Text>
                <Pressable onPress={() => setTargetCommentUser(null)} >
                    <Icon name='close' size={16} color={GRAY2} />
                </Pressable>
            </View>}
            <View style={styles.container} >
                <FastImage
                    style={styles.image}
                    source={{ uri: iUserData.iUser.image }}
                />
                <View style={styles.inputContianer} >
                    <TextInput
                        multiline={IS_IOS}
                        style={styles.input}
                        maxLength={200}
                        placeholderTextColor='#ccc'
                        placeholder='댓글을 입력하세요..'
                        value={content}
                        onChangeText={t => setContent(t)}
                    />
                    <Pressable style={{ marginLeft: 8, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }} onPress={onSend} >
                        {(loading || replyLoding) ? <ActivityIndicator color={COLOR1} size='small' /> : <SendIcon width={24} height={24} fill={COLOR1} />}
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default MediaCommentsFooter

const styles = StyleSheet.create({
    targetCommentContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: GRAY3
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row'
    },
    image: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 8
    },
    inputContianer: {
        flex: 1,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: GRAY3,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: IS_IOS ? 'flex-start' : 'center',
        height: IS_IOS ? undefined : 44
    },
    input: {
        flex: 1,
        color: '#000',
        margin: 0,
        padding: 0,
    }
})