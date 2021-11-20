import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { useLogin } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import useNavigation from '../../hooks/useNavigation'

const Login = () => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()

    const [login, { loading }] = useLogin()

    const { control, handleSubmit, formState, clearErrors } = useForm<{ phone: string, password: string }>()

    const onLogin = handleSubmit(async (data) => {
        await login({ variables: data })
    })

    useEffect(() => {
        const errors: any = formState.errors
        if (Object.keys(errors).length === 0) return
        toast({ content: errors[Object.keys(errors)[0]].message })
        clearErrors()
    }, [formState])

    return (
        <ScreenLayout style={styles.container} >
            <FastImage
                source={require('../../assets/Logo.png')}
                style={{ width: WIDTH / 2.5, height: WIDTH / 2.5, marginTop: 72, marginBottom: 20 }}
            />
            <Controller
                control={control}
                name='phone'
                rules={{ required: '전화번호를 입력해주세요' }}
                render={({ field }) => (
                    <Input
                        label='전화번호'
                        placeholder='전화번호를 입력해주세요.'
                        style={{ marginBottom: 12 }}
                        keyboardType='number-pad'
                        maxLength={11}
                        value={field.value}
                        onChangeText={field.onChange}
                        returnKeyType='done'
                    />
                )}
            />

            <Controller
                control={control}
                name='password'
                rules={{ required: '비밀번호를 입력해주세요' }}
                render={({ field }) => (
                    <Input
                        label='비밀번호'
                        placeholder='비밀번호를 입력해주세요.'
                        secureTextEntry
                        value={field.value}
                        onChangeText={field.onChange}
                        onSubmitEditing={onLogin}
                    />
                )}
            />
            <TouchableOpacity
                style={styles.findPassword}
                onPress={() => navigate('FindPasswordPhoneVerify')}
            >
                <Text style={styles.findPasswordText} >비밀번호를 잊으셨나요?</Text>
            </TouchableOpacity>



            <View style={[styles.footer, { bottom: bottom + 28 }]} >
                <Button loading={loading} onPress={onLogin} style={{ marginBottom: 16 }}  >로그인</Button>
                <Button onPress={() => navigate('SignupPhoneVerify')} style={{ backgroundColor: '#fff' }} textStyle={{ color: COLOR1 }} >회원가입</Button>
            </View>
        </ScreenLayout>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        flex: 1
    },
    findPassword: {
        alignSelf: 'flex-end'
    },
    findPasswordText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLOR1,
        marginTop: 20
    },
    footer: {
        width: '100%',
        position: 'absolute'
    }
})