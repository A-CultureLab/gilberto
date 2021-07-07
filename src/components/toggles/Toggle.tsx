import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'

interface ToggleProps {
    initValue?: boolean
    value?: boolean
    onChange?: (v: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({ value: _value, onChange, initValue }) => {

    const [value, setValue] = useState(initValue || false)

    useEffect(() => {
        _value && setValue(_value)
    }, [_value])

    useEffect(() => {
        onChange && onChange(value)
    }, [value])


    return (
        <Pressable
            onPress={() => setValue(prev => !prev)}
            android_ripple={{ borderless: true, color: GRAY2, radius: 24 }}
            style={styles.container}
        >
            <Icon name={value ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={value ? COLOR1 : GRAY1} />
        </Pressable>
    )
}

export default Toggle

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    }
})