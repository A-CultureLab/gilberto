import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { BottomSheetModalProvider, useBottomSheet } from '@gorhom/bottom-sheet'

// GLOBAL UI
import Alert, { AlertProps } from '../components/bottomSheets/Alert';
import Confirm, { ConfirmProps } from '../components/bottomSheets/Confirm';
import Toast, { ToastProps } from '../components/toasts/Toast';


// SCREENS
import Home from './Home'
import Login from './Login';
import Signup from './Signup';
import SelectLocation from './SelectLocation';
import SignupPet from './SignupPet';
import WebView from './WebView';
import PetRegist from './PetRegist';
import PetModify from './PetModify';
import MyPage from './MyPage';
import Profile from './Profile';
import ProfileModify from './ProfileModify';
import Setting from './Setting';
import OpenSourceLicense from './OpenSourceLicense';
import Withdraw from './Withdraw';






const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
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
                component={Home}
                options={{
                    tabBarLabel: '친구만들기',
                    tabBarIcon: (({ color }) => <IconMA size={24} name='language' color={color} />)
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Home}
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
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='SelectLocation' component={SelectLocation} />
                <Stack.Screen name='WebView' component={WebView} />
                <Stack.Screen name='SignupPet' component={SignupPet} />
                <Stack.Screen name='PetRegist' component={PetRegist} />
                <Stack.Screen name='PetModify' component={PetModify} />
                <Stack.Screen name='MyPage' component={MyPage} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='ProfileModify' component={ProfileModify} />
                <Stack.Screen name='Setting' component={Setting} />
                <Stack.Screen name='OpenSourceLicense' component={OpenSourceLicense} />
                <Stack.Screen name='Withdraw' component={Withdraw} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export type GlobalAlertProps = Omit<AlertProps, 'onClose'>
export type GlobalConfirmProps = Omit<ConfirmProps, 'onClose'>
export type GlobalToastProps = ToastProps

export const GlobalUIContext = createContext<{
    alert: GlobalAlertProps,
    setAlert: (p: GlobalAlertProps) => void
    confirm: GlobalConfirmProps
    setConfirm: (p: GlobalConfirmProps) => void
    toast: GlobalToastProps
    setToast: (p: GlobalToastProps) => void
}>({} as any)


const GlobalUiWrapper = () => {

    const [alert, setAlert] = useState<GlobalAlertProps>({
        visible: false,
        content: '',
        title: '',
        buttonText: undefined
    })
    const [confirm, setConfirm] = useState<GlobalConfirmProps>({
        visible: false,
        title: '',
        content: ''
    })
    const [toast, setToast] = useState<GlobalToastProps>({
        visible: false,
        content: ''
    })

    const contextValue = useMemo(() => ({
        alert,
        setAlert,
        confirm,
        setConfirm,
        toast,
        setToast
    }), [alert])


    return (
        <>
            <GlobalUIContext.Provider value={contextValue} >
                <BottomSheetModalProvider>
                    <Navigation />
                    <Alert
                        {...alert}
                        onClose={() => setAlert(v => ({ ...v, visible: false }))}
                    />
                    <Confirm
                        {...confirm}
                        onClose={() => setConfirm(v => ({ ...v, visible: false }))}
                    />
                    <Toast
                        {...toast}
                    />
                </BottomSheetModalProvider>
            </GlobalUIContext.Provider>
        </>
    )
}

export default GlobalUiWrapper