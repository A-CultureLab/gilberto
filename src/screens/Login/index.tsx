import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { APPLE_COLOR, DEFAULT_SHADOW, KAKAO_COLOR } from '../../constants/styles'
import Image from 'react-native-fast-image'
import TouchableScale from '../../components/buttons/TouchableScale'
import { useCallback } from 'react'
import auth from '@react-native-firebase/auth';
import { useState } from 'react'
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { useApolloClient } from '@apollo/client'
import { useNavigation } from '@react-navigation/core'

const Login = () => {

    // const client = useApolloClient()
    const { reset } = useNavigation()

    const [loading, setLoading] = useState(false)


    const onKakao = useCallback(async () => {
        try {
            if (loading) return
            const { accessToken } = await kakaoLogin()

            console.log(accessToken)

            // const firebaseToken = data.kakaoTokenToFirebaseToken
            // await auth().signInWithCustomToken(firebaseToken)

            await loginSuccess()
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [loading])

    const onApple = useCallback(() => {

    }, [])

    const loginSuccess = useCallback(async () => {
        try {
            // await client.clearStore()

            // if (!data.iUser.name) reset({ index: 0, routes: [{ name: 'Signup' }] })  // 이름정보가 없으면 기본정보입력화면으로 전환
            // else reset({ index: 0, routes: [{ name: 'Tab' }] })

            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [])

    return (
        <ScreenLayout>
            <Header />
            <View style={styles.container} >
                <Text style={styles.text} >로그인을 해주세요</Text>
                <View style={styles.btnContainer} >
                    <TouchableScale
                        style={[styles.btn, { backgroundColor: KAKAO_COLOR }]}
                        onPress={onKakao}
                    >
                        <Image
                            source={require('../../assets/kakaotalk.png')}
                            style={{ width: 24, height: 24 }}

                        />
                    </TouchableScale>
                    <TouchableScale
                        style={[styles.btn, { backgroundColor: APPLE_COLOR }]}
                        onPress={onApple}
                    >
                        <Image
                            source={require('../../assets/apple.png')}
                            style={{ width: 24, height: 24 }}

                        />
                    </TouchableScale>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        borderRadius: 28
    }
})