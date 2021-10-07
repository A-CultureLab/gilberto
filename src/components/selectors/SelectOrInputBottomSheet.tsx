import React, { useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, WIDTH } from '../../constants/styles'
import DefaultModalBottomSheet from '../bottomSheets/DefaultModalBottomSheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IS_IOS } from '../../constants/values'

interface SelectOrInputBottomSheetProps {
    visible: boolean
    onClose: () => void
    list: string[]
    onSelect: (t: string) => void
    selectedDataIndex?: number
}

const SelectOrInputBottomSheet: React.FC<SelectOrInputBottomSheetProps> = ({ onClose, visible, list, onSelect: _onSelect, selectedDataIndex }) => {

    const inputRef = useRef<TextInput>(null)

    const { bottom } = useSafeAreaInsets()

    const onSelect = useCallback((t: string) => {
        onClose && onClose()
        _onSelect(t)
    }, [onClose])

    return (
        <DefaultModalBottomSheet
            visible={visible}
            onClose={onClose}
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
                            onPress={() => onSelect(list[i])}
                            android_ripple={{ color: GRAY2 }}
                            style={styles.itemContainer}
                        >
                            <Text>{v}</Text>
                            {selectedDataIndex === i && <View style={styles.check} >
                                <Icon name='check' color={COLOR1} size={16} />
                            </View>}
                        </Pressable>
                    )}

                    <Pressable
                        style={styles.inputContainer}
                        android_ripple={{ color: GRAY2 }}
                        onPress={() => inputRef.current?.focus()}
                    >
                        <TextInput
                            ref={inputRef}
                            placeholder='직접입력'
                            placeholderTextColor='#000'
                            style={{ color: '#000', margin: 0, padding: 0 }}
                            onSubmitEditing={({ nativeEvent }) => onSelect(nativeEvent.text)}
                        />
                    </Pressable>
                    <View style={{ height: bottom }} />
                </TouchableOpacity>
            </ScrollView>
        </DefaultModalBottomSheet>
    )
}

export default SelectOrInputBottomSheet

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
    },
    inputContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 24,
        alignItems: 'center',
    }
})