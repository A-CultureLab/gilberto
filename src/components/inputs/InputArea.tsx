import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface InputAreaProps {
    label?: string
}

const InputArea: React.FC<TextInputProps & InputAreaProps> = ({ label, style, ...props }) => {
    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <View style={[styles.container, style]} >
                <TextInput
                    {...props}
                    placeholderTextColor='#ccc'
                    multiline
                    maxLength={200}
                    numberOfLines={10}
                    style={[styles.input]}
                />
            </View>
        </>
    )
}

export default InputArea

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        alignSelf: 'flex-start'
    },
    container: {
        width: '100%',
        borderRadius: 9,
        borderWidth: 1,
        minHeight: 88,
        borderColor: '#e9e9e9',
        paddingHorizontal: 16,
        paddingVertical: 10,
        lineHeight: 20,
        maxHeight: 400
    },
    input: {

    }
})