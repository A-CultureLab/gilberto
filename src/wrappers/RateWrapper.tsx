import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect } from 'react'
import Rate from 'react-native-rate'
import { APPSTORE_ID, IS_RATED, PLAYSTORE_PACKAGE_NAME, RATE_OPEN_TIMES_KEY, RATE_PERIOD } from '../constants/values'
import useGlobalUi from '../hooks/useGlobalUi'

const RateWrapper: React.FC = ({ children }) => {

    const { confirm } = useGlobalUi()

    // 평가요청
    const onRate = useCallback(async () => {
        const openTimes = Number(await AsyncStorage.getItem(RATE_OPEN_TIMES_KEY) || 0)
        const isRated = !!(await AsyncStorage.getItem(IS_RATED))

        await AsyncStorage.setItem(RATE_OPEN_TIMES_KEY, (openTimes + 1).toString())
        if (isRated) return

        if (openTimes !== 0 && openTimes % RATE_PERIOD === 0) {
            confirm({
                title: '평가남기기',
                content: '평가는 개발자에게 힘이 됩니다!',
                noText: '다음에',
                yesText: '지금',
                onPress: (isYes) => {
                    if (!isYes) return
                    Rate.rate({
                        AppleAppID: APPSTORE_ID,
                        GooglePackageName: PLAYSTORE_PACKAGE_NAME,
                        preferInApp: true,
                        openAppStoreIfInAppFails: true
                    }, async (success) => {
                        if (success) await AsyncStorage.setItem(IS_RATED, JSON.stringify(true))
                    })
                }
            })
        }
    }, [])

    useEffect(() => { onRate() }, [])

    return <>{children}</>
}

export default RateWrapper
