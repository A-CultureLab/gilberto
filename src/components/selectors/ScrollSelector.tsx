import React, { useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, StyleProp, TextStyle, ScrollView } from 'react-native'
import { GRAY3 } from '../../constants/styles'
import LinearGradient from 'react-native-linear-gradient'



interface ScrollSelectorProps {
    list: string[]
    infinityScroll?: boolean
    width?: number
    height?: number
    initIndex?: number
    onChange: (i: number) => void
    textStyle?: StyleProp<TextStyle>
}

const ScrollSelector: React.FC<ScrollSelectorProps> = ({ list: _list, infinityScroll, initIndex, onChange, height, width, textStyle }) => {

    const flatlistRef = useRef<ScrollView>(null)

    const list = infinityScroll ? [..._list, ..._list, ..._list] : _list

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!height) return
        if (event.nativeEvent.contentOffset.y > height * (list.length - 1) || event.nativeEvent.contentOffset.y < 0) return
        const index = Math.round(event.nativeEvent.contentOffset.y / height) % _list.length
        onChange(index)
    }, [onChange, height, _list])


    const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => { // infinity scroll
        if (!infinityScroll) return
        if (!height) return
        const index = Math.round(event.nativeEvent.contentOffset.y / height) % _list.length
        flatlistRef.current?.scrollTo({ animated: false, y: (index + _list.length) * height })
    }, [height, _list, infinityScroll])

    useEffect(() => {
        setTimeout(() => {
            flatlistRef.current?.scrollTo({ y: ((initIndex || 0) + (infinityScroll ? _list.length : 0)) * (height || 56), animated: false })
        }, 100)
    }, [])


    return (
        <View style={[styles.container, { height: (height || 56) * 3, width }]} >
            <ScrollView
                ref={flatlistRef}
                scrollEventThrottle={16}
                onScroll={onScroll}
                onMomentumScrollEnd={onScrollEnd}
                overScrollMode='never'
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                decelerationRate='fast'
                snapToInterval={height}
            >
                <TouchableOpacity activeOpacity={1} >
                    <View style={{ height }} />
                    {list.map((v, i) => (
                        <View key={i.toString()} style={[styles.item, { width, height }, textStyle]} >
                            <Text style={styles.itemText} >{v}</Text>
                        </View>
                    ))}
                    <View style={{ height }} />
                </TouchableOpacity>
            </ScrollView>
            <View
                pointerEvents='none'
                style={[styles.line, { width, top: height }]}
            />
            <View
                pointerEvents='none'
                style={[styles.line, { width, top: (height || 56) * 2 }]}
            />
            <LinearGradient
                pointerEvents='none'
                style={[styles.gradient, { width, height }]}
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <LinearGradient
                pointerEvents='none'
                style={[styles.gradient, { width, height, bottom: 0 }]}
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            />
        </View>
    )
}

ScrollSelector.defaultProps = {
    width: 72,
    height: 56,
    initIndex: 0
}

export default ScrollSelector

const styles = StyleSheet.create({
    container: {
        width: 72,
        alignItems: 'center',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 18
    },
    line: {
        height: 1,
        backgroundColor: GRAY3,
        position: 'absolute'
    },
    gradient: {
        position: 'absolute'
    }
})