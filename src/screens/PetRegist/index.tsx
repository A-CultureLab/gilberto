import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Gender, PetType, RegistPetInput } from '../../../__generated__/globalTypes'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import UnderLineInput from '../../components/inputs/UnderLineInput'
import ScreenLayout from '../../components/layout/ScreenLayout'
import CharacterSelectSheet from '../../components/selectors/CharacterSelectSheet'
import DateSelectSheet from '../../components/selectors/DateSelectSheet'
import SelectBottomSheet from '../../components/selectors/SelectBottomSheet'
import SpeciesSelectPicker from '../../components/selectors/SpeciesSelectSheet'
import WeightSelectSheet from '../../components/selectors/WeightSelectSheet'
import UnderLineToggle from '../../components/toggles/UnderLineToggle'
import { GRAY2, GRAY3 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { useCreatePet } from '../../graphql/pet'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'

const PetRegist = () => {

    const { goBack } = useNavigation()
    const [createPet, { loading }] = useCreatePet()

    const { toast } = useGlobalUi()
    const { control, handleSubmit, setValue, watch, formState, clearErrors } = useForm<RegistPetInput>({
        defaultValues: {
            neutered: false,
            vaccinated: false
        }
    })

    const onSubmit = handleSubmit(async (data) => {
        if (loading) return
        const { errors } = await createPet({ variables: { data } })
        if (errors) {
            toast({ content: '오류' })
            return
        }
        goBack()
    })

    useEffect(() => {
        const errors = formState.errors
        if (Object.keys(errors).length === 0) return
        //@ts-ignore
        toast({ content: errors[Object.keys(errors)[0]].message })
        clearErrors()
    }, [formState])

    useEffect(() => {
        if (!watch('type')) return
        setValue('character', '')
        setValue('species', '')
    }, [watch('type')])

    return (
        <ScreenLayout>
            <Header title='반려동물 등록' />
            <KeyboardAvoidingView
                enabled={IS_IOS}
                behavior='padding'
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
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

                            const { imageTemp, clear, upload } = useImageUpload('petProfile')

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
                        name='type'
                        rules={{ required: '동물을 선택해주세요' }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='동물'
                                        value={field.value === PetType.dog ? '강아지' : field.value === PetType.cat ? '고양이' : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <SelectBottomSheet
                                        list={['강아지', '고양이']}
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(i) => field.onChange(i === 0 ? PetType.dog : PetType.cat)}
                                    />
                                </>
                            )
                        }}
                    />

                    {watch('type') && <Controller
                        control={control}
                        name='species'
                        rules={{ required: '종을 선택해주세요' }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='종'
                                        value={field.value}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <SpeciesSelectPicker
                                        type={watch('type')}
                                        onSelect={(s) => field.onChange(s)}
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                    />
                                </>
                            )
                        }}
                    />}

                    {watch('type') && <Controller
                        control={control}
                        name='character'
                        rules={{ required: '성격을 선택해주세요' }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='성격'
                                        value={field.value}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <CharacterSelectSheet
                                        type={watch('type')}
                                        onSelect={(s) => field.onChange(s)}
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                    />
                                </>
                            )
                        }}
                    />}


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
                                        value={field.value === Gender.male ? '남아' : field.value === Gender.female ? '여아' : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <SelectBottomSheet
                                        list={['남아', '여아']}
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
                                        value={field.value ? dayjs(field.value).format('YYYY.MM') : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <DateSelectSheet
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(date) => field.onChange(date)}
                                        day={false}
                                    />
                                </>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name='weight'
                        rules={{ required: '무게를 선택해주세요' }}
                        render={({ field }) => {
                            const [visible, setVisible] = useState(false)
                            return (
                                <>
                                    <UnderLineInput
                                        placeholder='무게'
                                        value={field.value ? (field.value || 0).toString() + 'kg' : ''}
                                        editable={false}
                                        pointerEvents='none'
                                        onPress={() => setVisible(true)}
                                    />
                                    <WeightSelectSheet
                                        onClose={() => setVisible(false)}
                                        visible={visible}
                                        onSelect={(w) => field.onChange(w)}
                                    />
                                </>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name='neutered'
                        render={({ field }) => {
                            return (
                                <>
                                    <UnderLineToggle
                                        text='중성화'
                                        value={field.value}
                                        onChange={(v) => field.onChange(v)}
                                    />
                                </>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name='vaccinated'
                        render={({ field }) => {
                            return (
                                <>
                                    <UnderLineToggle
                                        text='예방접종'
                                        value={field.value}
                                        onChange={(v) => field.onChange(v)}
                                    />
                                </>
                            )
                        }}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
            <Footer
                text='등록'
                onPress={onSubmit}
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default PetRegist

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        paddingVertical: 16,
        paddingLeft: 24,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
})