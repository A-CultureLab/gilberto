import { useApolloClient } from '@apollo/client'
import useNavigation from '../../hooks/useNavigation'
import IMP from 'iamport-react-native'
import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gender } from '../../../__generated__/globalTypes'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { IAMPORT_CODE } from '../../constants/values'
import { USER_CERTIFICATION_INFO } from '../../graphql/util'
import { userCertificationInfo, userCertificationInfoVariables } from '../../graphql/__generated__/userCertificationInfo'
import useGlobalUi from '../../hooks/useGlobalUi'
import useRoute from '../../hooks/useRoute'

export interface UserCertificationProps {
    onCertificated: (res: { uniqueKey: string, name: string, birth: Date, gender: Gender }) => void
}

const UserCertification = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<'UserCertification'>()
    const { toast } = useGlobalUi()

    const { query } = useApolloClient()

    const callback = useCallback(async (res) => {
        console.log(res)
        if (res.success) {
            try {
                const { data, error } = await query<userCertificationInfo, userCertificationInfoVariables>({
                    query: USER_CERTIFICATION_INFO,
                    variables: { imp_uid: res.imp_uid },
                    fetchPolicy: 'no-cache'
                })
                if (error) throw error
                params.onCertificated(data.userCertificationInfo)
            } catch (error) {
                console.log(error)
                toast({ content: '본인인증 실패' })
            }
        } else {
            toast({ content: '본인인증 실패' })
        }
        goBack()
    }, [params, goBack])

    useEffect(() => {

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
