import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import Input from '../../components/inputs/Input'
import InputArea from '../../components/inputs/InputArea'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR3, GRAY1, GRAY3 } from '../../constants/styles'
import { useInstagramIdToProfile } from '../../graphql/util'
import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FastImage from 'react-native-fast-image'


const SignupOptionalInfo = () => {

    const { navigate } = useNavigation()
    const { params } = useRoute<'SignupOptionalInfo'>()
    const { bottom } = useSafeAreaInsets()

    // 선택 정보
    const [instagramId, setInstagramId] = useState<string | null>(null)
    const [introduce, setIntroduce] = useState<string | null>(null)

    // 인스타 그램 크롤링
    const { data, error, loading } = useInstagramIdToProfile({ variables: { instagramId: instagramId || '' }, skip: !instagramId })


    const onSubmit = () => {
        navigate('SignupInflow', {
            ...params,
            instagramId: instagramId || null,
            introduce: introduce || null
        })
    }

    return (
        <ScreenLayout>
            <LoginStackHeader title='회원정보 등록' />
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 32 }} >

                <Input
                    label='인스타그램 아이디'
                    placeholder='추가시 인스타그램과 연동 됩니다'
                    style={{ marginBottom: 24 }}
                    value={instagramId || ''}
                    onChangeText={t => setInstagramId(t || null)}
                    maxLength={30}
                    right={
                        <View style={{ position: 'absolute', right: 16 }} >
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
                    }
                />
                <InputArea
                    value={introduce || ''}
                    onChangeText={t => setIntroduce(t || null)}
                    label='자기소개'
                    placeholder='나에 대한 소개글을 작성해 보세요'
                />

                <View style={{ flex: 1 }} />

                <Button style={{ marginBottom: 28 + bottom }} onPress={onSubmit} >다음</Button>
            </View>
        </ScreenLayout>
    )
}

export default SignupOptionalInfo

const styles = StyleSheet.create({})
