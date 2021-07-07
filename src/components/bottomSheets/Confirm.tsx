import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import Footer from '../footers/Footer'
import DefaultBottomSheet from './DefaultBottomSheet'

interface ConfirmProps {
    visible: boolean
    onClose: () => void
    onPress?: (isYes: boolean) => void
    title: string
    content: string
    noText?: string
    yesText?: string
}

const Confirm: React.FC<ConfirmProps> = ({ visible, onClose, title, content, noText, yesText, onPress }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.container} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.content} >{content}</Text>
                <View style={[styles.footerContainer, { height: 56 + bottom }]} >
                    <Pressable
                        onPress={() => {
                            onClose()
                            onPress && onPress(false)
                        }}
                        android_ripple={{ color: GRAY1 }}
                        style={[styles.btn, { backgroundColor: GRAY2, paddingBottom: bottom }]}
                    >
                        <Text style={styles.btnText} >{noText || '아니요'}</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            onClose()
                            onPress && onPress(true)
                        }}
                        android_ripple={{ color: COLOR2 }}
                        style={[styles.btn, { backgroundColor: COLOR1, paddingBottom: bottom }]}
                    >
                        <Text style={styles.btnText} >{yesText || '예'}</Text>
                    </Pressable>
                </View>
            </View>
        </DefaultBottomSheet>
    )
}

export default Confirm

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,

    },
    content: {
        color: GRAY1,
        marginTop: 24,
        marginBottom: 48
    },
    footerContainer: {
        width: '100%',
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})