import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps';


const Home = () => {
    return (
        <MapView
            style={{ flex: 1 }}
            rotateEnabled={false}
        />
    )
}

export default Home

const styles = StyleSheet.create({})
