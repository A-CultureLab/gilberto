// GLOBAL UI
import Alert, { AlertProps } from '../components/bottomSheets/Alert';
import { BottomSheetModalProvider, useBottomSheet } from '@gorhom/bottom-sheet'
import { CHAT_CREATED, useChatCreated } from '../graphql/chat';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Confirm, { ConfirmProps } from '../components/bottomSheets/Confirm';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import Toast, { ToastProps } from '../components/toasts/Toast';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import Chat from './Chat';
import ChatDetail from './ChatDetail';
import Friend from './Friend';
import Home from './Home'
import Login from './Login';
import { MessageTypes } from 'subscriptions-transport-ws';
import MyPage from './MyPage';
import OpenSourceLicense from './OpenSourceLicense';
import PetModify from './PetModify';
import PetRegist from './PetRegist';
import Profile from './Profile';
import ProfileModify from './ProfileModify';
import SelectLocation from './SelectLocation';
import Settings from './Settings';
import Signup from './Signup';
import SignupPet from './SignupPet';
import SplashScreen from 'react-native-splash-screen';
import UserDetail from './UserDetail';
import WebView from './WebView';
import Withdraw from './Withdraw';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useChatRoomUpdated } from '../graphql/chatRoom';
import SelectBottomSheet, { SelectBottomSheetProps } from '../components/selectors/SelectBottomSheet';
import UserCertification from './UserCertification';
import ImageDetail from './ImageDetail';
import PetDetail from './PetDetail';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={() => null}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Chat' component={Chat} />
            <Tab.Screen name='MyPage' component={MyPage} />
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
    const { } = useChatRoomUpdated({ variables: { userId: user?.uid || '' }, skip: !user })

    const authContextValue = useMemo(() => ({
        user, setUser
    }), [user])

    useEffect(() => {
        const userUnsubscribe = auth().onUserChanged((user) => {
            setUser(user)
        })
        return () => {
            userUnsubscribe()
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
                    screenOptions={({ navigation }) => {
                        return {
                            detachPreviousScreen: !navigation.isFocused(),
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        }
                    }}
                >
                    <Stack.Screen name='Tab' component={TabNavigation} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Signup' component={Signup} />
                    <Stack.Screen name='SelectLocation' component={SelectLocation} />
                    <Stack.Screen name='WebView' component={WebView} />
                    <Stack.Screen name='SignupPet' component={SignupPet} />
                    <Stack.Screen name='PetRegist' component={PetRegist} />
                    <Stack.Screen name='PetModify' component={PetModify} />
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='ProfileModify' component={ProfileModify} />
                    <Stack.Screen name='Settings' component={Settings} />
                    <Stack.Screen name='OpenSourceLicense' component={OpenSourceLicense} />
                    <Stack.Screen name='Withdraw' component={Withdraw} />
                    <Stack.Screen name='PetDetail' component={PetDetail} />
                    <Stack.Screen name='UserDetail' component={UserDetail} />
                    <Stack.Screen name='ChatDetail' component={ChatDetail} />
                    <Stack.Screen name='UserCertification' component={UserCertification} />
                    <Stack.Screen name='ImageDetail' component={ImageDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export type GlobalAlertProps = Omit<AlertProps, 'onClose'>
export type GlobalConfirmProps = Omit<ConfirmProps, 'onClose'>
export type GlobalToastProps = ToastProps
export type GlobalSelectBottomSheetProps = Omit<SelectBottomSheetProps, 'onClose'>

export type GlobalUiContextType = {
    alert: GlobalAlertProps,
    setAlert: (p: GlobalAlertProps) => void
    confirm: GlobalConfirmProps
    setConfirm: (p: GlobalConfirmProps) => void
    toast: GlobalToastProps
    setToast: (p: GlobalToastProps) => void
    selector: GlobalSelectBottomSheetProps
    setSelector: (p: GlobalSelectBottomSheetProps) => void
}

export const GlobalUIContext = createContext<GlobalUiContextType>({} as any)


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

    const [selector, setSelector] = useState<GlobalSelectBottomSheetProps>({
        visible: false,
        list: [],
        onSelect: () => { },
        selectedDataIndex: undefined,
        closeToSelect: false
    })


    const contextValue = useMemo<GlobalUiContextType>(() => ({
        alert,
        setAlert,
        confirm,
        setConfirm,
        toast,
        setToast,
        selector,
        setSelector
    }), [alert, setAlert, confirm, setConfirm, toast, setToast, selector, setSelector])


    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide()
        }, 750)
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
                    <SelectBottomSheet
                        {...selector}
                        onClose={() => setSelector(v => ({ ...v, visible: false }))}
                    />
                </BottomSheetModalProvider>
            </GlobalUIContext.Provider>
        </>
    )
}

export default GlobalUiWrapper