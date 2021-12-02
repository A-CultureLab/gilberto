import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { COLOR1 } from '../../constants/styles'

interface VerticalSelectorProps {
    values: string[]
    value: string | null
    onChange: (v: string) => void
    style?: StyleProp<ViewStyle>
}

const VerticalSelector: React.FC<VerticalSelectorProps> = ({ value, values, onChange, style }) => {

    return (
        <>
            <View style={[styles.container, style]} >
                {values.map((v, i) => (
                    <Pressable
                        key={v}
                        onPress={() => onChange(v)}
                        style={[v === value ? styles.selectedBtn : styles.btn, { marginTop: i === 0 ? 0 : 12 }]}
                    >
                        <Text style={{ color: v === value ? COLOR1 : '#000', fontWeight: v === value ? 'bold' : 'normal' }} >{v}</Text>
                    </Pressable>
                ))}
            </View>
        </>
    )
}

export default VerticalSelector

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    btn: {
        height: 44,
        width: '100%',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedBtn: {
        height: 44,
        width: '100%',
        borderRadius: 9,
        borderWidth: 2,
        borderColor: COLOR1,
        backgroundColor: 'rgba(248, 145, 50, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})