import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gender, PetType } from '../../../__generated__/globalTypes'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import DateSelector from '../../components/selectors/DateSelector'
import HorizontalSelector from '../../components/selectors/HorizontalSelector'
import { COLOR1, COLOR3, GRAY1, GRAY3 } from '../../constants/styles'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'
import useNavigation from '../../hooks/useNavigation'
import genderGenerator from '../../lib/genderGenerator'
import Camera from '../../assets/svgs/camera.svg'
import LinearGradient from 'react-native-linear-gradient'
import { useCreatePet } from '../../graphql/pet'
import Header from '../../components/headers/Header'
import WeightSelector from '../../components/selectors/WeightSelector'
import Selector from '../../components/selectors/Selector'
import SpeciesSelector from '../../components/selectors/SpeciesSelector'
import InputableSelector from '../../components/selectors/InputableSelector'
import { ANIMAL_CHARACTER } from '../../constants/values'

const PetRegist = () => {

    const { goBack } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()


    // 수집 정보
    const { image, imageTemp, selectAndUpload, loading: imageLoading } = useImageUpload('petImage/')
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<Gender | null>(null)
    const [birth, setBirth] = useState<Date | null>(null)
    const [weight, setWeight] = useState<number | null>(null)
    const [type, setType] = useState<PetType | null>(null)
    const [species, setSpecies] = useState<string | null>(null)
    const [character, setCharacter] = useState<string | null>(null)


    // 반려동물 생성
    const [createPet, { loading }] = useCreatePet()

    // 다음 버튼 확성화
    const enable = image && name && gender && birth && weight && type && species && character

    const onSubmit = async () => {
        if (imageLoading) return
        if (!image) return toast({ content: '사진을 선택해주세요' })
        if (!name) return toast({ content: '이름을 입력해주세요' })
        if (!gender) return toast({ content: '성별을 입력해주세요' })
        if (!birth) return toast({ content: '생년월일을 입력새주세요' })
        if (!weight) return toast({ content: '몸무게를 입력해주세요' })
        if (!type) return toast({ content: '동물을 입력해주세요' })
        if (!species) return toast({ content: '종을 입력해주세요' })
        if (!character) return toast({ content: '성격을 입력해주세요' })

        const { data } = await createPet({
            variables: {
                data: {
                    image,
                    name,
                    gender,
                    birth,
                    weight,
                    type,
                    species,
                    character
                }
            }
        })

        if (!data) return

        goBack()
    }

    // 동물에 따라 species와 charactor 세트가 달라서 바뀔때마다 초기화
    useEffect(() => {
        setSpecies(null)
        setCharacter(null)
    }, [type])

    return (
        <ScreenLayout>
            <Header title='반려동물 등록' />

            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 20 }}
            >

                <Pressable
                    onPress={() => selectAndUpload({ cropping: true, cropperCircleOverlay: true, width: 512, height: 512 })}
                    style={{ alignSelf: 'center', marginBottom: 50, marginTop: 28 }}
                >
                    <FastImage
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        source={image ? { uri: image } : imageTemp ? { uri: imageTemp } : require("../../assets/profile_empty.png")}
                    />
                    <View style={styles.cameraBtn} >
                        <Camera width={16} height={16} fill='#fff' />
                    </View>
                </Pressable>

                <Input
                    style={{ marginBottom: 24 }}
                    label='이름'
                    value={name}
                    onChangeText={t => setName(t)}
                    placeholder='반려동물 이름을 입력해주세요'
                />
                <HorizontalSelector
                    style={{ marginBottom: 24 }}
                    label='성별'
                    value={!!gender ? genderGenerator.pet(gender) : null}
                    values={[genderGenerator.pet(Gender.male), genderGenerator.pet(Gender.female)]}
                    onChange={(v) => setGender(v === genderGenerator.pet(Gender.male) ? Gender.male : Gender.female)}
                />
                <DateSelector
                    style={{ marginBottom: 24 }}
                    label='생년월일'
                    value={birth}
                    onChange={v => setBirth(v)}
                />
                <WeightSelector
                    style={{ marginBottom: 24 }}
                    label='몸무게'
                    value={weight}
                    onChange={w => setWeight(w)}
                />
                <Selector
                    style={{ marginBottom: 24 }}
                    label='동물'
                    placeholder='동물을 선택해주세요'
                    values={['강아지', '고양이']}
                    value={type ? type === PetType.dog ? '강아지' : '고양이' : null}
                    onSelect={i => setType(i === 0 ? PetType.dog : PetType.cat)}
                />
                {type && <>
                    <SpeciesSelector
                        style={{ marginBottom: 24 }}
                        label='종'
                        type={type}
                        value={species}
                        onChange={v => setSpecies(v)}
                    />
                    <InputableSelector
                        style={{ marginBottom: 24 }}
                        label='성격'
                        placeholder='성격을 입력해주세요'
                        values={ANIMAL_CHARACTER[type]}
                        value={character}
                        onSelect={t => setCharacter(t)}
                    />
                </>}
                <View style={{ height: 100 }} />
            </ScrollView>

            <LinearGradient
                pointerEvents='none'
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: 80, position: 'absolute', left: 0, right: 0, bottom: bottom + 28 + 44 }}
            />

            <View style={[styles.footerContainer, { paddingBottom: 28 + bottom }]} >
                <Button
                    onPress={onSubmit}
                    disable={!enable}
                    loading={loading || imageLoading}
                >추가</Button>
            </View>
        </ScreenLayout>
    )
}

export default PetRegist

const styles = StyleSheet.create({
    cameraBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        position: 'absolute',
        right: 0, bottom: 0,
        backgroundColor: COLOR1
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
})