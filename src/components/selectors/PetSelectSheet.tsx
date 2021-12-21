import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import DefaultModalBottomSheet from '../bottomSheets/DefaultModalBottomSheet'

interface Pet {
    id: string, name: string, image: string
}

interface PetSelectSheetProps {
    visible: boolean
    onClose: () => void
    onSelect: (pet: Pet) => void
    list: Pet[]
}

const PetSelectSheet: React.FC<PetSelectSheetProps> = ({ list, onClose, onSelect, visible }) => {
    return (
        <DefaultModalBottomSheet
            visible={visible}
            onClose={onClose}
            enableBottomSafeArea
        >
            <View style={{ marginBottom: 24 }} >
                <FlatList
                    overScrollMode='never'
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<View style={{ width: 20 }} />}
                    data={list}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => onSelect(item)}
                            style={{ alignItems: 'center', marginRight: 20 }}
                        >
                            <FastImage
                                source={{ uri: item.image }}
                                style={{ width: 64, height: 64, borderRadius: 32 }}
                            />
                            <Text style={{ marginTop: 8 }} >{item.name}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </DefaultModalBottomSheet>
    )
}

export default PetSelectSheet

const styles = StyleSheet.create({})
