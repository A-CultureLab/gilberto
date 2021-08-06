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
import { I_USER, useIUser, useSignup, useUpdateUser } from '../../graphql/user'
import { Gender, SignupInput, UpdateUserInput } from '../../../__generated__/globalTypes'
import SelectBottomSheet from '../../components/selectors/SelectBottomSheet'
import dayjs from 'dayjs'
import auth from '@react-native-firebase/auth'
import DateSelectSheet from '../../components/selectors/DateSelectSheet'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY2, GRAY3 } from '../../constants/styles'
import Toggle from '../../components/toggles/Toggle'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { SelectLocationProps } from '../SelectLocation'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'
import { useApolloClient } from '@apollo/client'
import { iUser } from '../../graphql/__generated__/iUser'


const ProfileModify = () => {

    const { navigate, goBack } = useNavigation()
    const [updateUser, { loading }] = useUpdateUser()
    const { toast } = useGlobalUi()
    const { cache } = useApolloClient()
    const user = cache.readQuery<iUser>({ query: I_USER })?.iUser
    const [address, setAddress] = useState(user?.address.addressName + ' ' + user?.address.buildingName)

    const { control, handleSubmit, setValue, formState, clearErrors } = useForm<UpdateUserInput>({
        defaultValues: {
            addressPostcode: user?.addressPostcode,
            birth: user?.birth,
            gender: user?.gender,
            image: user?.image,
            instagramId: user?.instagramId,
            introduce: user?.introduce,
            name: user?.name
        }
    })



    const onSubmit = handleSubmit(async (data) => {
        const { errors } = await updateUser({ variables: { data } })
        if (errors) {
            toast({ content: '오류 : 정보를 다시 한번 확인해주세요' })
            return
        }

        goBack()
    })


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
            <Header title='프로필 수정' />
            <KeyboardAvoidingView
                behavior={IS_IOS ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
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

                            const { imageTemp, clear, selectAndUpload } = useImageUpload('profile')

                            const uploadImage = useCallback(async () => {
                                try {
                                    const uri = await selectAndUpload({
                                        width: 1024,
                                        height: 1024,
                                        freeStyleCropEnabled: false
                                    }, 'profile/')
                                    field.onChange(uri)
                                } catch (error) {
                                    toast({ content: '이미지 업로드 실패' })
                                    clear()
                                }
                            }, [selectAndUpload])

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
                                style={{ minHeight: 120, borderBottomWidth: 0 }}
                            />
                        )}
                    />
                    <View style={{ height: 100 }} />
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer
                text='수정'
                loading={loading}
                onPress={onSubmit}
            />
        </ScreenLayout>
    )
}

export default ProfileModify

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