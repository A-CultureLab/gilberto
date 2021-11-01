import useNavigation from '../../hooks/useNavigation'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import UnderLineInput from '../../components/inputs/UnderLineInput'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { IS_IOS } from '../../constants/values'
import { I_USER, useIUser, useSignup, useUpdateUser } from '../../graphql/user'
import { Gender, SignupInput, UpdateUserInput } from '../../../__generated__/globalTypes'
import dayjs from 'dayjs'
import FastImage from 'react-native-fast-image'
import { COLOR1, COLOR3, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { SelectLocationProps } from '../SelectLocation'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'
import { useApolloClient } from '@apollo/client'
import { iUser } from '../../graphql/__generated__/iUser'
import UnderLineText from '../../components/texts/UnderLineText'
import { useInstagramIdToProfile } from '../../graphql/util'
import Icon from 'react-native-vector-icons/MaterialIcons'


const ProfileModify = () => {

    const { navigate, goBack } = useNavigation()
    const [updateUser, { loading }] = useUpdateUser()
    const { toast } = useGlobalUi()
    const { cache } = useApolloClient()
    const user = cache.readQuery<iUser>({ query: I_USER })?.iUser
    const [address, setAddress] = useState(user?.address?.land.name)

    const { control, handleSubmit, setValue, formState, clearErrors, watch } = useForm<UpdateUserInput>({
        defaultValues: {
            addressId: user?.address?.id,
            image: user?.image,
            introduce: user?.introduce,
            instagramId: user?.instagramId
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
                setValue('addressId', data.id)
                setAddress(data.land.name)
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
                    overScrollMode='never'
                >
                    <>
                        <UnderLineText style={{ marginTop: 24 }}>{user?.name}</UnderLineText>
                        <UnderLineText >{user?.gender === Gender.male ? '남자' : '여자'}</UnderLineText>
                        <UnderLineText >{dayjs(user?.birth).format('YYYY.MM.DD')}</UnderLineText>
                    </>
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
                        name='addressId'
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
                        render={({ field }) => {

                            const { data, error, loading } = useInstagramIdToProfile({ variables: { instagramId: field.value || '' }, skip: !field.value })

                            return <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <UnderLineInput
                                    value={field.value || undefined}
                                    onChangeText={field.onChange}
                                    placeholder='(선택) 인스타그램 아이디'
                                    maxLength={25}
                                />

                                <View style={{ position: 'absolute', right: 24 }} >
                                    {data &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <FastImage
                                                style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: GRAY3, marginRight: 8 }}
                                                source={{ uri: data.instagramIdToProfile.image }}
                                            />
                                            <Text style={{ fontSize: 12, color: GRAY1 }} >{data.instagramIdToProfile.name}</Text>
                                        </View>
                                    }
                                    {error &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <Icon name='error-outline' color={COLOR3} style={{ marginRight: 8 }} size={16} />
                                            <Text style={{ fontSize: 12, color: GRAY1 }} >유효하지 않은 아이디</Text>
                                        </View>
                                    }
                                    {loading && <ActivityIndicator size='small' color={GRAY1} />}
                                </View>

                            </View>
                        }}
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