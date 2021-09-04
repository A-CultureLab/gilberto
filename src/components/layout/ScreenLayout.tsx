import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../constants/styles'

interface ScreenLayoutProps {
    translucent?: boolean
    style?: StyleProp<ViewStyle>
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, translucent, style }) => {
    return (
        <View style={[styles.container, style]} >
            {!translucent && <View style={styles.statusBarBackground} />}
            {children}
        </View>
    )
}

export default ScreenLayout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBarBackground: {
        width: '100%',
        height: STATUSBAR_HEIGHT
    }
})
