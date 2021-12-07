import useNavigation from '../../hooks/useNavigation'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import SelectOrInputBottomSheet from '../../components/selectors/SelectOrInputBottomSheet'
import { GRAY1, GRAY3 } from '../../constants/styles'
import { WITHDRAW_REASONS } from '../../constants/values'
import { useWithdraw } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import { AuthContext } from '../../wrappers/AuthWrapper'

const Withdraw = () => {

    const { reset } = useNavigation()
    const { confirm, toast } = useGlobalUi()
    const { logout } = useContext(AuthContext)
    const [withdraw, { loading }] = useWithdraw()

    const [visible, setVisible] = useState(false)
    const [reason, setReason] = useState('')


    const onWithdraw = useCallback(() => {
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
                <Header title='회원탈퇴' />
                <View style={{ flex: 1 }} >
                    <Text style={styles.comment} >계정을 삭제하시면 추후에 데이터를 복구 하실 수 없습니다.</Text>
                    <Pressable
                        onPress={() => setVisible(true)}
                        style={styles.reasonContainer}
                    >
                        <Text style={{ color: reason ? '#000' : GRAY1 }} >{reason || '탈퇴하는 이유를 선택해주세요'} </Text>
                    </Pressable>
                </View>
                <Footer
                    text='탈퇴하기'
                    loading={loading}
                    disable={!reason}
                    onPress={onWithdraw}
                />
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
        margin: 24
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