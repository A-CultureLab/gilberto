import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { PetType } from '../../../__generated__/globalTypes'
import SpeciesSelectSheet from './SpeciesSelectSheet'

interface SpeciesSelectorProps {
    label?: string
    value?: string | null
    type: PetType
    onChange: (s: string) => void
    style?: StyleProp<ViewStyle>
}

const SpeciesSelector: React.FC<SpeciesSelectorProps> = ({ label, value, onChange, style, type }) => {

    const [visible, setVisible] = useState(false)

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <Pressable
                onPress={() => setVisible(true)}
                style={[styles.container, style]}
            >
                <Text style={{ color: value ? '#000' : '#ccc', alignSelf: value ? 'auto' : 'flex-start' }} >{value || '종을 입력해주세요'}</Text>
            </Pressable>
            <SpeciesSelectSheet
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={onChange}
                type={type}
            />
        </>
    )
}

export default SpeciesSelector

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