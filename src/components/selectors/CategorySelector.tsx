import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLOR1, DEFAULT_SHADOW, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { withSpring, useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, Easing, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CATEGORY_LIST = [
    {
        name: '동물병원',
        icon: <Icon name='hospital-box' size={16} color={COLOR1} />
    },
    {
        name: '동물미용실',
        icon: <Icon name='hair-dryer' size={16} color={'#BF8686'} />
    },
    {
        name: '동물용품 매장',
        icon: <Icon name='shopping' size={16} color={'#F1C85E'} />
    }
]

const CategorySelector = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const [verticalMode, setVerticalMode] = useState(false)
    const translationX = useSharedValue(0)
    const animation = useSharedValue(0)

    const onCloseVerticalMode = useCallback(() => {
        if (!verticalMode) return
        console.log(translationX.value)
        if (translationX.value >= 200) scrollViewRef.current?.scrollTo({ animated: false, x: 199 })
        animation.value = withTiming(0)
        setVerticalMode(false)
    }, [verticalMode, translationX])

    const onOpenVerticalMode = useCallback(() => {
        if (verticalMode) return
        animation.value = withTiming(1)
        setVerticalMode(true)
    }, [verticalMode])

    const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        translationX.value = e.nativeEvent.contentOffset.x
        if (e.nativeEvent.contentOffset.x > 200) onOpenVerticalMode()
    }, [])

    const onCategorySelected = useCallback((i: number) => {
        onCloseVerticalMode()
    }, [onCloseVerticalMode])

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: animation.value
    }))

    return (
        <>
            {verticalMode && <AnimatedPressable onPress={onCloseVerticalMode} style={[styles.backdrop, backdropAnimatedStyle]} />}
            <View style={styles.container} >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollview}
                    horizontal
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={!verticalMode}
                >
                    <Animated.View style={{ width: 16 }} />
                    <View style={{ width: 185 + WIDTH, flexDirection: 'row' }} >
                        {[...CATEGORY_LIST, ...CATEGORY_LIST].map((v, i) =>
                            <Category
                                key={i}
                                animation={animation}
                                translationX={translationX}
                                name={v.name}
                                icon={v.icon}
                                index={i}
                                onPress={onCategorySelected}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

interface CategoryProps {
    animation: Animated.SharedValue<number>,
    translationX: Animated.SharedValue<number>,
    name: string,
    icon: JSX.Element
    index: number
    onPress: (i: number) => void
}

const Category: React.FC<CategoryProps> = ({ animation, translationX, icon, name, index, onPress }) => {

    const [x, setX] = useState(0)

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: animation.value * (translationX.value - x) },
            { translateY: animation.value * (index * (32 + 16)) }
        ]
    }), [x, index])

    return (
        <AnimatedPressable
            onPress={() => onPress(index)}
            onLayout={({ nativeEvent }) => setX(nativeEvent.layout.x)}
            style={[styles.categoryContainer, animatedStyles]}
        >
            {icon}
            <Text style={styles.categoryText} >{name}</Text>
        </AnimatedPressable>
    )
}

export default CategorySelector


const styles = StyleSheet.create({
    backdrop: {
        zIndex: 5,
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 16 + 56 + 16,
        right: 0, left: 0,
        zIndex: 6
    },
    scrollview: {
        flex: 1,
        paddingBottom: 8,
        overflow: 'visible'
    },
    categoryContainer: {
        height: 32,
        borderRadius: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginRight: 16,
        ...DEFAULT_SHADOW
    },
    categoryText: {
        marginLeft: 8
    }
})