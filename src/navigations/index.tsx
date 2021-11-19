import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import React from 'react';

import { HomeTabParamList, TabParamList } from './RootTabNavigation';
import RootStackNavigation, { RootStackParamList } from './RootStackNavigation';
import LoginStackNavigation, { LoginStackParamList } from './LoginStackNavigation';


export type NavigationParamList = RootStackParamList & TabParamList & HomeTabParamList & LoginStackParamList

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
}


const Navigation = () => {

    return (
        <NavigationContainer theme={theme}>
            {true ? <LoginStackNavigation /> : <RootStackNavigation />}
        </NavigationContainer>
    )
}

export default Navigation