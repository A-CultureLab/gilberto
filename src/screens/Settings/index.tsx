import { GRAY2, GRAY3 } from '../../constants/styles'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../../navigations'
import Header from '../../components/headers/Header'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../components/layout/ScreenLayout'
import useAuth from '../../hooks/useAuth'
import { useContext } from 'react'
import useGlobalUi from '../../hooks/useGlobalUi'
import useNavigation from '../../hooks/useNavigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import deviceInfoModule from 'react-native-device-info'
import CodePush from 'react-native-code-push'
import SpInAppUpdates, { AndroidUpdateType, IAUUpdateKind } from 'sp-react-native-in-app-updates'
import { IS_ANDROID } from '../../constants/values'

const inAppUpdates = new SpInAppUpdates(__DEV__)

const Settings = () => {
    const { bottom } = useSafeAreaInsets()
    const { navigate, reset } = useNavigation()
    const { confirm, toast } = useGlobalUi()
    const { logout } = useAuth()
    const { user } = useContext(AuthContext)

    const [shouldUpdate, setShouldUpdate] = useState(false)

    const MENUS = [
        // {
        //     title: '오픈소스 라이선스',
        //     onPress: () => navigate('OpenSourceLicense')
        // },
        {
            title: `버전 ${deviceInfoModule.getVersion()} (${shouldUpdate ? '업데이트 가능' : '최신'})`,
            onPress: () => {
                if (!shouldUpdate) return
                inAppUpdates.startUpdate({ updateType: IS_ANDROID ? IAUUpdateKind.FLEXIBLE : undefined })
            },
            onLongPress: async () => {
                const data = await CodePush.getUpdateMetadata()
                toast({ content: data?.label || '오류' })
            }
        },
        {
            title: '이용약관',
            // icon: <Icon name='check-circle' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '서비스 이용약관', url: 'https://38do.kr/agreement' })
        },
        {
            title: '개인정보 처리방침',
            // icon: <Icon name='verified-user' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '개인정보 처리방침', url: 'https://38do.kr/privacy-policy' })
        },
        {
            title: '위치기반 서비스 이용약관',
            // icon: <Icon name='my-location' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '위치기반 서비스 이용약관', url: 'https://38do.kr/agreement-location' })
        },
        {
            title: '로그아웃',
            onPress: () => {
                confirm({
                    title: '로그아웃',
                    content: '정말 로그아웃 하시겠습니까?',
                    onPress: async (isYes) => {
                        if (!isYes) return
                        await logout()
                        reset({ index: 0, routes: [{ name: 'Tab' }] })
                    }
                })
            }
        },
        {
            title: '탈퇴하기',
            onPress: () => navigate('Withdraw')
        },
    ]
    if (!user) MENUS.length = 4// 미 로그인시 로그아웃, 탈퇴하기 기능은 제공하지 않음

    useEffect(() => {
        (async () => {
            const result = await inAppUpdates.checkNeedsUpdate({ curVersion: deviceInfoModule.getVersion() })
            setShouldUpdate(result.shouldUpdate)
        })()
    }, [])


    return (
        <ScreenLayout>
            <Header title='설정' />
            <View>
                {MENUS.map(({ onPress, title, onLongPress }) => (
                    <Pressable
                        key={title}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        android_ripple={{ color: GRAY2 }}
                        style={styles.menuContainer}
                    >
                        <Text>{title}</Text>
                    </Pressable>
                ))}
            </View>
            <View style={[styles.companyInfoContainer, { bottom }]} >
                <Text style={styles.companyName} >딥스펀지 주식회사</Text>
                <Text selectable style={styles.companyInfo} >{'대표이사 홍성욱 | 사업자등록번호 286-86-01500\n서울특별시 강남구 봉은사로 129-1(논현동, 751빌딩 7층 702-MS17호)\n고객센터 | 070-7637-8881'}</Text>
            </View>
        </ScreenLayout>
    )
}

export default Settings

const styles = StyleSheet.create({
    menuContainer: {
        width: '100%',
        height: 56,
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    companyInfoContainer: {
        position: 'absolute',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    companyName: {
        color: GRAY2,
        fontWeight: 'bold',
        marginBottom: 8
    },
    companyInfo: {
        color: GRAY2,
        fontSize: 10,
        lineHeight: 14
    }
})