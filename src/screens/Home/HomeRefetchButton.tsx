import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR2, DEFAULT_SHADOW, STATUSBAR_HEIGHT } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface HomeRefetchButtonProps {
    enable: boolean
    onPress: () => void
}

const HomeRefetchButton: React.FC<HomeRefetchButtonProps> = ({ enable, onPress }) => {

    const animation = useSharedValue(0)

    useEffect(() => {
        animation.value = withTiming(enable ? 1 : 0, { duration: 100, easing: Easing.linear })
    }, [enable])

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: animation.value }]
    }), [])

    return (
        <AnimatedPressable onPress={onPress} style={[styles.container, buttonStyle]} >
            <Icon name="refresh" size={16} color={COLOR2} />
            <Text style={styles.text} >현 지도에서 검색</Text>
        </AnimatedPressable>
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
