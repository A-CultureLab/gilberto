import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { COLOR1 } from '../../constants/styles'
import DateSelectSheet from './DateSelectSheet'

interface DateSelectorProps {
    label?: string
    value?: Date | null
    onChange: (date: Date) => void
    style?: StyleProp<ViewStyle>
}

const DateSelector: React.FC<DateSelectorProps> = ({ label, value, onChange, style }) => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <Pressable
                onPress={() => setVisible(true)}
                style={[styles.container, style]}
            >
                <Text style={{ color: value ? '#000' : '#ccc', alignSelf: value ? 'auto' : 'flex-start' }} >{value ? dayjs(value).format('YYYY-MM-DD') : '생년월일을 입력해주세요'}</Text>
            </Pressable>
            <DateSelectSheet
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={onChange}
            />
        </>
    )
}

export default DateSelector

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