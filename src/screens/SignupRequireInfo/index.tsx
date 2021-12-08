import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { COLOR1 } from '../../constants/styles'
import { createAddress_createAddress } from '../../graphql/__generated__/createAddress'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'
import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'
import genderGenerator from '../../lib/genderGenerator'
import Camera from '../../assets/svgs/camera.svg'
import LinearGradient from 'react-native-linear-gradient'

const SignupRequireInfo = () => {

    const { navigate } = useNavigation()
    const { params } = useRoute<'SignupRequireInfo'>()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()

    // 수집 정보
    const { image, imageTemp, loading, selectAndUpload } = useImageUpload('profileImage/')
    const [profileId, setProfileId] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState<Gender | null>(null)
    const [birth, setBirth] = useState<Date | null>(null)
    const [address, setAddress] = useState<createAddress_createAddress | null>(null)
    const [agreementDate, setAgreementDate] = useState<Date | null>(null)
    const [privacyDate, setPrivacyDate] = useState<Date | null>(null)
    const [marketingPushDate, setMarketingPushDate] = useState<Date | null>(null)

    // 다음 버튼 확성화
    const enable = profileId && name && gender && birth && address && agreementDate && privacyDate

    const onSubmit = () => {
        if (!profileId) return toast({ content: '아이디를 입력해주세요' })
        if (!name) return toast({ content: '이름을 입력해주세요' })
        if (!gender) return toast({ content: '성별을 입력해주세요' })
        if (!birth) return toast({ content: '생년월일을 입력새주세요' })
        if (!address) return toast({ content: '주소를 입력해주세요' })
        if (!agreementDate || !privacyDate) return toast({ content: '약관에 동의해주세요' })

        if (!(/^[_A-Za-z0-9\-]*$/.test(profileId))) return toast({ content: '아이디는 영문, 숫자, _, - 만 사용 가능합니다.' })

        navigate('SignupOptionalInfo', {
            ...params,
            image: image || null,
            profileId,
            name,
            gender,
            birth,
            addressId: address.id,
            agreementDate,
            marketingPushDate
        })
    }

    return (
        <ScreenLayout>
            <LoginStackHeader title='회원정보 등록' />

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
                    label='아이디'
                    maxLength={20}
                    value={profileId}
                    onChangeText={t => setProfileId(t)}
                    placeholder='아이디를 입력해주세요 (영문, 숫자, -, _)'
                />
                <Input
                    style={{ marginBottom: 24 }}
                    label='이름'
                    value={name}
                    maxLength={10}
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
                    style={{ marginBottom: 60 }}
                    label='주소'
                    value={address}
                    onChange={v => setAddress(v)}
                />


                <View style={styles.agreementContainer} >
                    <Toggle value={!!agreementDate && !!privacyDate && !!marketingPushDate} onChange={(v) => { setAgreementDate(v ? new Date() : null); setPrivacyDate(v ? new Date() : null); setMarketingPushDate(v ? new Date() : null) }} />
                    <Text style={[styles.agreementText, { fontWeight: 'bold' }]}>약관에 모두 동의</Text>
                </View>

                <View style={styles.agreementContainer} >
                    <Toggle value={!!agreementDate} onChange={(v) => setAgreementDate(v ? new Date() : null)} />
                    <Text style={[styles.agreementText]}>(필수) 서비스 이용약관에 동의합니다</Text>
                    <TouchableOpacity onPress={() => navigate('WebView', { title: '서비스 이용약관', url: 'https://38do.kr/agreement' })} >
                        <Text style={styles.agreementDetail} >본문보기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.agreementContainer} >
                    <Toggle value={!!privacyDate} onChange={(v) => setPrivacyDate(v ? new Date() : null)} />
                    <Text style={[styles.agreementText]}>(필수) 개인정보 수집 및 이용에 동의합니다.</Text>
                    <TouchableOpacity onPress={() => navigate('WebView', { title: '개인정보 처리방침', url: 'https://38do.kr/privacy-policy' })} >
                        <Text style={styles.agreementDetail} >본문보기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.agreementContainer} >
                    <Toggle value={!!marketingPushDate} onChange={(v) => setMarketingPushDate(v ? new Date() : null)} />
                    <Text style={[styles.agreementText]}>(선택) 이벤트/마케팅 푸시 알림 수신</Text>
                </View>
                <View style={{ height: 170 }} />
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
                    loading={loading}
                >다음</Button>
            </View>
        </ScreenLayout>
    )
}

export default SignupRequireInfo

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