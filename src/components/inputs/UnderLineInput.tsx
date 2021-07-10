import React from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { StyleProp, StyleSheet, Text, View, TextInput, TextInputProps, ViewProps, Pressable, ViewStyle, TextStyle } from 'react-native'
import { COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'

interface UnderLineInputProps {
    onPress?: () => void
    inputStyle?: StyleProp<TextStyle>
    style?: StyleProp<ViewStyle>
}

const UnderLineInput: React.FC<UnderLineInputProps & TextInputProps> = ({ onPress: _onPress, inputStyle, style, onChange, ...textInputProps }) => {

    const inputRef = useRef<TextInput>(null)

    const onPress = useCallback(() => {
        if (_onPress) {
            _onPress()
            return
        }
        inputRef.current?.focus()
    }, [_onPress])


    return (
        <Pressable
            android_ripple={{ color: GRAY2 }}
            style={[styles.container, style]}
            onPress={onPress}
        >
            <TextInput
                ref={inputRef}
                style={[styles.input, inputStyle]}
                placeholderTextColor={GRAY1}
                {...textInputProps}
            />
        </Pressable>
    )
}

export default UnderLineInput

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        paddingVertical: 20,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        width: '100%'
    },
    input: {
        lineHeight: 16,
        margin: 0,
        padding: 0,
        alignSelf: 'flex-start',
        color: '#000'
    },
    wrapper: {
        position: 'absolute',
    }
})