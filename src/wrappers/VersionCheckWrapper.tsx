import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import deviceInfoModule from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import { IS_ANDROID } from '../constants/values';
import { IS_UPDATE_REQUIRE } from '../graphql/util';
import { isUpdateRequire, isUpdateRequireVariables } from '../graphql/__generated__/isUpdateRequire';

const VersionCheckWrapper: React.FC = ({ children }) => {

    const { query } = useApolloClient()

    useEffect(() => {
        // splash 숨기기
        setTimeout(() => {
            SplashScreen.hide()
        }, 750);

        // 버전 체크
        (async () => {
            const { data } = await query<isUpdateRequire, isUpdateRequireVariables>({
                query: IS_UPDATE_REQUIRE,
                variables: { version: deviceInfoModule.getVersion() }
            })
            console.log("isUpdateRequire : " + data.isUpdateRequire)
            if (data.isUpdateRequire) {
                const inAppUpdates = new SpInAppUpdates(__DEV__)
                await inAppUpdates.startUpdate({
                    updateType: IS_ANDROID ? IAUUpdateKind.IMMEDIATE : undefined
                })
            }
        })()
    }, [])

    return <>{children}</>
}

export default VersionCheckWrapper

const styles = StyleSheet.create({})
