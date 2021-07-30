import React from 'react'
import { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY1, GRAY2 } from '../../constants/styles'
import { chatRooms_chatRooms } from '../../graphql/__generated__/chatRooms'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/core'
import dayjs from 'dayjs'

const ChatCard: React.FC<chatRooms_chatRooms> = (props) => {


    const { navigate } = useNavigation()
    const { id, notReadChatCount, recentChat, users, name } = props

    const onPress = useCallback(() => {
        navigate('ChatDetail', { id })
    }, [id])

    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: GRAY2 }}
            style={styles.container}
        >
            <FastImage
                style={styles.image}
                source={{ uri: users[0].image }}
            />
            <View style={styles.contentContainer} >
                <Text style={styles.title} >{name}</Text>
                <Text style={styles.recentChat} numberOfLines={1} >{recentChat ? recentChat.message || '사진' : ''}</Text>
            </View>
            <View style={styles.metaDataContainer} >
                <Text style={styles.recentChatDate} >{recentChat && dayjs(recentChat.createdAt).fromNow()}</Text>
                <View style={[styles.notReadChatCountContainer, { opacity: notReadChatCount > 0 ? 1 : 0 }]} >
                    <Text style={styles.notReadChatCount} >{notReadChatCount > 300 ? '300+' : notReadChatCount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ChatCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        overflow: 'hidden'
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    metaDataContainer: {
        alignItems: 'flex-end'
    },
    title: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    recentChat: {
        fontSize: 12
    },
    notReadChatCountContainer: {
        height: 18,
        paddingHorizontal: 9,
        backgroundColor: COLOR1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notReadChatCount: {
        fontSize: 12,
        color: '#fff'
    },
    recentChatDate: {
        fontSize: 12,
        color: GRAY1,
        marginBottom: 8
    }
})