import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import { AnimalType } from '../../constants/type'
import { ANIMAL_SPECIES } from '../../constants/values'
import DefaultBottomSheet from '../bottomSheets/DefaultBottomSheet'

const DOG_FILTER_KEYS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const CAT_FILTER_KEYS = ['ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

interface SpeciesSelectPickerProps {
    visible: boolean
    onClose: () => void
    onSelect: (s: string) => void
    type: AnimalType
}


const SpeciesSelectPicker: React.FC<SpeciesSelectPickerProps> = ({ onClose, onSelect, visible, type }) => {

    const [filterKey, setFilterKey] = useState(type === 'cat' ? 'ㄴ' : 'ㄱ')
    const { bottom } = useSafeAreaInsets()

    const onSubmit = useCallback((s: string) => {
        onSelect(s)
        onClose()
    }, [])

    const list = ANIMAL_SPECIES[type][filterKey]

    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={onClose}
        >
            <View>
                <ScrollView
                    horizontal
                    overScrollMode='never'
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 24 + 32 }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}
                    >
                        <View style={{ width: 16 }} />
                        {(type === 'cat' ? CAT_FILTER_KEYS : DOG_FILTER_KEYS).map(v => (
                            <Pressable
                                key={v}
                                style={[styles.keyContainer, { backgroundColor: filterKey === v ? GRAY2 : '#fff', borderColor: filterKey === v ? GRAY2 : GRAY3 }]}
                                onPress={() => setFilterKey(v)}
                            >
                                <Text style={{ color: v === filterKey ? '#fff' : '#000' }} >{v}</Text>
                            </Pressable>
                        ))}
                        <View style={{ width: 8 }} />
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={styles.scrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={true}
                >
                    <TouchableOpacity activeOpacity={1} >
                        {list.map(v => (
                            <Pressable
                                key={v}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.itemContainer}
                                onPress={() => onSubmit(v)}
                            >
                                <Text>{v}</Text>
                            </Pressable>
                        ))}
                        <View style={{ height: bottom }} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </DefaultBottomSheet>
    )
}

export default SpeciesSelectPicker

const styles = StyleSheet.create({
    keyContainer: {
        paddingHorizontal: 8,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 8,
        alignSelf: 'center'
    },
    scrollView: {
        height: 56 * 7.5,
        width: WIDTH
    },
    itemContainer: {
        width: '100%',
        height: 56,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    }
})