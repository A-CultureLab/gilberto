import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, DEFAULT_SHADOW, SPRING_CONFIG } from '../../constants/styles'

export interface ToastProps {
    visible: boolean
    content: string
}

const Toast: React.FC<ToastProps> = ({ content, visible }) => {

    const animation = useSharedValue(0)

    const { bottom } = useSafeAreaInsets()

    useEffect(() => {
        if (visible) animation.value = withSpring(1, SPRING_CONFIG)
        else animation.value = withTiming(0, { duration: 250 })
    }, [visible])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: animation.value },
            { translateY: -animation.value * (bottom + 56 + 24) }
        ]
    }), [bottom])

    return (
        <Animated.View
            pointerEvents='none'
            style={[styles.container, animatedStyle]}
        >
            <Text style={styles.content} >{content}</Text>
        </Animated.View>
    )
}

export default Toast

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 16,
        alignSelf: 'center',
        backgroundColor: COLOR1,
        position: 'absolute',
        bottom: 0,
        ...DEFAULT_SHADOW
    },
    content: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    }
})