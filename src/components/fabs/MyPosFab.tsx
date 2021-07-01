import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR2, DEFAULT_SHADOW } from '../../constants/styles'

interface MyPosFabProps {
    onPress: () => void
}

const MyPosFab: React.FC<MyPosFabProps> = ({ onPress }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onPress}
                style={[styles.btn, { bottom: bottom + 16 + 56 }]} >
                <Icon color={COLOR2} name='my-location' size={24} />
            </Pressable>
        </View>
    )
}

export default MyPosFab

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        elevation: 0
    },
    btn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        ...DEFAULT_SHADOW,
        backgroundColor: '#fff'
    }
})