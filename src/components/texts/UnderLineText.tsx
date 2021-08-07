import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native'
import { GRAY3 } from '../../constants/styles'

interface UnderLineTextProps {
    textStyle?: StyleProp<TextStyle>
    style?: StyleProp<ViewStyle>
}

const UnderLineText: React.FC<UnderLineTextProps> = ({ style, textStyle, children }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
        </View>
    )
}

export default UnderLineText

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        width: '100%'
    },
    text: {
        lineHeight: 16,
        margin: 0,
        padding: 0,
        alignSelf: 'flex-start',
        color: '#000'
    }
})