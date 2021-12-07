import useNavigation from '../../hooks/useNavigation'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import SelectOrInputBottomSheet from '../../components/selectors/SelectOrInputBottomSheet'
import { COLOR3, GRAY1, GRAY3 } from '../../constants/styles'
import { WITHDRAW_REASONS } from '../../constants/values'
import { useWithdraw } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import { AuthContext } from '../../wrappers/AuthWrapper'
import Button from '../../components/buttons/Button'
import VerticalSelector from '../../components/selectors/VerticalSelector'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Withdraw = () => {

    const { reset } = useNavigation()
    const { confirm, toast } = useGlobalUi()
    const { bottom } = useSafeAreaInsets()
    const { logout } = useContext(AuthContext)
    const [withdraw, { loading }] = useWithdraw()

    const [visible, setVisible] = useState(false)
    const [reason, setReason] = useState('')


    const onWithdraw = useCallback(() => {
        if (!reason) return
        confirm({
            title: '회원탈퇴',
            content: '정말 탈퇴하시겠습니까?',
            onPress: async (isYes) => {
                if (!isYes) return
                const { errors } = await withdraw({ variables: { reason } })
                if (errors) {
                    toast({ content: '오류' })
                    return
                }
                logout()
            }
        })
    }, [reason, toast, confirm])

    return (
        <>
            <ScreenLayout>
                <Header title='회원탈퇴' underline={false} />
                <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: bottom + 28 }} >
                    <Text style={styles.comment} >계정을 삭제하시면 추후에 데이터를 복구 하실 수 없습니다.</Text>
                    <Text style={{ marginBottom: 24 }} >탈퇴사유</Text>
                    <VerticalSelector

                        values={WITHDRAW_REASONS}
                        value={reason}
                        onChange={t => setReason(t)}
                    />
                    <View style={{ flex: 1 }} />
                    <Button
                        loading={loading}
                        disable={!reason}
                        onPress={onWithdraw}
                    >탈퇴하기</Button>
                </View>
            </ScreenLayout>
            <SelectOrInputBottomSheet
                list={WITHDRAW_REASONS}
                onClose={() => setVisible(false)}
                visible={visible}
                onSelect={t => setReason(t)}
            />
        </>
    )
}

export default Withdraw

const styles = StyleSheet.create({
    comment: {
        fontWeight: 'bold',
        marginVertical: 36,
        color: COLOR3
    },
    reasonContainer: {
        paddingHorizontal: 24,
        height: 56,
        width: '100%',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        justifyContent: 'center'
    }
})