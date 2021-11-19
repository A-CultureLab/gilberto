import React, { useEffect } from 'react'
import analytics from '@react-native-firebase/analytics';
import { useNavigationState } from '@react-navigation/core';
import { NavigationParamList } from '../navigations';


const ScreenAnalyticsWrapper: React.FC = ({ children }) => {

    const currentRoute = useNavigationState<NavigationParamList, keyof NavigationParamList>(state => state.routeNames[state.routeNames.length - 1])

    useEffect(() => {
        analytics().logScreenView({
            screen_name: currentRoute,
            screen_class: currentRoute,
        })
    }, [currentRoute])

    return <>{children}</>
}

export default ScreenAnalyticsWrapper