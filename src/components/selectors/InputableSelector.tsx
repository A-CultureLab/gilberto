import React, { useCallback, useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import SelectOrInputBottomSheet from './SelectOrInputBottomSheet'

interface InputableSelectorProps {
    label?: string
    value?: string | null
    values: string[]
    placeholder?: string
    onSelect: (v: string) => void
    style?: StyleProp<ViewStyle>
}

const InputableSelector: React.FC<InputableSelectorProps> = ({ label, value, values, onSelect, style, placeholder }) => {

    const [visibie, setVisible] = useState(false)


    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <Pressable
                onPress={() => setVisible(true)}
                style={[styles.container, style]}
            >
                <Text style={{ color: value ? '#000' : '#ccc', alignSelf: value ? 'auto' : 'flex-start' }} >{value || placeholder}</Text>
            </Pressable>
            <SelectOrInputBottomSheet
                list={values}
                onClose={() => setVisible(false)}
                onSelect={onSelect}
                visible={visibie}
            />
        </>
    )
}

export default InputableSelector

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        alignSelf: 'flex-start'
    },
    container: {
        width: '100%',
        height: 44,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    }
})