import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import WeightSelectSheet from './WeightSelectSheet'

interface WeightSelectorProps {
    label?: string
    value?: number | null
    onChange: (w: number) => void
    style?: StyleProp<ViewStyle>
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ label, value, onChange, style }) => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <Pressable
                onPress={() => setVisible(true)}
                style={[styles.container, style]}
            >
                <Text style={{ color: value ? '#000' : '#ccc', alignSelf: 'center' }} >{value || '선택'}</Text>
                <Text style={{ fontWeight: 'bold', position: 'absolute', right: 16 }} >kg</Text>
            </Pressable>
            <WeightSelectSheet
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={onChange}
            />
        </>
    )
}

export default WeightSelector

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
        flexDirection: 'row'
    }
})