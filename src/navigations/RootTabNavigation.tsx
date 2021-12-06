import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Chat from "../screens/Chat"
import Home from "../screens/Home"
import MyPage from "../screens/MyPage"
import PetList from "../screens/PetList"
import Media from '../screens/Media'


export type TabParamList = {
    Media: undefined
    HomeTab: undefined
    Chat: undefined
    MyPage: undefined
}

export type HomeTabParamList = {
    Home: undefined
    PetList: undefined
}


const Tab = createBottomTabNavigator<TabParamList>()
const HomeTab = createBottomTabNavigator<HomeTabParamList>()



const HomeTabNavigation = () => {
    return (
        <HomeTab.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
            tabBar={() => null}
        >
            <HomeTab.Screen name='Home' component={Home} />
            <HomeTab.Screen name='PetList' component={PetList} />
        </HomeTab.Navigator>
    )
}

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='MyPage'
            screenOptions={{ headerShown: false }}
            tabBar={() => null}
        >
            <Tab.Screen name='Media' component={Media} />
            <Tab.Screen name='HomeTab' component={HomeTabNavigation} />
            <Tab.Screen name='Chat' component={Chat} />
            <Tab.Screen name='MyPage' component={MyPage} />
        </Tab.Navigator>
    )
}

export default TabNavigation