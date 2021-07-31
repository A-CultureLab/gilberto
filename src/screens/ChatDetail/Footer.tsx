import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View, Keyboard, Text, BackHandler } from 'react-native'
import { COLOR1, COLOR2, GRAY3 } from '../../constants/styles'
import { useCreateChat } from '../../graphql/chat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import { useRef } from 'react'
import useImageUpload from '../../hooks/useImageUpload'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated'

const Footer: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {


    const inputRef = useRef<TextInput>(null)

    const [createChat, { loading }] = useCreateChat()
    const [message, setMessage] = useState<string>()
    const { toast } = useGlobalUi()
    const { clear, upload, loading: imageUploadLoading } = useImageUpload('chatImage')
    const [optionVisible, setOptionVisible] = useState(false)
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        const KeyboardWillShowListner = Keyboard.addListener('keyboardWillShow', () => { setOptionVisible(false); setFocused(true) })
        const KeyboardDidShowListner = Keyboard.addListener('keyboardDidShow', () => { setOptionVisible(false); setFocused(true) })
        const keyboardDidHideListner = Keyboard.addListener('keyboardDidHide', () => { setFocused(false); inputRef.current?.blur() })
        const keyboardWillHideListner = Keyboard.addListener('keyboardWillHide', () => { setFocused(false); inputRef.current?.blur() })

        return () => {
            Keyboard.removeSubscription(KeyboardWillShowListner)
            Keyboard.removeSubscription(KeyboardDidShowListner)
            Keyboard.removeSubscription(keyboardDidHideListner)
            Keyboard.removeSubscription(keyboardWillHideListner)
        }
    }, [])

    useEffect(() => { // android backhandler
        if (!optionVisible) return
        const listner = BackHandler.addEventListener('hardwareBackPress', () => {
            setOptionVisible(false)
            return true
        })

        return () => {
            listner.remove()
        }
    }, [optionVisible])


    const onSend = useCallback(async (image?: string | null) => {
        if (!message && !image) return
        if (loading || imageUploadLoading) return

        inputRef.current?.blur()
        Keyboard.dismiss()
        setOptionVisible(false)

        const { errors } = await createChat({
            variables: {
                input: {
                    chatRoomId,
                    message: image ? undefined : message || undefined,
                    image: image || undefined
                }
            }
        })
        if (errors) {
            toast({ content: '오류' })
            return
        }
        setMessage('')
        clear()
    }, [message, chatRoomId, loading, inputRef, imageUploadLoading])

    const onOptions = useCallback(() => {
        if (!optionVisible) Keyboard.dismiss()
        setOptionVisible(prev => !prev)
    }, [optionVisible])

    const OPTIONS = [
        {
            title: '앨범',
            icon: <Icon name='album' color='#fff' size={24} />,
            onPress: () => {
                upload().then(v => onSend(v))
            }
        },
        {
            title: '카메라',
            icon: <Icon name='camera' color='#fff' size={24} />,
            onPress: () => {
                upload({ camera: true }).then(v => onSend(v))
            }
        },
    ]


    return (
        <>
            <View style={[styles.container]} >
                <Pressable
                    onPress={onOptions}
                    style={[styles.addBtn, { transform: [{ rotate: optionVisible ? '45deg' : '0deg' }] }]}
                >
                    <Icon name='add' color='#fff' size={24} />
                </Pressable>
                {(!message && !focused) && <View style={styles.line} />}
                <TextInput
                    ref={inputRef}
                    value={message}
                    onChangeText={(t) => setMessage(t)}
                    style={styles.input}
                    maxLength={1000}
                    multiline
                />
                <Pressable
                    onPress={() => onSend()}
                    style={styles.sendBtn}
                >
                    {loading || imageUploadLoading
                        ? <ActivityIndicator color='#fff' size='small' />
                        : <Icon name='send' color='#fff' size={16} />
                    }
                </Pressable>
            </View>
            {optionVisible && <View style={styles.optionContainer} >
                {OPTIONS.map(v => (
                    <View
                        style={styles.optionItem}
                        key={v.title}
                    >
                        <View style={{ alignItems: 'center' }} >
                            <Pressable
                                onPress={v.onPress}
                                style={styles.optionIconContainer}
                            >
                                {v.icon}
                            </Pressable>
                            <Text>{v.title}</Text>
                        </View>
                    </View>
                ))}
            </View>}
        </>
    )
}

export default Footer

const styles = StyleSheet.create({
    optionContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GRAY3,
        paddingHorizontal: 24,
        height: '40%',
        overflow: 'hidden'
    },
    optionItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR1,
        marginBottom: 8
    },
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