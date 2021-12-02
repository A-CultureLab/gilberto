import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { COLOR1 } from '../../constants/styles'

interface HorizontalSelectorProps {
    label?: string
    values: string[]
    value: string | null
    onChange: (v: string) => void
    style?: StyleProp<ViewStyle>
}

const HorizontalSelector: React.FC<HorizontalSelectorProps> = ({ label, value, values, onChange, style }) => {

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <View style={[styles.container, style]} >
                {values.map((v, i) => (
                    <Pressable
                        key={v}
                        onPress={() => onChange(v)}
                        style={[v === value ? styles.selectedBtn : styles.btn, { marginLeft: i === 0 ? 0 : 12 }]}
                    >
                        <Text style={{ color: v === value ? COLOR1 : '#000', fontWeight: v === value ? 'bold' : 'normal' }} >{v}</Text>
                    </Pressable>
                ))}
            </View>
        </>
    )
}

export default HorizontalSelector

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        alignSelf: 'flex-start'
    },
    container: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        height: '100%',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedBtn: {
        flex: 1,
        height: '100%',
        borderRadius: 9,
        borderWidth: 2,
        borderColor: COLOR1,
        backgroundColor: 'rgba(248, 145, 50, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})