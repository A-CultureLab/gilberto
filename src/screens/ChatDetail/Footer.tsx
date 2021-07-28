import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, COLOR2 } from '../../constants/styles'
import { useCreateChat } from '../../graphql/chat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import { useRef } from 'react'

const Footer: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {


    const inputRef = useRef<TextInput>(null)

    const [createChat, { loading }] = useCreateChat()
    const [message, setMessage] = useState<string>()
    const { toast } = useGlobalUi()

    const onSend = useCallback(async () => {
        if (!message) return
        if (loading) return
        inputRef.current?.blur()
        const { errors } = await createChat({
            variables: {
                input: {
                    chatRoomId,
                    message
                }
            }
        })
        if (errors) {
            toast({ content: '오류' })
            return
        }
        setMessage('')
    }, [message, chatRoomId, loading, inputRef])

    return (
        <View style={[styles.container]} >
            <Pressable style={styles.addBtn} >

            </Pressable>
            {!message && <View style={styles.line} />}
            <TextInput
                ref={inputRef}
                value={message}
                onChangeText={(t) => setMessage(t)}
                style={styles.input}
                maxLength={1000}
                multiline
            />
            <Pressable
                onPress={onSend}
                style={styles.sendBtn}
                android_ripple={{ color: COLOR2 }}
            >
                {loading
                    ? <ActivityIndicator color='#fff' size='small' />
                    : <Icon name='send' color='#fff' size={16} />
                }
            </Pressable>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLOR1,
        flexDirection: 'row',
        minHeight: 56,
        alignItems: 'center'
    },
    addBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        alignSelf: 'center',
        width: 1,
        height: 16,
        backgroundColor: '#fff'
    },
    input: {
        flex: 1,
        color: '#fff',
        maxHeight: 200,
        lineHeight: 20,
        padding: 0,
        marginVertical: 16,
        // backgroundColor: 'red',
    },
    sendBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})