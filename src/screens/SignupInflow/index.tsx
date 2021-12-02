import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/buttons/Button'
import LoginStackHeader from '../../components/headers/LoginStackHeader'
import ScreenLayout from '../../components/layout/ScreenLayout'
import VerticalSelector from '../../components/selectors/VerticalSelector'
import { INFLOWS } from '../../constants/values'
import { useSignup } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import useRoute from '../../hooks/useRoute'
import { AuthContext } from '../../wrappers/AuthWrapper'

const SignupInflow = () => {

    const { params } = useRoute<'SignupInflow'>()
    const { bottom } = useSafeAreaInsets()
    const { toast } = useGlobalUi()

    const [inflow, setInflow] = useState<null | string>(null)

    const [signup, { loading }] = useSignup()
    const { login } = useContext(AuthContext)

    const onSubmit = async () => {
        if (!inflow) return toast({ content: '유입경로를 선택해주세요' })

        const { phoneVerifySuccessToken, ...data } = params

        const { data: _data } = await signup({
            variables: {
                phoneVerifySuccessToken,
                data: { ...data, inflow }
            }
        })
        if (!_data) return
        login(_data.signup)
    }

    return (
        <ScreenLayout  >
            <LoginStackHeader title='회원정보 등록' />
            <View style={styles.body} >
                <Text style={{ marginTop: 36, marginBottom: 24 }} >어떻게 앱을 깔게 되셨나요?</Text>
                <VerticalSelector
                    value={inflow}
                    onChange={t => setInflow(t)}
                    values={INFLOWS}
                />

                <View style={{ flex: 1 }} />
                <Button
                    style={{ marginBottom: 28 + bottom }}
                    onPress={onSubmit}
                    disable={!inflow}
                    loading={loading}
                >완료</Button>
            </View>
        </ScreenLayout>
    )
}

export default SignupInflow

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 20
    }
})