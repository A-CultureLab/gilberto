import dayjs from 'dayjs'
import React, { useCallback, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1 } from '../../constants/styles'
import { useConfirmPhoneVerify, useRequestPhoneVerify } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import useNavigation from '../../hooks/useNavigation'

const FindPasswordPhoneVerify = () => {

    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()
    const { replace } = useNavigation()

    const [sendDate, setSendDate] = useState<Date | null>(null)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')

    const [requestPhoneVerify, { loading: phoneVerifyLoading, data: phoneVerifyCodeToken }] = useRequestPhoneVerify()
    const [confirmPhoneVerify, { loading }] = useConfirmPhoneVerify()

    const onSendCode = useCallback(async () => {
        Keyboard.dismiss()

        if (!phone) return toast({ content: '전화번호를 입력해주세요' })
        // 1분 시간 체크
        if (dayjs(sendDate).unix() < dayjs().add(-1, 'minuate').unix()) return toast({ content: '1분마다 보낼 수 있습니다.' })


        const { data } = await requestPhoneVerify({ variables: { phone, phoneUnique: false } })
        if (!data) return
        toast({ content: '인증번호를 보냈습니다' })
        setSendDate(new Date())
    }, [sendDate, phone])

    const onSubmit = useCallback(async () => {
        if (!phoneVerifyCodeToken) return
        const { data } = await confirmPhoneVerify({ variables: { code, phoneVerifyCodeToken: phoneVerifyCodeToken.requestPhoneVerify } })
        if (!data) return
        replace('FindPassword', { phoneVerifySuccessToken: data.confirmPhoneVerify })
    }, [phoneVerifyCodeToken, code])

    return (
        <ScreenLayout>
            <LoginStackHeader title='비밀번호 찾기' />

            <View style={[styles.body, { paddingBottom: bottom + 28 }]} >
                <Input
                    label='전화번호'
                    placeholder='전화번호를 입력해주세요.'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    value={phone}
                    maxLength={11}
                    onChangeText={t => setPhone(t)}
                />

                <Button
                    loading={phoneVerifyLoading}
                    onPress={onSendCode}
                    loadingColor={COLOR1}
                    style={{ backgroundColor: '#fff', marginTop: 16, marginBottom: 36 }}
                    textStyle={{ color: COLOR1 }} >인증번호 발송</Button>

                <Input
                    label='인증번호'
                    placeholder='인증번호를 입력해주세요.'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    value={code}
                    maxLength={4}
                    onChangeText={t => setCode(t)}
                />


                <View style={{ flex: 1 }} />
                <Button onPress={onSubmit} disable={!code} loading={loading} >확인</Button>
            </View>
        </ScreenLayout>
    )
}

export default FindPasswordPhoneVerify

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 20,
        flex: 1,
        paddingTop: 40
    }
})