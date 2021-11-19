import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Animated, View, Easing } from 'react-native'
import { COLOR1, DEFAULT_SHADOW, SPRING_CONFIG } from '../../constants/styles'

const number = 4
const totalDuration = 1500 // 메인 애니메이션 반복주기
const delay = 400
const Y = 6
const itemDuration = 1200 // dot 하나당 재생 시간
const translateYSpring = 0
const easing = Easing.linear

interface LoadingDotsProps {
    color?: string
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ color }) => {

    const [animation] = useState(new Animated.Value(0))


    const runAnimation = () => {
        animation.setValue(0)
        Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 1,
            duration: totalDuration,
            easing: easing,
            delay: delay
        }).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
    }, [])


    return (
        <View style={styles.container} >
            <Dot index={0} color={color} animation={animation} />
            <Dot index={1} color={color} animation={animation} />
            <Dot index={2} color={color} animation={animation} />
            <Dot index={3} color={color} animation={animation} />
        </View>
    )
}

LoadingDots.defaultProps = {
    color: COLOR1
}

export default LoadingDots

interface DotProps {
    animation: Animated.Value
    index: number
    color?: string
}

const Dot: React.FC<DotProps> = ({ animation, index, color }) => {

    const start = (totalDuration - itemDuration) / (number - 1) * index
    const inputRange = [start / totalDuration]
    for (let i = 1; i < 9; i++) {
        inputRange.push((itemDuration * i / 8 + start) / totalDuration)
    }
    const translateY = animation.interpolate({
        inputRange,
        outputRange: [0, 0, -Y, 0, Y, 0, translateYSpring, 0, 0],
    })


    return (
        <Animated.View
            style={[styles.dot, {
                backgroundColor: color,
                transform: [{ translateY }]
            }]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16 - 3,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginHorizontal: 3
    }
})