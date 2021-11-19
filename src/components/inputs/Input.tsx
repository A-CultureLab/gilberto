import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps {
    label?: string
}

const Input: React.FC<TextInputProps & InputProps> = ({ label, ...props }) => {
    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <TextInput
                {...props}
                placeholderTextColor='#ccc'
                style={[styles.input, props.style]}
            />
        </>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        alignSelf: 'flex-start'
    },
    input: {
        width: '100%',
        height: 44,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        paddingHorizontal: 16
    }
})