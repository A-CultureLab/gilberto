import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMA from 'react-native-vector-icons/MaterialIcons'
import TabNavigationTabBar from '../components/tabs/TabNavigationTabBar';
import { BottomSheetModalProvider, useBottomSheet } from '@gorhom/bottom-sheet'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// GLOBAL UI


// SCREENS
import Home from './Home'
import BottomSheet from '../components/bottomSheets/DefaultBottomSheet';
import { HEIGHT, WIDTH } from '../constants/styles';
import Alert from '../components/bottomSheets/Alert';
import Confirm from '../components/bottomSheets/Confirm';
import SelectBottomSheet from '../components/selectors/SelectBottomSheet';
import Header from '../components/headers/Header';
import ScreenLayout from '../components/layout/ScreenLayout';
import Toast from '../components/toasts/Toast';
import Toggle from '../components/toggles/Toggle';
import Loading from '../components/loadings/Loading';
import ScrollSelector from '../components/selectors/ScrollSelector';






const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Test = () => {

    const [visible, setVisible] = useState(false)
    return <ScreenLayout>
        <Header
            title='테스트'
            backBtn='left'
        />
        <Pressable onPress={() => setVisible(!visible)} style={{ width: 100, height: 100, backgroundColor: 'red' }} ><Text>Button</Text></Pressable>
        <View style={{ alignSelf: 'center' }} >
            <Toggle initValue={true} />
            <View style={{ height: 100 }} />
            <Loading />
            <View style={{ height: 100 }} />
            <ScrollSelector
                list={Array(100).fill(0).map((_, i) => i.toString())}
                initIndex={56}
                infinityScroll
                onChange={(i) => console.log(i)}
            />
        </View>
        <Toast
            visible={visible}
            content='나이를 입력해주세요'
        />
    </ScreenLayout>
}


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Friend'
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
            <BottomSheetModalProvider>
                <Navigation />
            </BottomSheetModalProvider>
        </>
    )
}

export default NavigationWrapper