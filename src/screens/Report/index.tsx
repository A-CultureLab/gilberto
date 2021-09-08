import { useRoute, Route, useNavigation } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import SelectOrInputBottomSheet from '../../components/selectors/SelectOrInputBottomSheet'
import { GRAY1, GRAY3 } from '../../constants/styles'
import { REPORT_CHAT_REASONS, REPORT_CHAT_ROOM_REASONS, REPORT_USER_REASONS } from '../../constants/values'
import { useChatRoomWillReport, useChatWillReport, useCreateReport, useUserWillReport } from '../../graphql/report'
import useGlobalUi from '../../hooks/useGlobalUi'
import ReportChatInfo from './ReportChatInfo'
import ReportChatRoomInfo from './ReportChatRoomInfo'
import ReportUserInfo from './ReportUserInfo'

export interface ReportProps {
    userId?: string
    chatId?: string
    chatRoomId?: string
}

const Report = () => {

    const { params: { chatId, chatRoomId, userId } } = useRoute<Route<'Report', ReportProps>>()
    const { goBack } = useNavigation()
    const { toast } = useGlobalUi()

    const [visible, setVisible] = useState(false)
    const [reason, setReason] = useState('')
    const reasons = !!userId ? REPORT_USER_REASONS : !!chatId ? REPORT_CHAT_REASONS : REPORT_CHAT_ROOM_REASONS

    const { data: userData } = useUserWillReport({ variables: { id: userId || '' }, skip: !userId })
    const { data: chatData } = useChatWillReport({ variables: { id: chatId || '' }, skip: !chatId })
    const { data: chatRoomData } = useChatRoomWillReport({ variables: { id: chatRoomId || '' }, skip: !chatRoomId })

    const [createReport, { loading }] = useCreateReport({ variables: { chatId, chatRoomId, userId, reason } })


    const onReport = useCallback(async () => {
        const { errors } = await createReport()
        if (!errors) {
            toast({ content: '신고가 접수되었습니다.' })
            goBack()
        }
    }, [])

    return (
        <>
            <ScreenLayout>
                <Header title='신고하기' />
                <View style={{ flex: 1 }} >
                    {userData && <ReportUserInfo {...userData.user} />}
                    {chatData && <ReportChatInfo {...chatData.chat} />}
                    {chatRoomData && <ReportChatRoomInfo {...chatRoomData.chatRoom} />}
                    <Pressable
                        onPress={() => setVisible(true)}
                        style={styles.reasonContainer}
                    >
                        <Text style={{ color: reason ? '#000' : GRAY1 }} >{reason || '신고하는 이유를 선택해주세요'} </Text>
                    </Pressable>
                </View>
                <Footer
                    text='신고하기'
                    disable={!reason}
                    loading={loading}
                    onPress={onReport}
                />
            </ScreenLayout>
            <SelectOrInputBottomSheet
                list={reasons}
                onClose={() => setVisible(false)}
                visible={visible}
                onSelect={t => setReason(t)}
            />
        </>
    )
}

export default Report

const styles = StyleSheet.create({
    reasonContainer: {
        paddingHorizontal: 24,
        height: 56,
        width: '100%',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        justifyContent: 'center'
    }
})