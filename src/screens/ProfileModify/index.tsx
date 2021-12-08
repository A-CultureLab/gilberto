import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gender } from '../../../__generated__/globalTypes'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import Input from '../../components/inputs/Input'
import ScreenLayout from '../../components/layout/ScreenLayout'
import AddressSelector from '../../components/selectors/AddressSelector'
import DateSelector from '../../components/selectors/DateSelector'
import HorizontalSelector from '../../components/selectors/HorizontalSelector'
import Toggle from '../../components/toggles/Toggle'
import { COLOR1, COLOR3, GRAY1, GRAY3 } from '../../constants/styles'
import { createAddress_createAddress } from '../../graphql/__generated__/createAddress'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'
import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'
import genderGenerator from '../../lib/genderGenerator'
import Camera from '../../assets/svgs/camera.svg'
import LinearGradient from 'react-native-linear-gradient'
import { useInstagramIdToProfile } from '../../graphql/util'
import Icon from 'react-native-vector-icons/MaterialIcons'
import InputArea from '../../components/inputs/InputArea'
import { I_USER, useUpdateUser } from '../../graphql/user'
import { useApolloClient } from '@apollo/client'
import { iUser, iUser_iUser } from '../../graphql/__generated__/iUser'

const ProfileModify = () => {

    const { goBack } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()
    const { cache } = useApolloClient()

    // 내 기존 정보
    const user = cache.readQuery<iUser>({ query: I_USER })?.iUser as iUser_iUser

    // 수집 정보
    const { image, imageTemp, selectAndUpload, loading: imageLoading } = useImageUpload('profileImage/')
    const [profileId, setProfileId] = useState(user.profileId)
    const [name, setName] = useState(user.name)
    const [gender, setGender] = useState<Gender>(user.gender)
    const [birth, setBirth] = useState<Date>(user.birth)
    const [address, setAddress] = useState<createAddress_createAddress>(user.address)
    const [instagramId, setInstagramId] = useState<string | null>(user.instagramId)
    const [introduce, setIntroduce] = useState<string>(user.introduce)


    // 인스타 그램 크롤링
    const { data: instagramData, error: instagramError, loading: instagramLoading } = useInstagramIdToProfile({ variables: { instagramId: instagramId || '' }, skip: !instagramId })
    // 프로필 저장
    const [updateUser, { loading }] = useUpdateUser()

    // 다음 버튼 확성화
    const enable = profileId && name && gender && birth && address

    const onSubmit = async () => {
        if (imageLoading) return
        if (!profileId) return toast({ content: '아이디를 입력해주세요' })
        if (!name) return toast({ content: '이름을 입력해주세요' })
        if (!gender) return toast({ content: '성별을 입력해주세요' })
        if (!birth) return toast({ content: '생년월일을 입력새주세요' })
        if (!address) return toast({ content: '주소를 입력해주세요' })

        if (!(/^[_A-Za-z0-9\-]*$/.test(profileId))) return toast({ content: '아이디는 영문, 숫자, _, - 만 사용 가능합니다.' })

        const { data } = await updateUser({
            variables: {
                data: {
                    image: image || user.image,
                    profileId,
                    name,
                    gender,
                    birth,
                    addressId: address.id,
                    instagramId: instagramId || null,
                    introduce
                }
            }
        })

        if (!data) return

        goBack()
    }

    return (
        <ScreenLayout>
            <LoginStackHeader title='프로필 수정' />

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
                        source={image ? { uri: image } : imageTemp ? { uri: imageTemp } : { uri: user?.image }}
                    />
                    <View style={styles.cameraBtn} >
                        <Camera width={16} height={16} fill='#fff' />
                    </View>
                </Pressable>

                <Input
                    style={{ marginBottom: 24 }}
                    label='아이디'
                    value={profileId}
                    maxLength={20}
                    onChangeText={t => setProfileId(t)}
                    placeholder='아이디를 입력해주세요 (영문, 숫자, -, _)'
                />
                <Input
                    style={{ marginBottom: 24 }}
                    label='이름'
                    maxLength={10}
                    value={name}
                    onChangeText={t => setName(t)}
                    placeholder='이름을 입력해주세요'
                />
                <HorizontalSelector
                    style={{ marginBottom: 24 }}
                    label='성별'
                    value={!!gender ? genderGenerator.user(gender) : null}
                    values={[genderGenerator.user(Gender.male), genderGenerator.user(Gender.female)]}
                    onChange={(v) => setGender(v === genderGenerator.user(Gender.male) ? Gender.male : Gender.female)}
                />
                <DateSelector
                    style={{ marginBottom: 24 }}
                    label='생년월일'
                    value={birth}
                    onChange={v => setBirth(v)}
                />
                <AddressSelector
                    style={{ marginBottom: 24 }}
                    label='주소'
                    value={address}
                    onChange={v => setAddress(v)}
                />

                <Input
                    label='인스타그램 아이디'
                    placeholder='추가시 인스타그램과 연동 됩니다'
                    style={{ marginBottom: 24 }}
                    value={instagramId || ''}
                    onChangeText={t => setInstagramId(t || null)}
                    maxLength={30}
                    right={
                        <View style={{ position: 'absolute', right: 16 }} >
                            {instagramData &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <FastImage
                                        style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: GRAY3, marginRight: 8 }}
                                        source={{ uri: instagramData.instagramIdToProfile.image }}
                                    />
                                    <Text style={{ fontSize: 12, color: GRAY1 }} >{instagramData.instagramIdToProfile.name}</Text>
                                </View>
                            }
                            {instagramError &&
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Icon name='error-outline' color={COLOR3} style={{ marginRight: 8 }} size={16} />
                                    <Text style={{ fontSize: 12, color: GRAY1 }} >유효하지 않은 아이디</Text>
                                </View>
                            }
                            {instagramLoading && <ActivityIndicator size='small' color={GRAY1} />}
                        </View>
                    }
                />
                <InputArea
                    style={{ marginBottom: 80 }}
                    value={introduce}
                    onChangeText={t => setIntroduce(t)}
                    label='자기소개'
                    placeholder='나에 대한 소개글을 작성해 보세요'
                />

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
                >저장</Button>
            </View>
        </ScreenLayout>
    )
}

export default ProfileModify

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