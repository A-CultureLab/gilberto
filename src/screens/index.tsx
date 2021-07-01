import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native'
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMA from 'react-native-vector-icons/MaterialIcons'
import TabNavigationTabBar from '../components/tabs/TabNavigationTabBar';

// GLOBAL UI


// SCREENS
import Home from './Home'






const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Test = () => {
    return <View>

    </View>
}


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            // tabBar={(props) => <TabNavigationTabBar {...props} />}
            tabBar={() => null}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: '장소',
                    tabBarIcon: (({ color }) => <IconMA size={24} name='location-on' color={color} />)
                }}
            />
            <Tab.Screen
                name='Friend'
                component={Test}
                options={{
                    tabBarLabel: '친구만들기',
                    tabBarIcon: (({ color }) => <IconMA size={24} name='language' color={color} />)
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Test}
                options={{
                    tabBarLabel: '채팅',
                    tabBarIcon: (({ color }) => <IconMA size={24} name='chat' color={color} />)
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