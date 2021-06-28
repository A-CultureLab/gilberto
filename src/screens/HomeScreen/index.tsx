import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'


const HomeScreen = () => {
    return (
        <View>
            <Text>Home</Text>
            <FastImage style={{ width: 200, height: 200, }} source={{ uri: 'https://github.com/DylanVann/react-native-fast-image/raw/master/docs/assets/scroll.gif' }} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
