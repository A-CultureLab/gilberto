import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useChangePassword } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'

const FindPassword = () => {

    const { params: { phoneVerifySuccessToken } } = useRoute<'FindPassword'>()
    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()

    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const [changePassword, { loading }] = useChangePassword()

    const onSubmit = useCallback(async () => {
        if (!password) return toast({ content: '비밀번호를 입력해주세요' })
        if (password !== passwordCheck) return toast({ content: '비밀번호와 비밀번호 확인이 다릅니다.' })
        if (!/^[a-zA-Z0-9]{8,20}$/.test(password)) return toast({ content: '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다' })

        const { data } = await changePassword({ variables: { password, phoneVerifySuccessToken } })
        if (!data) return

        toast({ content: '비밀번호가 변경되었습니다' })
        navigate('Login')
    }, [phoneVerifySuccessToken, password, passwordCheck])

    return (
        <ScreenLayout>
            <LoginStackHeader title='비밀번호 변경' />
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
                <Button disable={!password && !passwordCheck} loading={loading} onPress={onSubmit} >다음</Button>
            </View>
        </ScreenLayout>
    )
}

export default FindPassword

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 40,
    }
})