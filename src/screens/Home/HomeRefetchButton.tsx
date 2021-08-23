import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR2, DEFAULT_SHADOW, STATUSBAR_HEIGHT } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface HomeRefetchButtonProps {
    enable: boolean
    onPress: () => void
}

const HomeRefetchButton: React.FC<HomeRefetchButtonProps> = ({ enable, onPress }) => {

    if (!enable) return null

    return (
        <Pressable onPress={onPress} style={styles.container} >
            <Icon name="refresh" size={16} color={COLOR2} />
            <Text style={styles.text} >현 지도에서 검색</Text>
        </Pressable>
    )
}

export default HomeRefetchButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 16,
        height: 32,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        ...DEFAULT_SHADOW,
        alignSelf: 'center'
    },
    text: {
        fontSize: 12,
        marginLeft: 8,
        color: COLOR2
    }
})
