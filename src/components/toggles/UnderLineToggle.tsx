import React from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { StyleProp, StyleSheet, Text, View, TextInput, TextInputProps, ViewProps, Pressable, ViewStyle, TextStyle } from 'react-native'
import { COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import Toggle, { ToggleProps } from './Toggle'

interface UnderLineToggleProps {
    text?: string
    textStyle?: StyleProp<TextStyle>
    style?: StyleProp<ViewStyle>
}

const UnderLineToggle: React.FC<UnderLineToggleProps & ToggleProps> = ({ text, textStyle, style, onChange, value }) => {

    return (
        <Pressable
            android_ripple={{ color: GRAY2 }}
            style={[styles.container, style]}
            onPress={() => onChange(!value)}
        >
            <Toggle
                value={value}
                onChange={onChange}
            />
            <Text style={[styles.text, { color: value ? '#000' : GRAY1 }, textStyle]} >{text}</Text>
        </Pressable>
    )
}

export default UnderLineToggle

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: "row",
        alignItems: 'center'
    },
    text: {
        lineHeight: 16,
        margin: 0,
        padding: 0,
        marginLeft: 8
    },
})