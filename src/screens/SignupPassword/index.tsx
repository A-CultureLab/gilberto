import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import useGlobalUi from '../../hooks/useGlobalUi'
import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'

const SignupPassword = () => {

    const { params } = useRoute<'SignupPassword'>()
    const { replace } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()

    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const onSubmit = useCallback(() => {
        if (!password) return toast({ content: '비밀번호를 입력해주세요' })
        if (password !== passwordCheck) return toast({ content: '비밀번호와 비밀번호 확인이 다릅니다.' })
        if (!/^[a-zA-Z0-9]{8,20}$/.test(password)) return toast({ content: '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다' })

        replace('SignupRequireInfo', { password, ...params })

    }, [params, password, passwordCheck])

    return (
        <ScreenLayout>
            <LoginStackHeader title='회원정보 등록' />
            <View style={[styles.body, { paddingBottom: bottom + 28 }]} >
                <Input
                    label='비밀번호'
                    placeholder='영문/숫자 조합 8~20'
                    value={password}
                    onChangeText={t => setPassword(t)}
                    maxLength={20}
                    secureTextEntry
                    style={{ marginBottom: 24 }}
                />
                <Input
                    label='비밀번호 확인'
                    placeholder='영문/숫자 조합 8~20'
                    value={passwordCheck}
                    secureTextEntry
                    onChangeText={t => setPasswordCheck(t)}
                    maxLength={20}
                />
                <View style={{ flex: 1 }} />
                <Button disable={!password && !passwordCheck} onPress={onSubmit} >다음</Button>
            </View>
        </ScreenLayout>
    )
}

export default SignupPassword

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 40,
    }
})