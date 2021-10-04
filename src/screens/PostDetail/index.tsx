import { useRoute, Route, useNavigation } from '@react-navigation/core'
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import PostDetailCommentCard from './PostDetailCommentCard'
import { useDeletePost, useLikePost, usePost } from '../../graphql/post'
import FastImage from 'react-native-fast-image'
import { IS_IOS, POST_TYPES } from '../../constants/values'
import Images from '../../components/images/Images'
import meterUnit from '../../utils/meterUnit'
import dayjs from 'dayjs'
import PostDetailFooter from './PostDetailFooter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePostComments } from '../../graphql/postComment'
import useRefreshing from '../../hooks/useRefreshing'
import HyperLink from 'react-native-hyperlink'
import useGlobalUi from '../../hooks/useGlobalUi'
import { useIUser } from '../../graphql/user'

interface PostDetailProps {
    id: string
    focus?: boolean
}

interface PostDetailContextInterface {
    inputRef: React.RefObject<TextInput>
    postId: string
    refetch: () => void
}

export const PostDetailContext = createContext<PostDetailContextInterface>({} as any)

const PostDetail = () => {

    const { params: { id, focus } } = useRoute<Route<"PostDetail", PostDetailProps>>()
    const { navigate, goBack } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { selector, confirm } = useGlobalUi()

    const { data: postCommetsData, fetchMore, refetch } = usePostComments({ variables: { postId: id } })
    const refreshing = useRefreshing(refetch)
    const { data } = usePost({ variables: { id } })
    const { data: iUserData } = useIUser()

    const [deletePost] = useDeletePost({ variables: { id } })
    const [likePost] = useLikePost({ variables: { id, like: !data?.post.isILiked } })

    const inputRef = useRef<TextInput>(null)
    const [notificated, setNotificated] = useState(false)

    const isPoster = iUserData?.iUser.id === data?.post.user.id

    const contextValue = useMemo(() => ({
        inputRef,
        postId: id,
        refetch
    }), [inputRef, id, refetch])

    useEffect(() => {
        if (focus) inputRef.current?.focus()
    }, [])

    const onMoreOptions = useCallback(() => {
        selector({
            list: isPoster ? ['수정하기', '삭제하기'] : ['신고하기'],
            callWhenHide: true,
            onSelect: (i) => {
                if (isPoster) {
                    if (i === 0) navigate('PostEdit', { id: data?.post.id })
                    else if (i === 1) setTimeout(() => {
                        confirm({
                            title: '삭제하기',
                            content: '정말 삭제하시겠습니까?',
                            onPress: async (isYes) => {
                                if (!isYes) return
                                await deletePost()
                                goBack()
                            }
                        })
                    }, 250)
                } else {
                    if (i === 0) navigate("Report", {})
                }
            }
        })
    }, [isPoster, data])

    return (
        <PostDetailContext.Provider value={contextValue} >
            <ScreenLayout>
                <KeyboardAvoidingView
                    behavior={IS_IOS ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <Header
                        right={() => (
                            <View style={styles.rightContainer} >
                                {/* <Pressable
                                    android_ripple={{ color: GRAY2, radius: 28 }}
                                    style={styles.rightBtn}
                                    onPress={() => setNotificated(prev => !prev)}
                                >
                                    <Icon name={notificated ? 'notifications' : 'notifications-none'} size={24} color={notificated ? COLOR1 : GRAY1} />
                                </Pressable> */}
                                <Pressable
                                    android_ripple={{ color: GRAY2, radius: 28 }}
                                    style={styles.rightBtn}
                                    onPress={onMoreOptions}
                                >
                                    <Icon name='more-vert' size={24} color={GRAY1} />
                                </Pressable>
                            </View>
                        )}
                    />
                    <View style={{ flex: 1 }} >
                        {data && postCommetsData && <FlatList
                            {...refreshing}
                            data={postCommetsData.postComments}
                            overScrollMode='never'
                            onEndReachedThreshold={0.5}
                            onEndReached={() => fetchMore({ variables: { skip: postCommetsData.postComments.length } })}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <>
                                    <View style={styles.container}>
                                        <View style={styles.postInfoContainer} >
                                            <Text style={styles.type} >{POST_TYPES.find(v => v.value === data.post.type)?.name}</Text>
                                            <Text style={styles.createdAt} >{dayjs(data.post.createdAt).fromNow()}</Text>
                                        </View>
                                        <View style={styles.userContainer}>
                                            <FastImage
                                                style={styles.userImage}
                                                source={{ uri: data.post.user.image }}
                                            />
                                            <View >
                                                <Text style={styles.userName} >{data.post.user.name}</Text>
                                                <Text style={styles.userInfo} >{`${data.post.user.address.adressShort} ∙ ${meterUnit(data.post.user.address.distance || 0)}`}</Text>
                                            </View>
                                        </View>
                                        <HyperLink linkDefault={true} linkStyle={{ color: COLOR2 }} >
                                            <Text style={styles.content} >{data.post.content}</Text>
                                        </HyperLink>
                                        {!!data.post.images.length &&
                                            <Images
                                                onPress={(urls, index) => navigate('ImageDetail', { urls, index })}
                                                style={{ marginBottom: 16 }}
                                                urls={data.post.images.map(v => v.url)}
                                            />
                                        }
                                    </View>
                                    <View style={styles.btnContainer} >
                                        <Pressable
                                            onPress={() => likePost()}
                                            android_ripple={{ color: COLOR2 }}
                                            style={styles.btn}
                                        >
                                            <Icon name='thumb-up' color={data.post.isILiked ? COLOR1 : GRAY3} size={16} />
                                            <Text style={[styles.btnText, { color: data.post.isILiked ? COLOR1 : GRAY1 }]} >좋아요{!!data.post.likeCount ? ` ${data.post.likeCount}` : ''}</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => navigate('PostDetail', { id, focus: true })}
                                            style={styles.btn}
                                            android_ripple={{ color: COLOR2 }}
                                        >
                                            <Icon name='insert-comment' color={GRAY3} size={16} />
                                            <Text style={styles.btnText} >{!!data.post.commentCount ? `댓글 ${data.post.commentCount}` : '댓글쓰기'}</Text>
                                        </Pressable>
                                    </View>
                                </>
                            }
                            renderItem={({ item }) => <PostDetailCommentCard {...item} />}
                        />}
                    </View>
                    <PostDetailFooter />
                </KeyboardAvoidingView>
                <View style={{ backgroundColor: COLOR1, width: '100%', height: bottom }} />
            </ScreenLayout >
        </PostDetailContext.Provider>
    )
}

export default PostDetail

const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row'
    },
    rightBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24
    },
    postInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    type: {
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1
    },
    createdAt: {
        fontSize: 12,
        color: GRAY1
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    userImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    userName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8
    },
    userInfo: {
        fontSize: 12,
        color: GRAY1
    },
    content: {
        lineHeight: 20,
        flex: 1,
        marginBottom: 16
    },
    btnContainer: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        marginBottom: 24
    },
    btn: {
        paddingHorizontal: 16,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    btnText: {
        fontSize: 12,
        color: GRAY1,
        marginLeft: 8
    }
})