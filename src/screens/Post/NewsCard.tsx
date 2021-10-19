import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import { feeds_feeds_news } from '../../graphql/__generated__/feeds'

const NewsCard: React.FC<feeds_feeds_news> = (props) => {

    const { navigate } = useNavigation()

    const { image, content, title, link } = props



    return (
        <Pressable
            onPress={() => navigate('Browser', { url: link })}
            android_ripple={{ color: GRAY2 }}
            style={styles.container}
        >
            <Text style={styles.newsLatterText} >뉴스레터</Text>
            <FastImage
                style={styles.image}
                source={{ uri: image }}
            />
            <Text style={styles.title} >{title}</Text>
            <Text style={styles.content} >{content}</Text>
        </Pressable>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    newsLatterText: {
        fontWeight: 'bold',
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: (WIDTH - 32) / 2,
        borderRadius: 4,
        marginBottom: 16
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    },
    content: {
        lineHeight: 20
    }
})