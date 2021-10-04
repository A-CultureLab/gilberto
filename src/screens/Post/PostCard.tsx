import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { posts_posts } from '../../graphql/__generated__/posts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { POST_TYPES } from '../../constants/values'
import dayjs from 'dayjs'
import meterUnit from '../../utils/meterUnit'
import Images from '../../components/images/Images'
import { useLikePost } from '../../graphql/post'
import HyperLink from 'react-native-hyperlink'

const PostCard: React.FC<posts_posts> = (props) => {

    const { id, user, content, images, createdAt, commentCount, type, isILiked, likeCount } = props


    const { navigate } = useNavigation()

    const [likePost] = useLikePost({ variables: { id, like: !isILiked } })


    return (
        <View >
            <Pressable
                onPress={() => navigate('PostDetail', { id })}
                android_ripple={{ color: GRAY2 }}
                style={styles.container}
            >
                <View style={styles.contentContainer} >
                    <Pressable
                        onPress={() => navigate('UserDetail', { id: user.id })}
                        style={styles.image}
                    >
                        <FastImage
                            style={{ width: 36, height: 36 }}
                            source={{ uri: user.image }}
                        />
                    </Pressable>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.type} >{POST_TYPES.find(v => v.value === type)?.name}</Text>
                        <HyperLink linkDefault={true} linkStyle={{ color: COLOR2 }} >
                            <Text numberOfLines={3} style={styles.content} >{content}</Text>
                        </HyperLink>
                    </View>
                </View>
                {!!images.length &&
                    <Images
                        onPress={(urls, index) => navigate('ImageDetail', { urls, index })}
                        style={{ marginBottom: 16 }}
                        urls={images.map(v => v.url)}
                    />
                }
                <View style={styles.userInfoContainer} >
                    <Text style={[styles.userInfo, { flex: 1 }]} >{`${user.name} ∙ ${user.address.adressShort} ∙ ${meterUnit(user.address.distance || 0)}`}</Text>
                    <Text style={styles.userInfo} >{dayjs(createdAt).fromNow()}</Text>
                </View>
            </Pressable>
            <View style={styles.btnContainer} >
                <Pressable
                    onPress={() => likePost()}
                    android_ripple={{ color: GRAY2 }}
                    style={styles.btn}
                >
                    <Icon name='thumb-up' color={isILiked ? COLOR1 : GRAY3} size={16} />
                    <Text style={[styles.btnText, { color: isILiked ? COLOR1 : GRAY1 }]} >좋아요{!!likeCount ? ` ${likeCount}` : ''}</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigate('PostDetail', { id, focus: true })}
                    style={styles.btn}
                    android_ripple={{ color: GRAY2 }}
                >
                    <Icon name='insert-comment' color={GRAY3} size={16} />
                    <Text style={styles.btnText} >{!!commentCount ? `댓글 ${commentCount}` : '댓글쓰기'}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
        overflow: 'hidden'
    },
    type: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8
    },
    content: {
        lineHeight: 20,
        flex: 1
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userInfo: {
        fontSize: 10,
        color: GRAY1
    },
    btnContainer: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
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