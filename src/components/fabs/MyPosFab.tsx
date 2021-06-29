import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR2, DEFAULT_SHADOW } from '../../constants/styles'

interface MyPosFabProps {
    onPress: () => void
}

const MyPosFab: React.FC<MyPosFabProps> = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.container} >
            <Icon color={COLOR2} name='my-location' size={24} />
        </Pressable>
    )
}

export default MyPosFab

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        ...DEFAULT_SHADOW,
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#fff'
    }
})