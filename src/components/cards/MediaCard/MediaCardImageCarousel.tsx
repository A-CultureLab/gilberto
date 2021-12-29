import React, { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { GRAY3, WIDTH } from '../../../constants/styles'

interface MediaCardImageCarouselProps {
    urls: string[]
}

const MediaCardImageCarousel: React.FC<MediaCardImageCarouselProps> = ({ urls }) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <View style={styles.container} >
            <FlatList
                horizontal
                overScrollMode='never'
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / WIDTH))}
                data={urls}
                renderItem={({ item }) => (
                    <FastImage
                        style={{ width: WIDTH, height: WIDTH }}
                        source={{ uri: item }}
                    />
                )}
            />
            <View style={styles.indicatorContainer} >
                <Text style={styles.indicatorText} >{currentIndex + 1}/{urls.length}</Text>
            </View>
        </View>
    )
}

export default MediaCardImageCarousel

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH,
        backgroundColor: GRAY3
    },
    indicatorContainer: {
        height: 32,
        position: 'absolute',
        right: 12,
        top: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorText: {
        color: '#fff'
    }
})