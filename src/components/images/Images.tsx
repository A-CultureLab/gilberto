import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'

interface ImagesProps {
    urls: string[]
    onPress?: (urls: string[], index: number) => void
    style?: StyleProp<ViewStyle>
}

const Images: React.FC<ImagesProps> = ({ onPress, urls, style }) => {

    const [width, setWidth] = useState(0)

    return (
        <View
            onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
            style={[styles.container, { height: width / 2 }, style]}
        >
            {urls.slice(0, 3).map((url, i) => (
                <Pressable
                    onPress={() => onPress && onPress(urls, i)}
                    key={i.toString()}
                    style={styles.image}
                >
                    <FastImage
                        style={{ flex: 1, marginRight: i === 2 || i === urls.length - 1 ? 0 : 4 }}
                        source={{ uri: url }}
                    />
                    {(urls.length > 4 && i === 2) && <View style={styles.moreImageWrapper} >
                        <Text style={styles.moreImage} >+{urls.length - 2}</Text>
                    </View>}
                </Pressable>
            ))}
        </View>
    )
}

export default Images

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    image: {
        flex: 1
    },
    moreImageWrapper: {
        flex: 1,
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    moreImage: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
})