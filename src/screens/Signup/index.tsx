import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import UnderLineInput from '../../components/inputs/UnderLineInput'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { IS_IOS } from '../../constants/values'
import { useSignup } from '../../graphql/user'
import { SignupInput } from '../../../__generated__/globalTypes'
import SelectBottomSheet from '../../components/selectors/SelectBottomSheet'
import dayjs from 'dayjs'
import DateSelectSheet from '../../components/selectors/DateSelectSheet'


const Signup = () => {

    const { navigate, reset } = useNavigation()
    const [signup, { loading }] = useSignup()

    const { control, handleSubmit, formState: { errors } } = useForm<SignupInput>({
        defaultValues: {
            marketingEmailDate: null,
            marketingPushDate: null,
            instagramId: '',
            introduce: ''
        }
    })

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        // await signup({ variables: { data } })

        // reset({ index: 0, routes: [{ name: 'SignupPet' }] })
    })

    return (
        <ScreenLayout>
            <Header title='회원정보 등록' backBtn='none' />
            <KeyboardAvoidingView
                enabled={IS_IOS}
                behavior='padding'
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
                    <Controller
                        control={control}
                        name='email'
                        rules={{ required: true }}
                        render={({ field }) => (
                            <UnderLineInput
                                inputStyle={{ marginTop: 24 }}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder='이메일'
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='name'
                        rules={{ required: true }}
                        render={({ field }) => (
                            <UnderLineInput
                                inputStyle={{ marginTop: 24 }}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder='이름'
                            />
                        )}
                    />
                    <UnderLineInput
                        placeholder='사진'
                        editable={false}
                        onPress={() => { }}
                    />
                    <Controller
                        control={control}
                        name='gender'
                        rules={{ required: true }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            const list = ['남자', '여자']
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='성별'
                                        value={field.value}
                                        editable={false}
                                        onPress={() => setVisible(true)}
                                    />
                                    <SelectBottomSheet
                                        list={list}
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(i) => field.onChange(list[i])}
                                    />
                                </>
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name='birth'
                        rules={{ required: true }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            console.log(field.value)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='출생'
                                        value={field.value ? dayjs(field.value).format('YYYY.MM.DD') : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <DateSelectSheet
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(date) => field.onChange(date)}
                                    />
                                </>
                            )
                        }}
                    />
                    <UnderLineInput
                        placeholder='위치'
                        editable={false}
                        onPress={() => { }}
                    />
                    <Controller
                        control={control}
                        name='instagramId'
                        rules={{ required: false }}
                        render={({ field }) => (
                            <UnderLineInput
                                value={field.value || ''}
                                onChangeText={field.onChange}
                                placeholder='(선택) 인스타그램 아이디'
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='introduce'
                        rules={{ required: false }}
                        render={({ field }) => (
                            <UnderLineInput
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder='(선택) 소개'
                                multiline
                                maxLength={2000}
                                style={{ minHeight: 120 }}
                            />
                        )}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer
                text='다음'
                loading={loading}
                onPress={onSubmit}
            />
        </ScreenLayout>
    )
}

export default Signup

const styles = StyleSheet.create({})