import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { chats_chats } from '../../graphql/__generated__/chats'
import dayjs from 'dayjs'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import FastImage from 'react-native-fast-image'
import { useContext } from 'react'
import { AuthContext } from '..'
import { useNavigation } from '@react-navigation/native'
import HyperLink from 'react-native-hyperlink'
import { useCallback } from 'react'
import useGlobalUi from '../../hooks/useGlobalUi'
import Clipboard from '@react-native-clipboard/clipboard'
import { useDeleteChat } from '../../graphql/chat'


const IMAGE_LONG_PRESS_OPTIONS = ['신고하기']
const IMAGE_LONG_PRESS_OPTIONS_I_USER = ['삭제하기']
const MESSAGE_LONG_PERSS_OPTIONS = ['복사하기', '신고하기']
const MESSAGE_LONG_PERSS_OPTIONS_I_USER = ['복사하기', '삭제하기',]


const ChatDetailCard: React.FC<chats_chats> = (props) => {


    const { navigate } = useNavigation()
    const { confirm } = useGlobalUi()

    const { message, image, user, createdAt, id, isDeleted } = props
    const { user: iUser } = useContext(AuthContext)
    const { selector } = useGlobalUi()

    const userId = iUser?.uid
    const isIUser = userId === user.id

    const [deleteChat] = useDeleteChat({ variables: { id } })


    const onLongPress = useCallback(() => {
        if (isIUser && isDeleted) return
        const currentOption = image ? isIUser ? IMAGE_LONG_PRESS_OPTIONS_I_USER : IMAGE_LONG_PRESS_OPTIONS : isIUser ? MESSAGE_LONG_PERSS_OPTIONS_I_USER : MESSAGE_LONG_PERSS_OPTIONS
        selector({
            list: currentOption,
            onSelect: (i) => {
                const option = currentOption[i]
                if (option === '복사하기') Clipboard.setString(message || '')
                else if (option === '신고하기') { } // TODO
                else if (option === '삭제하기') {
                    setTimeout(() => {
                        confirm({
                            title: '삭제하기',
                            content: '정말 삭제하시겠습니까?',
                            onPress: (isYes) => {
                                if (!isYes) return
                                deleteChat()
                            }
                        })
                    }, 500)
                }
            }
        })
    }, [selector, isIUser, message, image, isDeleted])


    if (isIUser) return ( // iUserMessageCard
        <View style={styles.iUserMessageCardContainer} >
            <Text style={styles.date} >{dayjs(createdAt).format('a hh:mm')}</Text>
            {image
                ?
                <Pressable onLongPress={onLongPress} android_ripple={{ color: GRAY2 }} onPress={() => navigate('ImageDetail', { uris: [image], index: 0 })} >
                    <FastImage
                        source={{ uri: image || '' }}
                        style={styles.image}
                    />
                </Pressable>
                : <Pressable android_ripple={{ color: GRAY2 }} onLongPress={onLongPress} style={styles.iUserMessageCardMessageBox} >
                    <HyperLink linkDefault={true} onLongPress={onLongPress} linkStyle={{ color: COLOR2 }} >
                        <Text numberOfLines={50} style={styles.iUserMessageCardMessage} >{message}</Text>
                    </HyperLink>
                </Pressable>
            }
        </View>
    )
    else return ( // Normal MessageCard
        <View style={styles.normalMessageCardContainer} >
            <Pressable onPress={() => navigate('UserDetail', { id: userId })} >
                <FastImage
                    source={{ uri: user.image || '' }}
                    style={styles.normalMessageCardProfileImage}
                />
            </Pressable>
            {image
                ?
                <Pressable android_ripple={{ color: GRAY2 }} onLongPress={onLongPress} onPress={() => navigate('ImageDetail', { uris: [image], index: 0 })} >
                    <FastImage
                        source={{ uri: image || '' }}
                        style={styles.image}
                    />
                </Pressable>
                : <View style={{ maxWidth: '60%', alignItems: 'flex-start' }} >
                    <Text style={styles.normalMessageCardUserName} >{user.name}</Text>
                    <Pressable android_ripple={{ color: GRAY2 }} onLongPress={onLongPress} style={styles.normalMessageCardMessageBox} >
                        <HyperLink linkDefault={true} onLongPress={onLongPress} linkStyle={{ color: COLOR2 }} >
                            <Text numberOfLines={50} style={styles.normalMessageCardMessage} >{message}</Text>
                        </HyperLink>
                    </Pressable>
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
        maxWidth: '70%',
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