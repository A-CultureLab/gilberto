import useNavigation from '../../hooks/useNavigation'
import dayjs from 'dayjs'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, COLOR2, GRAY1, GRAY2, WIDTH } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDeletePostComment } from '../../graphql/postComment'
import { postReplyComments_postReplyComments } from '../../graphql/__generated__/postReplyComments'
import { ReportProps } from '../../screens/Report'
import { postComment_postComment } from '../../graphql/__generated__/postComment'
import { useDeletePostReplyComment } from '../../graphql/postReplyComment'
import HyperLink from 'react-native-hyperlink'

interface PostCommentCardProps {
    isReply?: boolean
    data: postComment_postComment | postReplyComments_postReplyComments
    onDeleted: () => void
    hideReplyBtn?: boolean
    iUserId: string
}

const PostCommentCard: React.FC<PostCommentCardProps> = (props) => {

    const { navigate } = useNavigation()
    const { select, confirm, toast } = useGlobalUi()

    const [deletePostComment] = props.isReply ? useDeletePostReplyComment() : useDeletePostComment()

    const { onDeleted, isReply, hideReplyBtn, iUserId } = props
    const { user, image, id, content, createdAt, isPoster } = props.data

    const isMyComment = iUserId === user.id

    const onMenu = useCallback(() => {
        select({
            list: [isMyComment ? '삭제하기' : '신고하기'],
            onSelect: (i) => {
                if (isMyComment) {
                    setTimeout(() => {
                        confirm({
                            title: '삭제하기',
                            content: '정말 삭제하시겠습니까?',
                            onPress: async () => {
                                await deletePostComment({ variables: { id } })
                                onDeleted && onDeleted()
                            }
                        })
                    }, 250)
                } else {
                    // const params: ReportProps = {}
                    // navigate('Report', params)
                    toast({ content: '신고가 접수되었습니다.' })
                }
            }
        })
    }, [id, isMyComment])

    return (
        <>
            <Pressable
                onPress={() => !isReply && navigate('PostCommentDetail', { id })}
                style={[
                    styles.container,
                    { marginLeft: isReply ? 68 : 0 }
                ]}
            >
                <Pressable
                    style={{ height: 36 }}
                    onPress={() => navigate('UserDetail', { id: user.id })}
                >
                    <FastImage
                        style={styles.profileImage}
                        source={{ uri: user.image }}
                    />
                </Pressable>
                <View style={{ flex: 1 }} >
                    <Text style={styles.name} >{user.name}<Text style={styles.poster} >{isPoster ? '  작성자' : ''}</Text></Text>
                    <Text style={styles.userInfo} >{user.address.addressShort} ∙ {dayjs(createdAt).fromNow()}</Text>
                    <HyperLink linkDefault={true} linkStyle={{ color: COLOR2 }} >
                        <Text style={styles.content} selectable >{content}</Text>
                    </HyperLink>
                    {image &&
                        <Pressable
                            onPress={() => navigate('ImageDetail', { urls: [image], index: 0 })}
                        >
                            <FastImage
                                style={styles.image}
                                source={{ uri: image }}
                            />
                        </Pressable>
                    }
                    {<Pressable style={{ marginVertical: 16 }} onPress={() => !isReply && navigate('PostCommentDetail', { id, focus: true })}>
                        {(!hideReplyBtn && !isReply) && <Text style={styles.reply} >답글쓰기</Text>}
                    </Pressable>}
                </View>
                <Pressable
                    onPress={onMenu}
                    style={styles.menuBtn}
                >
                    <Icon name='more-vert' color={GRAY1} size={16} />
                </Pressable>
            </Pressable >
        </>
    )
}

export default React.memo(PostCommentCard)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 8,
        flexDirection: 'row',
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8
    },
    poster: {
        fontWeight: 'normal',
        color: COLOR1
    },
    userInfo: {
        marginBottom: 16,
        fontSize: 12,
        color: GRAY1
    },
    content: {
    },
    image: {
        width: '100%',
        height: WIDTH / 2,
        borderRadius: 4,
        marginTop: 16
    },
    reply: {
        fontSize: 12,
        fontWeight: 'bold',
        color: GRAY1
    },
    menuBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 32,
        height: 32
    }
})