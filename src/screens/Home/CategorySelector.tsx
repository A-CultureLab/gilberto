import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLOR1, DEFAULT_SHADOW, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { withSpring, useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, Easing, withTiming } from 'react-native-reanimated';
import { HomeScreenContext } from '.';


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
    },
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

const MAX_SCROLL = 150

const CategorySelector = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const [animating, setAnimating] = useState(false)
    const translationX = useSharedValue(0)
    const animation = useSharedValue(0)

    const { categoryVerticalMode, setCategoryVerticalMode } = useContext(HomeScreenContext)

    const onCloseVerticalMode = useCallback(() => {
        setCategoryVerticalMode(false)
    }, [categoryVerticalMode])

    const onOpenVerticalMode = useCallback(() => {
        setCategoryVerticalMode(true)
    }, [categoryVerticalMode])

    const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        translationX.value = e.nativeEvent.contentOffset.x
        if (e.nativeEvent.contentOffset.x >= MAX_SCROLL) {
            onOpenVerticalMode()
            scrollViewRef.current?.scrollTo({ x: MAX_SCROLL, animated: false })
        }
    }, [onOpenVerticalMode])

    const onCategorySelected = useCallback((i: number) => {
        onCloseVerticalMode()
    }, [onCloseVerticalMode])

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(animation.value)
    }))

    useEffect(() => {
        if (categoryVerticalMode) {
            animation.value = 1
            setAnimating(true)
        }
        else {
            if (translationX.value >= MAX_SCROLL) scrollViewRef.current?.scrollTo({ animated: false, x: translationX.value >= MAX_SCROLL ? MAX_SCROLL - 0.5 : 0 })
            animation.value = 0
            setTimeout(() => { setAnimating(false) }, 250)
        }
    }, [categoryVerticalMode, translationX, animating])

    return (
        <>
            {categoryVerticalMode && <AnimatedPressable onPress={onCloseVerticalMode} style={[styles.backdrop, backdropAnimatedStyle]} />}
            <View style={[styles.container, { right: categoryVerticalMode || animating ? WIDTH - 16 - 160 : 0 }]} >
                <ScrollView
                    ref={scrollViewRef}
                    style={[styles.scrollview]}
                    contentContainerStyle={{ paddingBottom: categoryVerticalMode || animating ? 48 * CATEGORY_LIST.length : 6, overflow: 'visible' }}
                    horizontal
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={!categoryVerticalMode}
                    overScrollMode='never'
                >

                    <Animated.View style={{ width: 16 }} />
                    <View style={{ width: MAX_SCROLL - 16 + 10 + WIDTH, flexDirection: 'row' }} >
                        {CATEGORY_LIST.map((v, i) =>
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
            { translateX: withTiming(animation.value * (translationX.value - x), { duration: 150 + (25 * index) }) },
            { translateY: withTiming(animation.value * (index * (32 + 16)), { duration: 150 + (25 * index) }) }
        ]
    }), [x, index])

    return (
        <AnimatedPressable
            onLayout={({ nativeEvent }) => setX(nativeEvent.layout.x)}
            style={[styles.categoryContainer, animatedStyles]}
            onPress={() => onPress(index)}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 16 + 56 + 16,
        left: 0,
        zIndex: 6
    },
    scrollview: {
        flex: 1,
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