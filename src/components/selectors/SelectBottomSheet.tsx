import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, WIDTH } from '../../constants/styles'
import DefaultBottomSheet from '../bottomSheets/DefaultBottomSheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { useEffect } from 'react'

export interface SelectBottomSheetProps {
    visible: boolean
    onClose: () => void
    list: string[]
    onSelect: (index: number) => void
    selectedDataIndex?: number
    closeToSelect?: boolean
    callWhenHide?: boolean
}

const SelectBottomSheet: React.FC<SelectBottomSheetProps> = ({ onClose, visible, list, onSelect: _onSelect, selectedDataIndex, closeToSelect, callWhenHide }) => {

    const { bottom } = useSafeAreaInsets()
    const [selected, setSelected] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const onSelect = useCallback((i: number) => {
        if (selected) return // 두번 실행 방지
        onClose && onClose()

        if (!callWhenHide) _onSelect(i)
        else setSelectedIndex(i)

        setSelected(true)
    }, [onClose, _onSelect, selected, callWhenHide])

    // modal 중첩시 오류가 날때가 있음
    const onModaHide = useCallback(() => {
        if (!callWhenHide) return
        if (selectedIndex !== -1) _onSelect(selectedIndex)
    }, [selectedIndex, callWhenHide])

    useEffect(() => {
        if (visible) {
            setSelected(false)
            setSelectedIndex(-1)
        }
    }, [visible])


    return (
        <DefaultBottomSheet
            visible={visible}
            onModalHide={onModaHide}
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

export default SelectBottomSheet

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