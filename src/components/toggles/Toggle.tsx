import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'

export interface ToggleProps {
    value: boolean
    onChange: (v: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => {



    return (
        <Pressable
            onPress={() => onChange(!value)}
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