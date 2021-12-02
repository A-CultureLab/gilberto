import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import React, { useContext } from 'react';

import { HomeTabParamList, TabParamList } from './RootTabNavigation';
import RootStackNavigation, { RootStackParamList } from './RootStackNavigation';
import LoginStackNavigation, { LoginStackParamList } from './LoginStackNavigation';
import { AuthContext } from '../wrappers/AuthWrapper';


export type NavigationParamList = RootStackParamList & TabParamList & HomeTabParamList & LoginStackParamList

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
}


const Navigation = () => {

    const { accessToken, refreshTokenLoading } = useContext(AuthContext)

    if (refreshTokenLoading) return null

    return (
        <NavigationContainer theme={theme}>
            {!accessToken ? <LoginStackNavigation /> : <RootStackNavigation />}
        </NavigationContainer>
    )
}

export default Navigation