import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider, useBottomSheet } from '@gorhom/bottom-sheet'
import SplashScreen from 'react-native-splash-screen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

// GLOBAL UI
import Alert, { AlertProps } from '../components/bottomSheets/Alert';
import Confirm, { ConfirmProps } from '../components/bottomSheets/Confirm';
import Toast, { ToastProps } from '../components/toasts/Toast';


// SCREENS
import Home from './Home'
import Friend from './Friend';
import Chat from './Chat';

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
import UserDetail from './UserDetail';
import ChatDetail from './ChatDetail';
import { wsClient } from '../lib/apollo';
import { MessageTypes } from 'subscriptions-transport-ws';
import { useChatCreated } from '../graphql/chat';




const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={() => null}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Friend' component={Friend} />
            <Tab.Screen name='Chat' component={Chat} />
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

export const AuthContext = createContext<{
    user: FirebaseAuthTypes.User | null
}>({} as any)

const Navigation = () => {

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser)
    const { } = useChatCreated()

    const authContextValue = useMemo(() => ({
        user, setUser
    }), [user])

    useEffect(() => {
        const userUnsubscribe = auth().onUserChanged((user) => {
            setUser(user)
        })
        const tokenUnsubscribe = auth().onIdTokenChanged(async (user) => {
            const operations = Object.assign({}, wsClient.operations)
            wsClient.close(true)
            Object.keys(operations).forEach(id => {
                //@ts-ignore
                wsClient.executeOperation(operations[id].options, () => { })
            })
        })
        return () => {
            userUnsubscribe()
            tokenUnsubscribe()
        }
    }, [])


    return (
        <AuthContext.Provider value={authContextValue} >
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
                    <Stack.Screen name='UserDetail' component={UserDetail} />
                    <Stack.Screen name='ChatDetail' component={ChatDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
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
    }), [alert, confirm, toast])


    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide()
        }, 500)
    }, [])


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