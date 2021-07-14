import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GRAY3 } from '../../constants/styles'

const ThinLine = () => <View style={styles.container} />

export default ThinLine

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 8,
        backgroundColor: GRAY3
    }
})