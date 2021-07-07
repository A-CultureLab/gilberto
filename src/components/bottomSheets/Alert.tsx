import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY1 } from '../../constants/styles'
import Footer from '../footers/Footer'
import DefaultBottomSheet from './DefaultBottomSheet'

interface AlertProps {
    visible: boolean
    onClose: () => void
    title: string
    content: string
    buttonText?: string
}

const Alert: React.FC<AlertProps> = ({ visible, onClose, title, content, buttonText }) => {
    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View style={styles.container} >
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.content} >{content}</Text>
                <Footer onPress={onClose} text={buttonText || '예'} />
            </View>
        </DefaultBottomSheet>
    )
}

export default Alert

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
    }
})