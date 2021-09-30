import { useNavigation } from '@react-navigation/core'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY1 } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import { postComments_postComments } from '../../graphql/__generated__/postComments'

const PostDetailCommentCard: React.FC<postComments_postComments> = (props) => {

    const { navigate } = useNavigation()

    const { data } = useIUser({ fetchPolicy: 'cache-only' })

    const { user, image, id, content, createdAt } = props

    const isPoster = data?.iUser.id === user.id

    return (
        <Pressable
            onPress={() => navigate('PostCommentDetail', { id })}
            style={styles.container}
        >
            <Pressable
                onPress={() => navigate('UserDetail', { id: user.id })}
            >
                <FastImage
                    style={styles.image}
                    source={{ uri: user.image }}
                />
            </Pressable>
            <View>
                <Text style={styles.name} >{user.name}<Text style={styles.poster} >{isPoster ? '  작성자' : ''}</Text></Text>
                <Text style={styles.userInfo} >{user.address.adressShort} ∙ {dayjs(createdAt).fromNow()}</Text>
                <Text style={styles.content} >{content}</Text>
                <Pressable onPress={() => navigate('PostCommentDetail', { id, focus: true })}>
                    <Text style={styles.reply} >답글쓰기 { }</Text>
                </Pressable>
            </View>
        </Pressable >
    )
}

export default PostDetailCommentCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 8,
        flexDirection: 'row',
    },
    image: {
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
    reply: {
        fontSize: 12,
        fontWeight: 'bold',
        color: GRAY1,
        marginVertical: 16
    }
})