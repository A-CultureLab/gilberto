import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, COLOR2, GRAY1, GRAY3, WIDTH } from '../../constants/styles'

interface FooterProps {
    text: string
    disable?: boolean
    loading?: boolean
    onPress?: () => void
}

const Footer: React.FC<FooterProps> = ({ text, disable, loading, onPress }) => {

    const { bottom } = useSafeAreaInsets()


    return (
        <Pressable
            android_ripple={{ radius: WIDTH, color: COLOR2 }}
            onPress={() => (onPress && !disable) && onPress()}
            style={[styles.container, { backgroundColor: disable ? GRAY3 : COLOR1, height: bottom + 56, paddingBottom: bottom }]}
        >
            <Text style={styles.text} >{text}</Text>
            {loading && <View style={styles.indicatorContainer} >
                <ActivityIndicator color='#fff' size='small' />
            </View>}
        </Pressable>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    indicatorContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})