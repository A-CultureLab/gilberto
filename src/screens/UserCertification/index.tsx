import { Route, useNavigation, useRoute } from '@react-navigation/native'
import IMP from 'iamport-react-native'
import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gender } from '../../../__generated__/globalTypes'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Loading from '../../components/loadings/Loading'
import { IAMPORT_CODE } from '../../constants/values'
import useGlobalUi from '../../hooks/useGlobalUi'

export interface UserCertificationProps {
    onCertificated: (res: { uniqueKey: string, name: string, birth: Date, gender: Gender }) => void
}

const UserCertification = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<Route<'UserCertification', UserCertificationProps>>()
    const { toast } = useGlobalUi()

    const callback = useCallback((res) => {
        const success = res.params?.success;
        if (success) {
            params.onCertificated({
                uniqueKey: Math.random().toString(),
                name: '테스터',
                gender: Gender.male,
                birth: new Date(),
            })
        } else {
            toast({ content: '본인인증 실패' })
        }
        goBack()
    }, [params, goBack])

    useEffect(() => {
        setTimeout(() => {
            callback({ params: { success: true } })
        }, 1000);
    }, [])

    return (
        <ScreenLayout>
            <Header title='본인인증' />
            <IMP.Certification
                userCode={IAMPORT_CODE}
                callback={callback}
                data={{} as any}
                loading={<View />}
            />
        </ScreenLayout>
    )
}

export default UserCertification

const styles = StyleSheet.create({})
