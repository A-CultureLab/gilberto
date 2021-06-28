import React, { useEffect, useRef, useState } from 'react';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigationTabBar from '../components/tabs/TabNavigationTabBar';

// GLOBAL UI


// SCREENS
import HomeScreen from './HomeScreen'






const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={(props) => <TabNavigationTabBar {...props} />}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: '장소',
                    tabBarIcon: (({ color }) => <Icon size={24} name='location' color={color} />)
                }}
            />
        </Tab.Navigator>
    )
}

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
}


const Navigation = () => {

    return (
        <NavigationContainer
            theme={theme}
        >
            <Stack.Navigator
                initialRouteName='Tab'
                headerMode='none'
                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            >
                <Stack.Screen name='Tab' component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const NavigationWrapper = () => {
    return (
        <>
            <Navigation />
        </>
    )
}

export default NavigationWrapper