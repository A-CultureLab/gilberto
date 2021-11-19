import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextProps, TextStyle, View, ViewProps, ViewStyle } from 'react-native'
import { COLOR1 } from '../../constants/styles'
import Loading from '../loadings/Loading'
import LoadingDots from '../loadings/LoadingDots'

interface ButtonProps {
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    disable?: boolean
    loading?: boolean
    onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({ style, disable, children, textStyle, onPress, loading }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, { backgroundColor: !disable ? COLOR1 : 'rgba(248, 145, 50, 0.3)' }, style]} >
            {loading
                ? <LoadingDots color='#fff' />
                : <Text style={[styles.text, textStyle]} >{children}</Text>
            }

        </Pressable>
    )
}

Button.defaultProps = {
    disable: false,
    loading: false
}
export default Button

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOR1
    },
    text: {
        fontWeight: 'bold',
        color: '#fff'
    }
})