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
import stringHash from 'string-hash'

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
import Report from './Report';
import { useApolloClient } from '@apollo/client';
import { IS_UPDATE_REQUIRE } from '../graphql/util';
import { isUpdateRequire, isUpdateRequireVariables } from '../graphql/__generated__/isUpdateRequire';
import deviceInfoModule from 'react-native-device-info';
import SpInAppUpdates, { AndroidUpdateType, IAUUpdateKind } from 'sp-react-native-in-app-updates';
import { IS_ANDROID } from '../constants/values';
import PushNotification, { Importance } from 'react-native-push-notification';
import { useUpdateFcmToken } from '../graphql/user';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notificationIdGenerator from '../utils/notificationIdGenerator';

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

    const navigationRef = useRef<NavigationContainerRef>(null)

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser)

    const [updateFcmToken] = useUpdateFcmToken()
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

    useEffect(() => {
        PushNotification.createChannel(
            {
                channelId: "chat",
                channelName: "채팅",
                channelDescription: "채팅에 사용되는 채널입니다",
                playSound: true,
                soundName: "default",
                importance: Importance.HIGH,
                vibrate: true,
            },
            (created) => console.log(`createChannel returned '${created}'`)
        )

        PushNotification.createChannel(
            {
                channelId: "chat_no_notificated",
                channelName: "무음 채팅",
                channelDescription: "무음 채팅에 사용되는 채널입니다",
                playSound: false,
                importance: Importance.LOW,
                vibrate: false
            },
            (created) => console.log(`createChannel returned '${created}'`)
        )

        PushNotification.configure({
            onRegister: ({ token }) => updateFcmToken({ variables: { token } }),
            onAction: ({ data }) => {
                console.log(data)
                if (!data) return
                if (data.type === 'chat') {
                    console.log(data.chatRoomId)
                    navigationRef.current?.navigate('ChatDetail', { id: data.chatRoomId })
                }
            },
            onNotification: (notification) => {
                if (notification.data.type === 'chat') {
                    console.log(notification.data)
                    PushNotification.localNotification({
                        id: notificationIdGenerator(notification.data.chatRoomId),
                        channelId: !!notification.data.notificated ? 'chat' : 'chat_no_notificated',
                        title: notification.data.title,
                        message: notification.data.message,
                        largeIconUrl: notification.data.image,
                        playSound: !!notification.data.notificated,
                    })
                }

                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
        })
    }, [user])


    return (
        <AuthContext.Provider value={authContextValue} >
            <NavigationContainer
                ref={navigationRef}
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
                    <Stack.Screen name='Report' component={Report} />
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

    const { query } = useApolloClient()

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
        // splash 숨기기
        setTimeout(() => {
            SplashScreen.hide()
        }, 750);

        // 버전 체크
        (async () => {
            const { data } = await query<isUpdateRequire, isUpdateRequireVariables>({
                query: IS_UPDATE_REQUIRE,
                variables: { version: deviceInfoModule.getVersion() }
            })
            console.log("isUpdateRequire : " + data.isUpdateRequire)
            if (data.isUpdateRequire) {
                const inAppUpdates = new SpInAppUpdates(__DEV__)
                await inAppUpdates.startUpdate({
                    updateType: IS_ANDROID ? IAUUpdateKind.IMMEDIATE : undefined,
                })
            }
        })()
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