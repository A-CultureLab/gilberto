import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, WIDTH } from '../../constants/styles'
import DefaultBottomSheet from './DefaultBottomSheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface SelectProps {
    visible: boolean
    onClose: () => void
    list: string[]
    onSelect: (index: number) => void
    selectedDataIndex?: number
    closeToSelect?: boolean
}

const Select: React.FC<SelectProps> = ({ onClose, visible, list, onSelect: _onSelect, selectedDataIndex, closeToSelect }) => {

    const { bottom } = useSafeAreaInsets()

    const onSelect = useCallback((i: number) => {
        onClose && onClose()
        _onSelect(i)
    }, [onClose, _onSelect])


    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={() => closeToSelect ? onSelect(-1) : onClose()}
        >
            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={true}
                style={styles.scrollView}
            >
                <TouchableOpacity activeOpacity={0} >
                    {list.map((v, i) =>
                        <Pressable
                            key={i.toString()}
                            onPress={() => onSelect(i)}
                            android_ripple={{ color: GRAY2 }}
                            style={styles.itemContainer}
                        >
                            <Text>{v}</Text>
                            {selectedDataIndex === i && <View style={styles.check} >
                                <Icon name='check' color={COLOR1} size={16} />
                            </View>}
                        </Pressable>
                    )}
                    <View style={{ height: bottom }} />
                </TouchableOpacity>
            </ScrollView>
        </DefaultBottomSheet>
    )
}

export default Select

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 56 * 5.5,
        width: WIDTH
    },
    itemContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
    },
    check: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: 0
    }
})