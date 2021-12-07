import React, { ReactNode } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps {
    label?: string
    right?: ReactNode
}

const Input: React.FC<TextInputProps & InputProps> = ({ label, right, style, ...props }) => {
    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} >
                <TextInput
                    {...props}
                    placeholderTextColor='#ccc'
                    style={[styles.input]}
                />
                {right}
            </View>
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
        paddingHorizontal: 16,
        color: '#000'
    }
})