import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
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
import auth from '@react-native-firebase/auth'
import DateSelectSheet from '../../components/selectors/DateSelectSheet'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY2, GRAY3 } from '../../constants/styles'
import Toggle from '../../components/toggles/Toggle'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { SelectLocationProps } from '../SelectLocation'
import { coordToRegion } from '../../graphql/__generated__/coordToRegion'
import useGlobalUi from '../../hooks/useGlobalUi'


const Signup = () => {

    const { navigate, reset } = useNavigation()
    const [signup, { loading }] = useSignup()
    const { alert, confirm, toast } = useGlobalUi()

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<SignupInput>({
        defaultValues: {
            marketingEmailDate: null,
            marketingPushDate: null,
            instagramId: '',
            introduce: '',
            name: auth().currentUser?.displayName || undefined,
            email: auth().currentUser?.email || undefined,
            image: auth().currentUser?.photoURL || undefined,

        }
    })

    const isAgreeAll = !!watch().agreementDate && !!watch().marketingPushDate && !!watch().marketingEmailDate

    const onSubmit = handleSubmit(async (data) => {
        if (!data.agreementDate) return
        console.log(data)
        // await signup({ variables: { data } })

        // reset({ index: 0, routes: [{ name: 'SignupPet' }] })
    })

    const onAgreeAll = useCallback(() => {
        setValue('agreementDate', new Date())
        setValue('marketingPushDate', new Date())
        setValue('marketingEmailDate', new Date())
    }, [setValue])


    const onSelectLocation = useCallback(() => {
        const props: SelectLocationProps = {
            onSelect: (data) => {
                if (!data.coordsToRegion) return
                setValue('addressId', data.coordsToRegion.id)
                setValue('address', data.coordsToRegion.address)
                setValue('postcode', data.coordsToRegion.postcode)
                setValue('latitude', data.coordsToRegion.latitude)
                setValue('longitude', data.coordsToRegion.longitude)
            }
        }
        navigate('SelectLocation', props)
    }, [])


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
                    {!auth().currentUser?.email && <Controller
                        control={control}
                        name='email'
                        rules={{ required: true }}
                        render={({ field }) => (
                            <UnderLineInput
                                inputStyle={{ marginTop: 24 }}
                                value={field.value}
                                onChangeText={field.onChange}
                                keyboardType='email-address'
                                placeholder='이메일'
                            />
                        )}
                    />}
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
                    <Controller
                        control={control}
                        name='image'
                        rules={{ required: true }}
                        render={({ field }) => {
                            return (
                                <>
                                    {field.value
                                        ? <Pressable
                                            android_ripple={{ color: GRAY2 }}
                                            style={styles.imageContainer}
                                        >
                                            <FastImage style={{ width: 80, height: 80 }} source={{ uri: field.value }} />
                                        </Pressable>
                                        : <UnderLineInput
                                            placeholder='사진'
                                            pointerEvents='none'
                                            editable={false}
                                            onPress={() => { }}
                                        />}

                                </>
                            )
                        }}
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
                                        pointerEvents='none'
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
                        pointerEvents='none'
                        editable={false}
                        value={watch().address}
                        onPress={onSelectLocation}
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
                    <View style={{ marginVertical: 24 }} >
                        <View style={styles.agreementContainer} >
                            <Toggle value={isAgreeAll} onChange={(v) => v && onAgreeAll()} />
                            <Text style={[styles.agreementText, { fontWeight: 'bold' }]}>약관에 모두 동의</Text>
                        </View>

                        <Controller
                            control={control}
                            name='agreementDate'
                            rules={{ required: true }}
                            render={({ field }) => {

                                const [agr1, setAgr1] = useState(false)
                                const [agr2, setAgr2] = useState(false)
                                const [agr3, setAgr3] = useState(false)

                                useEffect(() => {
                                    console.log(agr1, agr2, agr3)
                                    if (agr1 && agr2 && agr3) {
                                        field.onChange(new Date())
                                    } else {
                                        field.onChange(false)
                                    }
                                }, [agr1, agr2, agr3])

                                useEffect(() => {
                                    if (field.value) {
                                        setAgr1(true)
                                        setAgr2(true)
                                        setAgr3(true)
                                    }
                                }, [field.value])

                                return (
                                    <>
                                        <View style={styles.agreementContainer} >
                                            <Toggle value={agr1} onChange={(v) => setAgr1(v)} />
                                            <Text style={[styles.agreementText]}>(필수) 서비스 이용약관에 동의합니다</Text>
                                            <TouchableOpacity onPress={() => navigate('Agreement')} >
                                                <Text style={styles.agreementDetail} >본문보기</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.agreementContainer} >
                                            <Toggle value={agr2} onChange={(v) => setAgr2(v)} />
                                            <Text style={[styles.agreementText]}>(필수) 개인정보 수집 및 이용에 동의합니다</Text>
                                            <TouchableOpacity onPress={() => navigate('PrivatePolicy')} >
                                                <Text style={styles.agreementDetail} >본문보기</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.agreementContainer} >
                                            <Toggle value={agr3} onChange={(v) => setAgr3(v)} />
                                            <Text style={[styles.agreementText]}>(필수) 위치기반서비스 이용약관에 동의합니다</Text>
                                            <TouchableOpacity onPress={() => navigate('LocationAgreement')} >
                                                <Text style={styles.agreementDetail} >본문보기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name='marketingPushDate'
                            rules={{ required: false }}
                            render={({ field }) => (
                                <View style={styles.agreementContainer} >
                                    <Toggle value={!!field.value} onChange={(v) => field.onChange(v ? new Date() : null)} />
                                    <Text style={[styles.agreementText]}>(선택) 이벤트/마케팅 푸시 알림 수신</Text>
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name='marketingEmailDate'
                            rules={{ required: false }}
                            render={({ field }) => (
                                <View style={styles.agreementContainer} >
                                    <Toggle value={!!field.value} onChange={(v) => field.onChange(v ? new Date() : null)} />
                                    <Text style={[styles.agreementText]}>(선택) 이벤트/마케팅 이메일 수신</Text>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer
                text='다음'
                loading={loading}
                onPress={() => toast({
                    content: 'hello'
                })}
            />
        </ScreenLayout>
    )
}

export default Signup

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        paddingVertical: 16,
        paddingLeft: 24,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        marginLeft: 24,
    },
    agreementText: {
        fontSize: 12,
        marginLeft: 8
    },
    agreementDetail: {
        fontSize: 12,
        color: COLOR1,
        fontWeight: 'bold',
        marginLeft: 8
    }
})