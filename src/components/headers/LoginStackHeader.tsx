import useNavigation from '../../hooks/useNavigation'
import React, { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { COLOR1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface LoginStackHeaderProps {
    style?: StyleProp<ViewStyle>
    title: string
}

const LoginStackHeader: React.FC<LoginStackHeaderProps> = ({ style, title }) => {

    const { goBack } = useNavigation()

    return (
        <View style={[styles.container, style]} >
            <Pressable
                onPress={goBack}
                style={styles.btn}
                android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
            >
                <Icon name='keyboard-arrow-left' size={24} />
            </Pressable>
            <Text style={styles.title} >{title}</Text>
        </View>
    )
}


export default LoginStackHeader

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0
    }
})