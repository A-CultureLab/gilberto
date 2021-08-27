import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ChatRoomType } from '../../../__generated__/globalTypes'
import { COLOR1, COLOR2, COLOR3, GRAY2, GRAY3, STATUSBAR_HEIGHT } from '../../constants/styles'
import { useUpdateUserChatRoomInfo } from '../../graphql/userChatRoomInfo'
import { chats_chatRoom } from '../../graphql/__generated__/chats'

interface ChatDetailDrawerProps {
    data: chats_chatRoom
}

const ChatDetailDrawer: React.FC<ChatDetailDrawerProps> = ({ data }) => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const [updateUserChatRoomInfo] = useUpdateUserChatRoomInfo()

    const [notificated, setNotificated] = useState(data.iUserChatRoomInfo.notificated)
    const [notificatedTrigger, setNotificatedTrigger] = useState(true)
    const [bookmarked, setBookmarked] = useState(data.iUserChatRoomInfo.bookmarked)
    const [bookmarkedTrigger, setBookmarkedTrigger] = useState(true)

    // notification on/off
    useEffect(() => {
        if (notificatedTrigger) return setNotificatedTrigger(false)
        updateUserChatRoomInfo({
            variables: {
                input: {
                    id: data.iUserChatRoomInfo.id,
                    notificated: notificated
                }
            }
        })
    }, [notificated])
    // bookmark on/off
    useEffect(() => {
        if (bookmarkedTrigger) return setBookmarkedTrigger(false)
        updateUserChatRoomInfo({
            variables: {
                input: {
                    id: data.iUserChatRoomInfo.id,
                    bookmarked: bookmarked
                }
            }
        })
    }, [bookmarked])


    return (
        <View style={styles.container} >
            <FlatList
                showsHorizontalScrollIndicator={false}
                overScrollMode='never'
                data={data.userChatRoomInfos.map(({ user }) => user)}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigate('UserDetail', { id: item.id })} android_ripple={{ color: GRAY2 }} style={styles.userContainer} >
                        <FastImage
                            source={{ uri: item.image }}
                            style={styles.userImage}
                        />
                        <Text numberOfLines={1} >{item.name}</Text>
                    </Pressable>
                )}
                ListHeaderComponent={<>
                    <Text style={styles.title} >설정</Text>
                    {data.type === ChatRoomType.private && <Pressable android_ripple={{ color: GRAY2 }} style={styles.settingsContainer}  >
                        <Text>차단하기</Text>
                    </Pressable>}
                    <Pressable android_ripple={{ color: GRAY2 }} style={styles.settingsContainer}  >
                        <Text>신고하기</Text>
                    </Pressable>
                    <Text style={[styles.title, { marginTop: 64 }]} >대화상대</Text>
                </>}
            />

            <View style={[styles.footer, { paddingBottom: bottom, height: 56 + bottom }]} >
                <Pressable android_ripple={{ color: GRAY2 }} style={styles.footerButton} >
                    <Icon name='exit-to-app' color='#fff' size={24} />
                </Pressable>
                <View style={styles.footerRight} >
                    <Pressable android_ripple={{ color: GRAY2 }} style={styles.footerButton} onPress={() => setNotificated(prev => !prev)} >
                        <Icon name={notificated ? 'notifications' : 'notifications-none'} color='#fff' size={24} />
                    </Pressable>
                    <Pressable android_ripple={{ color: GRAY2 }} style={styles.footerButton} onPress={() => setBookmarked(prev => !prev)}  >
                        <Icon name={bookmarked ? 'star' : 'star-border'} color='#fff' size={24} />
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default ChatDetailDrawer

const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 16,
        marginVertical: 24,
    },
    settingsContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    },
    userContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 16
    },
    footer: {
        width: '100%',
        backgroundColor: COLOR1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerButton: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})