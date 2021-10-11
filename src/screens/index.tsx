// GLOBAL UI
import Alert, { AlertProps } from '../components/bottomSheets/Alert';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Confirm, { ConfirmProps } from '../components/bottomSheets/Confirm';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, Theme } from '@react-navigation/native';
import { NavigationState } from '@react-navigation/routers'
import React, { createContext, MutableRefObject, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Toast, { ToastProps } from '../components/toasts/Toast';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import analytics from '@react-native-firebase/analytics';

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
import Select, { SelectProps } from '../components/bottomSheets/Select';
import UserCertification from './UserCertification';
import ImageDetail from './ImageDetail';
import PetDetail from './PetDetail';
import Report from './Report';
import { useApolloClient } from '@apollo/client';
import { IS_UPDATE_REQUIRE } from '../graphql/util';
import { isUpdateRequire, isUpdateRequireVariables } from '../graphql/__generated__/isUpdateRequire';
import deviceInfoModule from 'react-native-device-info';
import SpInAppUpdates, { AndroidUpdateType, IAUUpdateKind } from 'sp-react-native-in-app-updates';
import { APPSTORE_ID, IS_ANDROID, IS_IOS, IS_RATED, PLAYSTORE_PACKAGE_NAME, RATE_OPEN_TIMES_KEY, RATE_PERIOD } from '../constants/values';
import PushNotification, { Importance } from 'react-native-push-notification';
import { IS_SIGNEDUP, useIUser, useUpdateFcmToken } from '../graphql/user';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import useAppState from '../hooks/useAppState';
import Post from './Post';
import PostCreate from './PostCreate';
import PostDetail from './PostDetail';
import PostCommentDetail from './PostCommentDetail';
import PostEdit from './PostEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalUi from '../hooks/useGlobalUi';
import Rate from 'react-native-rate';
import { isSignedup } from '../graphql/__generated__/isSignedup';
import useAuth from '../hooks/useAuth';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Post'
            tabBar={() => null}
        >
            <Tab.Screen name='Post' component={Post} />
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
    const routeNameRef = useRef<string>('')

    const [navigationState, setNavigationState] = useState<NavigationState>()
    const { confirm } = useGlobalUi()

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser)
    const [updateFcmToken, { loading: updateFcmLoading }] = useUpdateFcmToken()
    const { } = useChatRoomUpdated({ variables: { userId: user?.uid || '' }, skip: !user })
    const { appState } = useAppState()

    const { query } = useApolloClient()
    const { logout } = useAuth()

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
            if (IS_IOS) {
                PushNotificationIOS.addNotificationRequest({
                    id: message.data.chatId,
                    threadId: message.data.chatRoomId,
                    title: message.data.title,
                    body: message.data.message,
                    sound: message.data.notificated ? 'true' : undefined,
                    category: 'chat',
                    userInfo: { ...message.data, image: undefined }
                })
            } else {
                PushNotification.localNotification({
                    id: 0,
                    channelId: !!message.data.notificated ? 'chat' : 'chat_no_notificated',
                    title: message.data.title,
                    message: message.data.message,
                    subText: message.data.subText,
                    smallIcon: "ic_notification",
                    largeIconUrl: message.data.image,
                    tag: message.data.chatRoomId,
                    priority: "high",
                    groupSummary: true,
                    //@ts-ignore
                    data: message.data,
                })
            }
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
            console.log(remoteMessage)
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


        // Android Active 상태에서 온 메시지 클릭시
        if (IS_IOS) {
            // IOS Active 상태에서 온 메시지 클릭시
            PushNotificationIOS.addEventListener('localNotification', (notification) => {
                const actionIdentifier = notification.getActionIdentifier()
                const notificationData = notification.getData()

                console.log("IOS:LOCAL NOTIFICATION")
                console.log(notificationData)
                // 클릭에 해당하는 이벤트 인지 확인
                if (actionIdentifier !== 'com.apple.UNNotificationDefaultActionIdentifier') return

                if (notificationData.type === 'chat') {
                    navigationRef.current?.navigate('ChatDetail', { id: notificationData.chatRoomId })
                }
            })

        } else {
            PushNotification.configure({
                onNotification: (notification) => {
                    if (notification.userInteraction) { // 클릭일때
                        console.log("Active Click")
                        console.log(notification)
                        if (notification.data.type === 'chat') {
                            navigationRef.current?.navigate('ChatDetail', { id: notification.data.chatRoomId })
                        }
                    }
                }
            })
        }
    }, [])

    useEffect(() => {
        // 뱃지 초기화
        PushNotification.setApplicationIconBadgeNumber(0)
    }, [appState])

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
        // 회원가입 안되있을시 파이어베이스 로그아웃
        (async () => {
            if (!auth().currentUser) return // 파이어베이스 로그인이 안되어있다면 이 프로세스와는 무관함
            const { data } = await query<isSignedup, {}>({ query: IS_SIGNEDUP, fetchPolicy: 'network-only' })
            if (!data.isSignedup) {
                await logout()
                navigationRef.current?.reset({ index: 0, routes: [{ name: 'Tab' }] })
            }
        })()

    }, [])

    // 평가요청
    const onRate = useCallback(async () => {
        const openTimes = Number(await AsyncStorage.getItem(RATE_OPEN_TIMES_KEY) || 0)
        const isRated = !!(await AsyncStorage.getItem(IS_RATED))

        await AsyncStorage.setItem(RATE_OPEN_TIMES_KEY, (openTimes + 1).toString())
        if (isRated) return

        if (openTimes !== 0 && openTimes % RATE_PERIOD === 0) {
            confirm({
                title: '평가남기기',
                content: '평가는 개발자에게 힘이 됩니다!',
                noText: '다음에',
                yesText: '지금',
                onPress: (isYes) => {
                    if (!isYes) return
                    Rate.rate({
                        AppleAppID: APPSTORE_ID,
                        GooglePackageName: PLAYSTORE_PACKAGE_NAME,
                        preferInApp: true,
                        openAppStoreIfInAppFails: true
                    }, async (success) => {
                        if (success) await AsyncStorage.setItem(IS_RATED, JSON.stringify(true))
                    })
                }
            })
        }
    }, [])

    useEffect(() => { onRate() }, [])


    return (
        <AuthContext.Provider value={authContextValue} >
            <NavigationContainer
                ref={navigationRef}
                onReady={() => { // navigation GA log
                    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name || ''
                }}
                onStateChange={async (v) => {
                    setNavigationState(v)

                    // navigation GA log
                    const previousRouteName = routeNameRef.current
                    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name || ''

                    if (previousRouteName !== currentRouteName) {
                        await analytics().logScreenView({
                            screen_name: currentRouteName,
                            screen_class: currentRouteName,
                        })
                    }
                    routeNameRef.current = currentRouteName;
                }}
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
                    <Stack.Screen name='PostCreate' component={PostCreate} />
                    <Stack.Screen name='PostDetail' component={PostDetail} />
                    <Stack.Screen name='PostCommentDetail' component={PostCommentDetail} />
                    <Stack.Screen name='PostEdit' component={PostEdit} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export type GlobalAlertProps = Omit<AlertProps, 'onClose'>
export type GlobalConfirmProps = Omit<ConfirmProps, 'onClose'>
export type GlobalToastProps = ToastProps
export type GlobalSelectProps = Omit<SelectProps, 'onClose'>

export type GlobalUiContextType = {
    alert: GlobalAlertProps,
    setAlert: (p: GlobalAlertProps) => void
    confirm: GlobalConfirmProps
    setConfirm: (p: GlobalConfirmProps) => void
    toast: GlobalToastProps
    setToast: (p: GlobalToastProps) => void
    select: GlobalSelectProps
    setSelect: (p: GlobalSelectProps) => void
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

    const [select, setSelect] = useState<GlobalSelectProps>({
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
        select,
        setSelect
    }), [alert, setAlert, confirm, setConfirm, toast, setToast, select, setSelect])


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
                    <Select
                        {...select}
                        onClose={() => setSelect(v => ({ ...v, visible: false }))}
                    />
                </BottomSheetModalProvider>
            </GlobalUIContext.Provider>
        </>
    )
}

export default GlobalUiWrapper