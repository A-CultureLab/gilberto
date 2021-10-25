import useNavigation from '../../hooks/useNavigation'
import React, { ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { COLOR1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface HeaderProps {
    title?: string
    backBtn?: 'left' | 'none' | 'right'
    backBtnColor?: string
    underline?: boolean
    right?: () => ReactNode
    style?: StyleProp<ViewStyle>
}

const Header: React.FC<HeaderProps> = ({ backBtn, title, underline, right, style, backBtnColor }) => {

    const { goBack } = useNavigation()

    return (
        <View style={[styles.container, { borderBottomWidth: underline ? 1 : 0 }, style]} >
            {backBtn === 'left' &&
                <Pressable
                    onPress={goBack}
                    style={styles.btn}
                    android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
                >
                    <Icon name='keyboard-arrow-left' size={24} color={backBtnColor} />
                </Pressable>
            }
            <Text numberOfLines={1} style={[styles.title, { marginLeft: backBtn === 'left' ? 0 : 24 }]} >{title}</Text>
            {backBtn === 'right' &&
                <Pressable
                    onPress={goBack}
                    style={styles.btn}
                    android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
                >
                    <Icon name='keyboard-arrow-down' size={24} color={backBtnColor} />
                </Pressable>
            }
            {right && right()}
        </View>
    )
}

Header.defaultProps = {
    backBtn: 'left',
    underline: true,
    backBtnColor: '#000'
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GRAY3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 24
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
    }
})