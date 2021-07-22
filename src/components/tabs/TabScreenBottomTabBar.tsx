/*
Home, Friend 스크린의 하단 네비게이션 바
*/

import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

const TABS = [
    {
        name: 'Home',
        label: '홈',
        icon: ({ color }: { color: string }) => <IconMA size={24} name='location-on' color={color} />
    },
    {
        name: 'Friend',
        label: '친구',
        icon: ({ color }: { color: string }) => <IconMA size={22} name='language' color={color} />
    },
    {
        name: 'Chat',
        label: '채팅',
        icon: ({ color }: { color: string }) => <IconMA size={22} name='chat' color={color} />
    }
]

interface MapScreenBottomTabBarProps {

}

const MapScreenBottomTabBar: React.FC<MapScreenBottomTabBarProps> = () => {


    const { bottom } = useSafeAreaInsets()
    const { name: routeName } = useRoute()
    const { navigate } = useNavigation()

    const onPress = (name: string) => {
        if (name === routeName) return
        if ((name === 'Friend' || name === 'Chat') && !auth().currentUser) {
            navigate('Login')
            return
        }
        navigate(name)
    }

    return (
        <View style={[styles.container, { height: 56 + bottom, paddingBottom: bottom }]} >
            {TABS.map(({ icon, label, name }) =>
                <BorderlessButton onPress={() => onPress(name)} activeOpacity={1} key={name} style={styles.tab} >
                    {icon({ color: routeName === name ? COLOR1 : GRAY2 })}
                    {routeName === name && <View style={styles.line} />}
                    <Text style={[styles.tabLabel, { color: routeName === name ? '#333' : GRAY1 }]} >{label}</Text>
                </BorderlessButton>
            )}
        </View>
    )
}

export default MapScreenBottomTabBar

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 6
    },
    line: {
        width: 64,
        height: 2,
        backgroundColor: COLOR1,
        position: 'absolute',
        top: 0
    }
})