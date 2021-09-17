// GLOBAL UI
import Alert, { AlertProps } from '../components/bottomSheets/Alert';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Confirm, { ConfirmProps } from '../components/bottomSheets/Confirm';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { NavigationState } from '@react-navigation/routers'
import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import Toast, { ToastProps } from '../components/toasts/Toast';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import Chat from './Chat';
import ChatDetail from './ChatDetail';
import Home from './Home'
import Login from './Login';
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
import { IS_ANDROID, IS_IOS } from '../constants/values';
import PushNotification, { Importance } from 'react-native-push-notification';
import { useIUser, useUpdateFcmToken } from '../graphql/user';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notificationIdGenerator from '../utils/notificationIdGenerator';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

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

// messaging().setBackgroundMessageHandler(async (message) => {
//     if (IS_IOS) return
//     const data: any = message.data
//     console.log("Background")
//     console.log(data)
//     if (data.type === 'chat') {
//         PushNotification.localNotification({
//             id: notificationIdGenerator(data.chatRoomId),
//             channelId: !!data.notificated ? 'chat' : 'chat_no_notificated',
//             title: data.title,
//             message: data.message,
//             largeIconUrl: data.image,
//             playSound: !!data.notificated,
//             subText: data.subText,
//             //@ts-ignore
//             data: data
//         })
//         PushNotification.setApplicationIconBadgeNumber(Number(data.notReadChatCount))
//     }
// })

export const AuthContext = createContext<{
    user: FirebaseAuthTypes.User | null
}>({} as any)

const Navigation = () => {

    const navigationRef = useRef<NavigationContainerRef>(null)
    const [navigationState, setNavigationState] = useState<NavigationState>()

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser)
    const [updateFcmToken, { loading: updateFcmLoading }] = useUpdateFcmToken()
    const { data } = useChatRoomUpdated({ variables: { userId: user?.uid || '' }, skip: !user })
    const { data: iUserData } = useIUser({ skip: !user })

    const authContextValue = useMemo(() => ({ user, setUser }), [user])

    useEffect(() => {
        const userUnsubscribe = auth().onUserChanged((user) => setUser(user))
        return () => { userUnsubscribe() }
    }, [])

    // 앱 액티브 상테에서 메시지 받았을때
    useEffect(() => {
        const currentRoute = navigationState?.routes[navigationState.routes.length - 1]

        const unsubscribe = messaging().onMessage(async (message: FirebaseMessagingTypes.RemoteMessage) => {
            console.log("ActivePush")
            console.log(message)
            if (!message.data) return
            //@ts-ignore
            if (currentRoute?.name === 'ChatDetail' && currentRoute?.params?.id === message.data.chatRoomId) return
            PushNotification.localNotification({
                // id: notificationIdGenerator(message.data.chatRoomId),
                channelId: !!message.data.notificated ? 'chat' : 'chat_no_notificated',
                title: message.data.title,
                message: message.data.message,
                subText: message.data.subText,
                largeIconUrl: message.data.image,
                playSound: !!message.data.notificated,
                group: message.data.chatRoomId,
                category: 'chat',
                //@ts-ignore
                data: message.data
            })
        })

        return unsubscribe
    }, [updateFcmLoading, navigationState])

    useEffect(() => {
        // Channel 생성 Android only
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
            (created) => { }
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
            (created) => { }
        )

        const backgroundNotificationHandler = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            const data = remoteMessage.data
            console.log("backgroundNotification")
            console.log(data)
            if (!data) return
            if (data.type === 'chat') {
                navigationRef.current?.navigate('ChatDetail', { id: data.chatRoomId })
            }
        }
        // 푸시를 눌러서 열었을때 IOS는 백그라운드, QUIT상태 둘다 onNotificationOpendApp이 작동함
        // 안드로이드는 백그라운드 상태에서만 onNotificationOpendApp이 작동해서 푸시 눌러서 앱 초기 실행할때는 messaging().getInitialNotification() 로 처리해주세요
        messaging().onNotificationOpenedApp(backgroundNotificationHandler)
        // android quit push listner
        // Android Only ios는 언제나 null
        // 트리거 형식이라 한번만 작동함
        messaging().getInitialNotification().then((remoteMessage) => remoteMessage ? backgroundNotificationHandler(remoteMessage) : null)

    }, [])

    // fcm token listner
    useEffect(() => {
        if (!user) return
        const fcmInit = async () => {
            await messaging().requestPermission()
            const token = await messaging().getToken()
            await updateFcmToken({ variables: { token } })
        }

        const fcmRefresh = async (token: string) => {
            await updateFcmToken({ variables: { token } })
        }

        fcmInit()
        return messaging().onTokenRefresh(fcmRefresh)
    }, [user])

    useEffect(() => {
        // 않읽은 메시지 수 앱 뱃지와 동기화
        if (!iUserData) return
        PushNotification.setApplicationIconBadgeNumber(Number(iUserData.iUser.notReadChatCount))
    }, [iUserData])


    return (
        <AuthContext.Provider value={authContextValue} >
            <NavigationContainer
                ref={navigationRef}
                onStateChange={(v) => setNavigationState(v)}
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