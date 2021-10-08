import React, { useRef, useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback, KeyboardAvoidingView, NativeEventSubscription, BackHandler } from 'react-native'
import { GRAY2, HEIGHT, SPRING_CONFIG, WIDTH } from '../../constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface DefaultBottomSheetProps {
    visible: boolean
    onClose: () => void
    enableBottomSafeArea?: boolean
    disableKeyboardAvoidingView?: boolean
}

const DefaultBottomSheet: React.FC<DefaultBottomSheetProps> = ({ visible, onClose, children, enableBottomSafeArea, disableKeyboardAvoidingView }) => {

    const { bottom } = useSafeAreaInsets()
    const animation = useSharedValue(0)
    const y = useSharedValue(0)

    const [height, setHeight] = useState(500)


    useEffect(() => {
        animation.value = withTiming(visible ? 1 : 0)
        if (visible) y.value = 0
    }, [visible])


    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event) => {
            y.value = event.translationY < 0 ? 0 : event.translationY
        },
        onEnd: (event) => {
            y.value = withTiming(0)
            if (event.translationY > (height / 2)) {
                y.value = withTiming(height)
                animation.value = withTiming(0)
                runOnJS(onClose)()
            }
        },
    }, [height])

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: animation.value,
        left: animation.value === 0 ? WIDTH : 0
    }), [])

    const containerStyle = useAnimatedStyle(() => ({
        bottom: (1 - animation.value) * -HEIGHT,
        transform: [{ translateY: y.value }]
    }), [])


    useEffect(() => { // 안드로이드 백버튼 핸들러
        if (!visible) return
        const listner = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })
        return listner.remove
    }, [visible])

    return (
        <>
            <AnimatedPressable
                onPress={onClose}
                style={[styles.backdrop, backdropStyle]}
            />
            <Animated.View
                onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
                style={[styles.container, containerStyle]}
            >
                <KeyboardAvoidingView behavior='padding' enabled={!disableKeyboardAvoidingView} >
                    <PanGestureHandler onGestureEvent={onGestureEvent}>
                        <Animated.View>
                            <View style={styles.extraSwipeRange} />
                            <View style={styles.swiperContainer} >
                                <View style={styles.swiper} />
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                    <View style={[styles.contentContainer, { paddingBottom: enableBottomSafeArea ? bottom : 0 }]} >
                        {children}
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
        </>
    )
}

export default DefaultBottomSheet

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        right: 0, top: 0, left: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    extraSwipeRange: {
        width: WIDTH,
        height: 50,
        backgroundColor: '#fff',
        opacity: 0
    },
    swiperContainer: {
        width: WIDTH,
        height: 40,
        paddingTop: 16,
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff'
    },
    swiper: {
        width: 32,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: GRAY2
    },
    contentContainer: {
        width: WIDTH,
        backgroundColor: '#fff'
    }
})