import React, { useEffect } from 'react'
import { useChatRoomUpdated } from '../graphql/chatRoom'
import { IS_IOS } from '../constants/values';
import PushNotification, { Importance } from 'react-native-push-notification';
import { useIUser, useUpdateFcmToken } from '../graphql/user';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import useAppState from '../hooks/useAppState';
import { useNavigationState } from '@react-navigation/core';
import useNavigation from '../hooks/useNavigation';
import { NavigationParamList } from '../navigations';

const FCMWrapper: React.FC = ({ children }) => {

    const [updateFcmToken, { loading: updateFcmLoading }] = useUpdateFcmToken()
    const { appState } = useAppState()
    const { data: iUserData } = useIUser()
    const { } = useChatRoomUpdated({ variables: { userId: iUserData?.iUser.id || '' }, skip: !iUserData })
    const currentRoute = useNavigationState<NavigationParamList, keyof NavigationParamList>(state => state.routeNames[state.routeNames.length - 1])
    const { navigate } = useNavigation()

    // 앱 액티브 상테에서 메시지 받았을때
    useEffect(() => {

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
    }, [updateFcmLoading, currentRoute])

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
                navigate('ChatDetail', { id: data.chatRoomId })
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
                    navigate('ChatDetail', { id: notificationData.chatRoomId })
                }
            })

        } else {
            PushNotification.configure({
                onNotification: (notification) => {
                    if (notification.userInteraction) { // 클릭일때
                        console.log("Active Click")
                        console.log(notification)
                        if (notification.data.type === 'chat') {
                            navigate('ChatDetail', { id: notification.data.chatRoomId })
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
    }, [])



    return <>{children}</>
}

export default FCMWrapper