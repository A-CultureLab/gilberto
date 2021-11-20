import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { Gender } from "../../__generated__/globalTypes"
import Login from "../screens/Login"
import { SelectLocationProps } from "../screens/SelectLocation"
import { WebViewProps } from "../screens/WebView"
import ScreenAnalyticsWrapper from '../wrappers/ScreenAnalyticsWrapper'
import SignupPhoneVerify from '../screens/SignupPhoneVerify'
import SignupPassword from '../screens/SignupPassword'

export type LoginStackParamList = {
    Login: undefined
    SignupPhoneVerify: undefined
    SignupPassword: { phoneVerifySuccessToken: string }
    SignupRequireInfo: { phoneVerifySuccessToken: string, password: string }
    SignupOptionalInfo: { phoneVerifySuccessToken: string, password: string, image: string, profileId: string, gender: Gender, birth: Date, adressId: string, agreementDate: Date, marketingPushDate: Date }
    SignupInflow: { phoneVerifySuccessToken: string, password: string, image: string, profileId: string, gender: Gender, birth: Date, adressId: string, agreementDate: Date, marketingPushDate: Date, instagramId: string, introduce: string }
    FindPasswordPhoneVerify: undefined
    FindPassword: { phoneVerifySuccessToken: string }
    WebView: WebViewProps
    SelectLocation: SelectLocationProps
}


const LoginStack = createStackNavigator<LoginStackParamList>()

const LoginStackNavigation = () => {
    return (
        <LoginStack.Navigator
            initialRouteName='SignupPassword'
            screenOptions={{
                header: () => <ScreenAnalyticsWrapper />,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <LoginStack.Screen component={Login} name='Login' />
            <LoginStack.Screen component={SignupPhoneVerify} name='SignupPhoneVerify' />
            <LoginStack.Screen component={SignupPassword} name='SignupPassword' />
            <LoginStack.Screen component={Login} name='SignupRequireInfo' />
            <LoginStack.Screen component={Login} name='SignupOptionalInfo' />
            <LoginStack.Screen component={Login} name='SignupInflow' />
            <LoginStack.Screen component={Login} name='FindPasswordPhoneVerify' />
            <LoginStack.Screen component={Login} name='FindPassword' />
            <LoginStack.Screen component={Login} name='WebView' />
            <LoginStack.Screen component={Login} name='SelectLocation' />
        </LoginStack.Navigator>
    )
}


export default LoginStackNavigation