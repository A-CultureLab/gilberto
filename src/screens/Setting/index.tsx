import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { GRAY2, GRAY3 } from '../../constants/styles'
import useGlobalUi from '../../hooks/useGlobalUi'
import auth from '@react-native-firebase/auth'
import { useApolloClient } from '@apollo/client'
import useAuth from '../../hooks/useAuth'

const Setting = () => {

    const { navigate } = useNavigation()
    const { confirm } = useGlobalUi()
    const { logout } = useAuth()

    const MENUS = [
        {
            title: '오픈소스 라이선스',
            onPress: () => navigate('OpenSourceLicense')
        },
        {
            title: `버전`,
            onPress: () => { }
        },
        {
            title: '로그아웃',
            onPress: () => {
                confirm({
                    title: '로그아웃',
                    content: '정말 로그아웃 하시겠습니까?',
                    onPress: async (isYes) => {
                        if (!isYes) return
                        logout()
                    }
                })
            }
        },
        {
            title: '탈퇴하기',
            onPress: () => navigate('Withdraw')
        }
    ]

    return (
        <ScreenLayout>
            <Header title='설정' />
            <ScrollView
                style={{ flex: 1 }}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
            >
                {MENUS.map(({ onPress, title }) => (
                    <Pressable
                        key={title}
                        onPress={onPress}
                        android_ripple={{ color: GRAY2 }}
                        style={styles.menuContainer}
                    >
                        <Text>{title}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </ScreenLayout>
    )
}

export default Setting

const styles = StyleSheet.create({
    menuContainer: {
        width: '100%',
        height: 56,
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    }
})