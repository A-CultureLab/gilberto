import React, { useEffect } from 'react'
import { useIUser } from '../graphql/user'
// @ts-ignore
import { ChannelIO } from 'react-native-channel-plugin';
import { CHANNEL_IO_PLUGIN_KEY } from '../constants/values';
import { useNavigationState } from '@react-navigation/core';
import { NavigationParamList } from '../navigations';

const ChannelIOWrapper: React.FC = ({ children }) => {


    const { data: iUserData } = useIUser()
    const currentRoute = useNavigationState<NavigationParamList, keyof NavigationParamList>(state => state.routeNames[state.routeNames.length - 1])


    useEffect(() => {
        // 채널톡 생성
        ChannelIO.boot({
            pluginKey: CHANNEL_IO_PLUGIN_KEY,
            "channelButtonOption": {
                "xMargin": 16,
                "yMargin": 24 + 56,
                "position": 'right'
            },
            memberId: iUserData?.iUser.id,
            avatarUrl: iUserData?.iUser.image,
            profile: iUserData ? {
                name: iUserData.iUser.name,
            } : undefined
        }).then((res: any) => { /* console.log(res); */ ChannelIO.showChannelButton() })
    }, [iUserData])

    useEffect(() => {
        const CHANNEL_IO_SCREEN_NAMES = ['Post', 'Chat', 'MyPage']
        // 채널톡 활성화 시킬 스크린들
        if (CHANNEL_IO_SCREEN_NAMES.includes(currentRoute)) ChannelIO.showChannelButton()
        else ChannelIO.hideChannelButton()
    }, [currentRoute])


    return <>{children}</>
}

export default ChannelIOWrapper