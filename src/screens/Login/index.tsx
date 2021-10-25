import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { APPLE_COLOR, DEFAULT_SHADOW, KAKAO_COLOR } from '../../constants/styles'
import TouchableScale from '../../components/buttons/TouchableScale'
import { useCallback } from 'react'
import auth from '@react-native-firebase/auth';
import { useState } from 'react'
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { useApolloClient } from '@apollo/client'
import useNavigation from '../../hooks/useNavigation'
import { IS_SIGNEDUP, I_USER, KAKAO_TOKEN_TO_FIREBASE_TOKEN } from '../../graphql/user'
import Loading from '../../components/loadings/Loading'
import { KakaoTokenToFirebaseToken, KakaoTokenToFirebaseTokenVariables } from '../../graphql/__generated__/KakaoTokenToFirebaseToken'
import { iUser } from '../../graphql/__generated__/iUser'
import { isSignedup } from '../../graphql/__generated__/isSignedup'
import useGlobalUi from '../../hooks/useGlobalUi'
import appleAuth from '@invertase/react-native-apple-authentication'
import { IS_IOS } from '../../constants/values'

const Login = () => {

    const client = useApolloClient()
    const { reset } = useNavigation()
    const { toast } = useGlobalUi()

    const [loading, setLoading] = useState(false)


    const onKakao = useCallback(async () => {
        try {
            if (loading) return
            setLoading(true)

            const { accessToken } = await kakaoLogin()

            const { data } = await client.query<KakaoTokenToFirebaseToken, KakaoTokenToFirebaseTokenVariables>({
                query: KAKAO_TOKEN_TO_FIREBASE_TOKEN,
                variables: { kakaoAccessToken: accessToken },
                fetchPolicy: 'network-only'
            })

            const firebaseToken = data.kakaoTokenToFirebaseToken

            await auth().signInWithCustomToken(firebaseToken)
            await loginSuccess()
        } catch (error) {
            toast({ content: '오류' })
            setLoading(false)
        }
    }, [loading])

    const onApple = useCallback(async () => {
        try {
            if (loading) return
            setLoading(true)

            const { identityToken, nonce } = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
            })
            if (!identityToken) throw new Error('Apple Login Fail')
            console.log('token : ' + identityToken)

            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
            console.log('credential : ' + appleCredential)

            await auth().signInWithCredential(appleCredential)
            await loginSuccess()
        } catch (error) {
            toast({ content: '오류' })
            setLoading(false)
        }
    }, [loading])

    const loginSuccess = useCallback(async () => {
        try {
            await client.clearStore()

            const { data } = await client.query<isSignedup>({ query: IS_SIGNEDUP, fetchPolicy: 'network-only', })
            if (!data.isSignedup) reset({ index: 0, routes: [{ name: 'Signup' }] })  // 유저 정보가 없으면 회원가입 화면으로 전환
            else reset({ index: 0, routes: [{ name: 'Tab' }] })

            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [])

    return (
        <ScreenLayout>
            <Header underline={false} />
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
                    {IS_IOS && <TouchableScale
                        style={[styles.btn, { backgroundColor: APPLE_COLOR }]}
                        onPress={onApple}
                    >
                        <Image
                            source={require('../../assets/apple.png')}
                            style={{ width: 24, height: 24 }}

                        />
                    </TouchableScale>}
                </View>
            </View>
            {loading && <View style={styles.loading} >
                <Loading />
            </View>}
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
    },
    loading: {
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center',
    }
})