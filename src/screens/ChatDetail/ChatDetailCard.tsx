import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { chats_chats } from '../../graphql/__generated__/chats'
import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import { COLOR1, GRAY1, GRAY3, WIDTH } from '../../constants/styles'
import FastImage from 'react-native-fast-image'
import { useContext } from 'react'
import { AuthContext } from '..'

const ChatDetailCard: React.FC<chats_chats> = (props) => {

    const { message, image, user, createdAt } = props
    const { user: iUser } = useContext(AuthContext)
    const userId = iUser?.uid


    if (userId === user.id) return ( // iUserMessageCard
        <View style={styles.iUserMessageCardContainer} >
            <Text style={styles.date} >{dayjs(createdAt).format('a hh:mm')}</Text>
            {image
                ?
                <FastImage
                    source={{ uri: image || '' }}
                    style={styles.image}
                />
                : <View style={styles.iUserMessageCardMessageBox} >
                    <Text numberOfLines={100} style={styles.iUserMessageCardMessage} >{message}</Text>
                </View>
            }
        </View>
    )
    else return ( // Normal MessageCard
        <View style={styles.normalMessageCardContainer} >
            <Pressable>
                <FastImage
                    source={{ uri: user.image || '' }}
                    style={styles.normalMessageCardProfileImage}
                />
            </Pressable>
            {image
                ?
                <FastImage
                    source={{ uri: image || '' }}
                    style={styles.image}
                />
                : <View style={{ maxWidth: '60%' }} >
                    <Text style={styles.normalMessageCardUserName} >{user.name}</Text>
                    <View style={styles.normalMessageCardMessageBox} >
                        <Text numberOfLines={100} style={styles.normalMessageCardMessage} >{message}</Text>
                    </View>
                </View>
            }
            <Text style={styles.date} >{dayjs(createdAt).format('a hh:mm')}</Text>
        </View>
    )
}

export default ChatDetailCard

const styles = StyleSheet.create({
    normalMessageCardContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    normalMessageCardProfileImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    normalMessageCardUserName: {
        marginTop: 4,
        fontSize: 10
    },
    normalMessageCardMessageBox: {
        marginTop: 8,
        borderRadius: 4,
        backgroundColor: GRAY3,
        padding: 8,
    },
    normalMessageCardMessage: {

    },
    iUserMessageCardContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 16
    },
    iUserMessageCardMessageBox: {
        backgroundColor: COLOR1,
        borderRadius: 4,
        padding: 8,
        maxWidth: '70%'
    },
    iUserMessageCardMessage: {
        color: '#fff'
    },
    date: {
        fontSize: 10,
        color: GRAY1,
        marginHorizontal: 8,
        alignSelf: 'flex-end'
    },
    image: { width: WIDTH / 2, height: WIDTH / 2, borderRadius: 4 }
})