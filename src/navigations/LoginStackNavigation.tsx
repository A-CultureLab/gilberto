import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { Gender } from "../../__generated__/globalTypes"
import Login from "../screens/Login"
import SelectLocation, { SelectLocationProps } from "../screens/SelectLocation"
import { WebViewProps } from "../screens/WebView"
import ScreenAnalyticsWrapper from '../wrappers/ScreenAnalyticsWrapper'
import SignupPhoneVerify from '../screens/SignupPhoneVerify'
import SignupPassword from '../screens/SignupPassword'
import SignupRequireInfo from '../screens/SignupRequireInfo'
import WebView from '../screens/WebView'
import SignupOptionalInfo from '../screens/SignupOptionalInfo'
import SignupInflow from '../screens/SignupInflow'
import FindPasswordPhoneVerify from '../screens/FindPasswordPhoneVerify'
import FindPassword from '../screens/FindPassword'

export type LoginStackParamList = {
    Login: undefined
    SignupPhoneVerify: undefined
    SignupPassword: { phoneVerifySuccessToken: string }
    SignupRequireInfo: { phoneVerifySuccessToken: string, password: string }
    SignupOptionalInfo: { phoneVerifySuccessToken: string, password: string, image: string | null, profileId: string, name: string, gender: Gender, birth: Date, addressId: string, agreementDate: Date, marketingPushDate: Date | null }
    SignupInflow: { phoneVerifySuccessToken: string, password: string, image: string | null, profileId: string, name: string, gender: Gender, birth: Date, addressId: string, agreementDate: Date, marketingPushDate: Date | null, instagramId: string | null, introduce: string }
    FindPasswordPhoneVerify: undefined
    FindPassword: { phoneVerifySuccessToken: string }
    WebView: WebViewProps
    SelectLocation: SelectLocationProps
}


const LoginStack = createStackNavigator<LoginStackParamList>()

const LoginStackNavigation = () => {
    return (
        <LoginStack.Navigator
            initialRouteName='Login'
            screenOptions={{
                header: () => <ScreenAnalyticsWrapper />,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <LoginStack.Screen component={Login} name='Login' />
            <LoginStack.Screen component={SignupPhoneVerify} name='SignupPhoneVerify' />
            <LoginStack.Screen component={SignupPassword} name='SignupPassword' />
            <LoginStack.Screen component={SignupRequireInfo} name='SignupRequireInfo' />
            <LoginStack.Screen component={SignupOptionalInfo} name='SignupOptionalInfo' />
            <LoginStack.Screen component={SignupInflow} name='SignupInflow' />
            <LoginStack.Screen component={FindPasswordPhoneVerify} name='FindPasswordPhoneVerify' />
            <LoginStack.Screen component={FindPassword} name='FindPassword' />
            <LoginStack.Screen component={WebView} name='WebView' />
            <LoginStack.Screen component={SelectLocation} name='SelectLocation' />
        </LoginStack.Navigator>
    )
}


export default LoginStackNavigation