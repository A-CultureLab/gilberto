import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface HeaderProps {
    title?: string
    backBtn?: 'left' | 'none' | 'right'
    underline?: boolean
}

const Header: React.FC<HeaderProps> = ({ backBtn, title, underline }) => {

    const { goBack } = useNavigation()

    return (
        <View style={[styles.container, { borderBottomWidth: underline ? 1 : 0 }]} >
            {backBtn === 'left' &&
                <Pressable
                    onPress={goBack}
                    style={styles.btn}
                    android_ripple={{ color: GRAY2, borderless: true }}
                >
                    <Icon name='keyboard-arrow-left' size={24} />
                </Pressable>
            }
            <Text style={[styles.title, { marginLeft: backBtn === 'left' ? 0 : 24 }]} >{title}</Text>
            {backBtn === 'right' &&
                <Pressable
                    onPress={goBack}
                    style={styles.btn}
                    android_ripple={{ color: GRAY2, borderless: true }}
                >
                    <Icon name='keyboard-arrow-down' size={24} />
                </Pressable>
            }
        </View>
    )
}

Header.defaultProps = {
    backBtn: 'left'
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottomColor: GRAY3
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    }
})