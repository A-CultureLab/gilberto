/*
Home, Friend 스크린의 하단 네비게이션 바
*/

import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, DEFAULT_SHADOW, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
import DogIcon from '../svgs/DogIcon'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const TABS = [
    {
        name: 'Home',
        label: '홈',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <IconMA size={24} name={focus ? 'location-on' : 'location-on'} color={color} />
    },
    {
        name: 'Friend',
        label: '친구',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <IconMA size={24} name={focus ? 'person' : 'person'} color={color} />
    },
    {
        name: 'Chat',
        label: '채팅',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <IconMA size={22} name={focus ? 'chat' : 'chat'} color={color} />
    }
]

interface MapScreenBottomTabBarProps {
    smallMode?: boolean
}

const MapScreenBottomTabBar: React.FC<MapScreenBottomTabBarProps> = ({ smallMode }) => {


    const { bottom } = useSafeAreaInsets()
    const { name: routeName } = useRoute()
    const { navigate } = useNavigation()

    const animation = useSharedValue(1)

    useEffect(() => {
        // animation.value = withTiming(smallMode ? 0 : 1, { duration: 250 })
    }, [smallMode])

    const onPress = (name: string) => {
        if (name === routeName) return
        if ((name === 'Friend' || name === 'Chat') && !auth().currentUser) {
            navigate('Login')
            return
        }
        navigate(name)
    }



    const containerStyle = useAnimatedStyle(() => ({
        width: ((WIDTH - 48) * animation.value + 48),
        height: ((144 - bottom - 56) * (1 - animation.value) + bottom + 56),
        paddingBottom: (bottom * animation.value),
        left: (16 * (1 - animation.value)),
        bottom: (100 * (1 - animation.value)),
        borderRadius: (4 * (1 - animation.value)),
    }), [bottom])



    return (
        <Animated.View style={[styles.container, containerStyle]} >
            {TABS.map(({ icon, label, name }, i) => {

                const textStyle = useAnimatedStyle(() => ({
                    fontSize: (12 * (animation.value + 0.1)),
                    marginTop: (6 * animation.value),
                    opacity: (animation.value)
                }))

                const lineStyle = useAnimatedStyle(() => ({
                    width: (64 * animation.value)
                }))

                const tabStyle = useAnimatedStyle(() => ({
                    width: ((WIDTH / 3 - 48) * animation.value + 48),
                    left: ((WIDTH / 3) * i) * animation.value,
                    top: (48 * i) * (1 - animation.value),
                    height: ((56 - 48) * animation.value + 48),

                }), [i])

                const iconConatinerStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: (1 - 0.8) * animation.value + 0.8 }]
                }))

                return (
                    <AnimatedPressable
                        onPress={() => onPress(name)}
                        key={name}
                        style={[styles.tab, tabStyle]}
                        android_ripple={{ color: GRAY2, radius: WIDTH / 3 / 2 }}
                    >
                        <Animated.View style={iconConatinerStyle} >
                            {icon({ color: routeName === name ? COLOR1 : GRAY2, focus: routeName === name })}
                        </Animated.View>
                        {routeName === name && <Animated.View style={[styles.line, lineStyle]} />}
                        <Animated.Text style={[{ color: routeName === name ? '#333' : GRAY1 }, textStyle]}>{label}</Animated.Text>
                    </AnimatedPressable>
                )
            })}
        </Animated.View>
    )
}

export default MapScreenBottomTabBar

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        position: 'absolute',
        bottom: 0, left: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        ...DEFAULT_SHADOW
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        position: 'absolute'
    },
    line: {
        height: 2,
        backgroundColor: COLOR1,
        position: 'absolute',
        top: 0
    }
})