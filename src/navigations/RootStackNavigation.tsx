import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'


import ChatDetail, { ChatDetailProps } from '../screens/ChatDetail';
import OpenSourceLicense from '../screens/OpenSourceLicense';
import PetModify, { PetModifyProps } from '../screens/PetModify';
import PetRegist from '../screens/PetRegist';
import ProfileModify from '../screens/ProfileModify';
import SelectLocation, { SelectLocationProps } from '../screens/SelectLocation';
import Settings from '../screens/Settings';
import UserDetail, { UserDetailProps } from '../screens/UserDetail';
import WebView, { WebViewProps } from '../screens/WebView';
import Withdraw from '../screens/Withdraw';
import UserCertification, { UserCertificationProps } from '../screens/UserCertification';
import ImageDetail, { ImageDetailProps } from '../screens/ImageDetail';
import PetDetail, { PetDetailProps } from '../screens/PetDetail';
import Report, { ReportProps } from '../screens/Report';
import PostCreate, { PostCreateProps } from '../screens/PostCreate';
import PostDetail, { PostDetailProps } from '../screens/PostDetail';
import PostCommentDetail, { PostCommentDetailProps } from '../screens/PostCommentDetail';
import PostEdit, { PostEditProps } from '../screens/PostEdit';
import PetList from '../screens/PetList';
import Browser, { BrowserProps } from '../screens/Browser';
import TabNavigation from './RootTabNavigation';
import ChannelIOWrapper from '../wrappers/ChannelIOWrapper';
import FCMWrapper from '../wrappers/FCMWrapper';
import ScreenAnalyticsWrapper from '../wrappers/ScreenAnalyticsWrapper';
import MyPets from '../screens/MyPets';
import MediaCreateSelectPhoto from '../screens/MediaCreateSelectPhoto';
import MediaCreate, { MediaCreateProps } from '../screens/MediaCreate';
import Follows, { FollowsProps } from '../screens/Follows';
import MediaDetail, { MediaDetailProps } from '../screens/MediaDetail';
import MediaComments, { MediaCommentsProps } from '../screens/MediaComments';
import MediaEdit, { MediaEditProps } from '../screens/MediaEdit';



export type RootStackParamList = {
    Tab: undefined
    SelectLocation: SelectLocationProps
    WebView: WebViewProps
    SignupPet: undefined
    PetRegist: undefined
    PetModify: PetModifyProps
    MyPets: undefined
    ProfileModify: undefined
    Settings: undefined
    OpenSourceLicense: undefined
    Withdraw: undefined
    PetDetail: PetDetailProps
    UserDetail: UserDetailProps
    ChatDetail: ChatDetailProps
    UserCertification: UserCertificationProps
    ImageDetail: ImageDetailProps
    Report: ReportProps
    PostCreate: PostCreateProps
    PostDetail: PostDetailProps
    PostCommentDetail: PostCommentDetailProps
    PostEdit: PostEditProps
    PetList: undefined
    Browser: BrowserProps
    MediaCreateSelectPhoto: undefined
    MediaCreate: MediaCreateProps
    Follows: FollowsProps
    MediaDetail: MediaDetailProps
    MediaComments: MediaCommentsProps
    MediaEdit: MediaEditProps
}


const RootStack = createStackNavigator<RootStackParamList>()




const RootStackNavigation = () => {
    return (
        <RootStack.Navigator
            initialRouteName='Tab'
            screenOptions={({ navigation }) => {
                return {
                    header: () => <ScreenAnalyticsWrapper><ChannelIOWrapper><FCMWrapper /></ChannelIOWrapper></ScreenAnalyticsWrapper>,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }
            }}
        >
            <RootStack.Screen name='Tab' component={TabNavigation} />
            <RootStack.Screen name='SelectLocation' component={SelectLocation} />
            <RootStack.Screen name='WebView' component={WebView} />
            <RootStack.Screen name='PetRegist' component={PetRegist} />
            <RootStack.Screen name='PetModify' component={PetModify} />
            <RootStack.Screen name='MyPets' component={MyPets} />
            <RootStack.Screen name='ProfileModify' component={ProfileModify} />
            <RootStack.Screen name='Settings' component={Settings} />
            <RootStack.Screen name='OpenSourceLicense' component={OpenSourceLicense} />
            <RootStack.Screen name='Withdraw' component={Withdraw} />
            <RootStack.Screen name='PetDetail' component={PetDetail} />
            <RootStack.Screen name='UserDetail' component={UserDetail} />
            <RootStack.Screen name='ChatDetail' component={ChatDetail} />
            <RootStack.Screen name='UserCertification' component={UserCertification} />
            <RootStack.Screen name='ImageDetail' component={ImageDetail} />
            <RootStack.Screen name='Report' component={Report} />
            <RootStack.Screen name='PostCreate' component={PostCreate} />
            <RootStack.Screen name='PostDetail' component={PostDetail} />
            <RootStack.Screen name='PostCommentDetail' component={PostCommentDetail} />
            <RootStack.Screen name='PostEdit' component={PostEdit} />
            <RootStack.Screen name='PetList' component={PetList} />
            <RootStack.Screen name='Browser' component={Browser} />
            <RootStack.Screen name='MediaCreateSelectPhoto' component={MediaCreateSelectPhoto} />
            <RootStack.Screen name='MediaCreate' component={MediaCreate} />
            <RootStack.Screen name='Follows' component={Follows} />
            <RootStack.Screen name='MediaDetail' component={MediaDetail} />
            <RootStack.Screen name='MediaComments' component={MediaComments} />
            <RootStack.Screen name='MediaEdit' component={MediaEdit} />
        </RootStack.Navigator>
    )
}

export default RootStackNavigation