import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { GRAY2, HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'

interface ImageDetailProps {
    urls: string[]
    index: number
}
const ImageDetail: React.FC<ImageDetailProps> = () => {

    const { params: { index, urls } } = useRoute<Route<'ImageDetail', ImageDetailProps>>()
    const { goBack } = useNavigation()

    const [currentIndex, setCurrentIndex] = useState(index)

    const title = useMemo(() => urls.length === 1 ? '' : `${currentIndex + 1}/${urls.length}`, [currentIndex])

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x
        setCurrentIndex(Math.round(x / WIDTH))
    }, [])


    return (
        <ScreenLayout style={styles.container} translucent >
            <View style={styles.header} >
                <Pressable
                    onPress={goBack}
                    style={styles.backBtn}
                    android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
                >
                    <Icon name='keyboard-arrow-left' size={24} color='#fff' />
                </Pressable>
                <Text style={styles.title} >{title}</Text>
            </View>
            <FlatList

                getItemLayout={(data, index) => ({
                    index,
                    length: urls.length,
                    offset: WIDTH * index
                })}
                initialScrollIndex={index}
                horizontal
                pagingEnabled
                data={urls}
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <FastImage
                        resizeMode='contain'
                        style={styles.image}
                        source={{ uri: item }}
                    />
                )}
            />
        </ScreenLayout>
    )
}

export default ImageDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    },
    header: {
        width: '100%',
        height: 56 + STATUSBAR_HEIGHT,
        top: 0,
        paddingTop: STATUSBAR_HEIGHT,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000080',
        zIndex: 99
    },
    backBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: STATUSBAR_HEIGHT
    },
    title: {
        color: '#fff'
    },
    image: {
        width: WIDTH,
        height: '100%'
    }
})