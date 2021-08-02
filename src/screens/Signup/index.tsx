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
import { Gender, SignupInput } from '../../../__generated__/globalTypes'
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
import useImageUpload from '../../hooks/useImageUpload'


const Signup = () => {

    const { navigate, reset } = useNavigation()
    const [signup, { loading }] = useSignup({ errorPolicy: 'all' })
    const { toast } = useGlobalUi()
    const [address, setAddress] = useState('')

    const { control, handleSubmit, setValue, watch, formState, clearErrors } = useForm<SignupInput>({
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
        const { errors } = await signup({ variables: { data } })
        if (errors) {
            toast({ content: '오류 : 정보를 다시 한번 확인해주세요' })
            return
        }
        if (data.marketingPushDate || data.marketingEmailDate) {
            toast({ content: `${dayjs().format('YYYY-MM-DD')}에 모바일 앱 이벤트/마케팅\n ${data.marketingPushDate ? '푸시알림' : ''} ${data.marketingEmailDate ? '이메일' : ''} 수신 동의 처리되었습니다.`, }, 4000)
        }

        reset({ index: 0, routes: [{ name: 'SignupPet' }] })
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
                setValue('addressPostcode', data.coordsToRegion.postcode)
                setAddress(data.coordsToRegion.addressName + ' ' + data.coordsToRegion.buildingName)
            }
        }
        navigate('SelectLocation', props)
    }, [])

    useEffect(() => {
        const errors = formState.errors
        if (Object.keys(errors).length === 0) return
        //@ts-ignore
        toast({ content: errors[Object.keys(errors)[0]].message })
        clearErrors()
    }, [formState])



    return (
        <ScreenLayout>
            <Header title='회원정보 등록' backBtn='none' />
            <KeyboardAvoidingView
                behavior={IS_IOS ? 'padding' : 'height'}
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
                        rules={{ required: '이메일을 입력해주세요' }}
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
                        rules={{ required: '이름을 입력해주세요' }}
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
                        rules={{ required: '사진을 선택해주세요' }}
                        render={({ field }) => {

                            const { imageTemp, clear, upload } = useImageUpload('profile')

                            const uploadImage = useCallback(async () => {
                                try {
                                    const uri = await upload({
                                        width: 1024,
                                        height: 1024,
                                        freeStyleCropEnabled: false
                                    }, 'profile/')
                                    field.onChange(uri)
                                } catch (error) {
                                    toast({ content: '이미지 업로드 실패' })
                                    clear()
                                }
                            }, [upload])

                            return (
                                <>
                                    {(field.value || imageTemp)
                                        ? <Pressable
                                            android_ripple={{ color: GRAY2 }}
                                            style={styles.imageContainer}
                                            onPress={uploadImage}
                                        >
                                            <FastImage style={{ width: 80, height: 80 }} source={{ uri: field.value || imageTemp || undefined }} />
                                        </Pressable>
                                        : <UnderLineInput
                                            placeholder='사진'
                                            pointerEvents='none'
                                            onPress={uploadImage}
                                            editable={false}
                                        />}

                                </>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name='gender'
                        rules={{ required: '성별을 선택해주세요' }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='성별'
                                        value={field.value === Gender.male ? '남자' : field.value === Gender.female ? '여자' : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <SelectBottomSheet
                                        list={['남자', '여자']}
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(i) => field.onChange(i === 0 ? Gender.male : Gender.female)}
                                    />
                                </>
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name='birth'
                        rules={{ required: '출생일을 선택해주세요' }}
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

                    <Controller
                        control={control}
                        name='addressPostcode'
                        rules={{ required: '위치를 선택해주세요' }}
                        render={({ field }) => (
                            <UnderLineInput
                                placeholder='위치'
                                pointerEvents='none'
                                editable={false}
                                value={address}
                                onPress={onSelectLocation}
                            />
                        )}
                    />



                    <Controller
                        control={control}
                        name='instagramId'
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
                            rules={{ required: '필수 약관에 동의해주세요' }}
                            render={({ field }) => {

                                const [agr1, setAgr1] = useState(false)
                                const [agr2, setAgr2] = useState(false)
                                const [agr3, setAgr3] = useState(false)

                                useEffect(() => {
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
                                            <TouchableOpacity onPress={() => navigate('WebView', { title: '서비스 이용약관', url: 'https://38do.com/agreement' })} >
                                                <Text style={styles.agreementDetail} >본문보기</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.agreementContainer} >
                                            <Toggle value={agr2} onChange={(v) => setAgr2(v)} />
                                            <Text style={[styles.agreementText]}>(필수) 개인정보 수집 및 이용에 동의합니다</Text>
                                            <TouchableOpacity onPress={() => navigate('WebView', { title: '개인정보 처리방침', url: 'https://38do.com/privacy' })} >
                                                <Text style={styles.agreementDetail} >본문보기</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.agreementContainer} >
                                            <Toggle value={agr3} onChange={(v) => setAgr3(v)} />
                                            <Text style={[styles.agreementText]}>(필수) 위치기반서비스 이용약관에 동의합니다</Text>
                                            <TouchableOpacity onPress={() => navigate('WebView', { title: '위치기반 서비스 이용약관', url: 'https://38do.com/locationAgreement' })} >
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
                onPress={onSubmit}
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