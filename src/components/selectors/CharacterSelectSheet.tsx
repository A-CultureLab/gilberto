import React, { useCallback, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { COLOR2, GRAY2, GRAY3 } from '../../constants/styles'
import { AnimalType } from '../../constants/type'
import { ANIMAL_CHARACTER, IS_IOS } from '../../constants/values'
import DefaultBottomSheet from '../bottomSheets/DefaultBottomSheet'

interface CharacterSelectSheetProps {
    visible: boolean
    onClose: () => void
    onSelect: (character: string) => void
    type: AnimalType
}

const CharacterSelectSheet: React.FC<CharacterSelectSheetProps> = ({ visible, onClose, onSelect, type }) => {

    const inputRef = useRef<TextInput>(null)

    const data = ANIMAL_CHARACTER[type]

    const onPress = useCallback((v: string) => {
        if (!v) return
        onSelect(v)
        onClose()
    }, [onSelect])

    return (
        <DefaultBottomSheet
            visible={visible}
            onClose={onClose}
            enableBottomSafeArea
        >
            <View  >
                {data.map((v, i) => (
                    <Pressable
                        key={v}
                        android_ripple={{ color: GRAY2 }}
                        style={styles.itemContainer}
                        onPress={() => onPress(v)}
                    >
                        <Text>{v}</Text>
                    </Pressable>
                ))}
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
                        onSubmitEditing={({ nativeEvent }) => onPress(nativeEvent.text)}
                    />
                </Pressable>
            </View>
        </DefaultBottomSheet>
    )
}

export default CharacterSelectSheet

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    },
    inputContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    }
})