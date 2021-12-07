import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import useGlobalUi from '../../hooks/useGlobalUi'
import WeightSelectSheet from './WeightSelectSheet'

interface SelectorProps {
    label?: string
    value?: string | null
    values: string[]
    placeholder?: string
    onSelect: (i: number) => void
    style?: StyleProp<ViewStyle>
}

const Selector: React.FC<SelectorProps> = ({ label, value, values, onSelect, style, placeholder }) => {

    const { select } = useGlobalUi()

    const onPress = useCallback(() => {
        select({
            list: values,
            onSelect
        })
    }, [select, values])

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <Pressable
                onPress={onPress}
                style={[styles.container, style]}
            >
                <Text style={{ color: value ? '#000' : '#ccc', alignSelf: value ? 'auto' : 'flex-start' }} >{value || placeholder}</Text>
            </Pressable>

        </>
    )
}

export default Selector

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
        paddingHorizontal: 16
    }
})