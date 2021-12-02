import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { COLOR1 } from '../../constants/styles'
import { createAddress_createAddress } from '../../graphql/__generated__/createAddress'
import useNavigation from '../../hooks/useNavigation'

interface AddressSelectorProps {
    label?: string
    value: createAddress_createAddress | null
    onChange: (v: createAddress_createAddress) => void
    style?: StyleProp<ViewStyle>
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ label, onChange, value, style }) => {

    const { navigate } = useNavigation()

    return (
        <>
            {label && <Text style={styles.label} >{label}</Text>}
            <View style={[styles.container, style]} >
                <View style={styles.input} ><Text numberOfLines={1} style={{ color: !!value ? '#000' : '#ccc' }} >{value?.land.name || '주소를 선택하세요'}</Text></View>

                <Pressable
                    onPress={() => navigate('SelectLocation', { onSelect: onChange })}
                    style={styles.btn}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }} >주소선택</Text>
                </Pressable>
            </View>
        </>
    )
}

export default AddressSelector

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
    input: {
        flex: 1,
        marginRight: 12,
        height: '100%',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    btn: {
        width: 120,
        height: '100%',
        borderRadius: 9,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})