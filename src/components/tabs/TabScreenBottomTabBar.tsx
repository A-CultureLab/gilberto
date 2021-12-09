/*
Home, Friend 스크린의 하단 네비게이션 바
*/

import useNavigation from '../../hooks/useNavigation'
import useRoute from '../../hooks/useRoute'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, COLOR3, DEFAULT_SHADOW, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import IconMA from 'react-native-vector-icons/MaterialIcons'
// import auth from '@react-native-firebase/auth';
import { useIUser } from '../../graphql/user'
import HomeIcon from '../../assets/svgs/tabbar/home.svg'
import LocationIcon from '../../assets/svgs/tabbar/location.svg'
import UploadIcon from '../../assets/svgs/tabbar/upload.svg'
import ChatIcon from '../../assets/svgs/tabbar/chat.svg'
import UserIcon from '../../assets/svgs/tabbar/user.svg'

const TABS = [
    {
        name: 'Media',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <HomeIcon width={24} height={24} fill={color} />
    },
    {
        name: 'HomeTab',
        routes: ['HomeTab', 'Home', 'PetList'],
        icon: ({ color, focus }: { color: string, focus: boolean }) => <LocationIcon width={24} height={24} fill={color} />
    },
    {
        name: 'MediaCreateSelectPhoto',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <UploadIcon width={24} height={24} fill={color} />
    },
    {
        name: 'Chat',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <ChatIcon width={24} height={24} fill={color} />
    },
    {
        name: 'MyPage',
        icon: ({ color, focus }: { color: string, focus: boolean }) => <UserIcon width={24} height={24} fill={color} />
    }
]

interface TabScreenBottomTabBarProps {
    isMap?: boolean
    onFocusPress?: () => void
}

const TabScreenBottomTabBar: React.FC<TabScreenBottomTabBarProps> = ({ isMap, onFocusPress }) => {


    const { bottom } = useSafeAreaInsets()
    const { name: routeName } = useRoute()
    const { navigate } = useNavigation()

    const { data } = useIUser()

    const onPress = (name: string) => {
        if (name === routeName) {
            onFocusPress && onFocusPress()
            return
        }
        //@ts-ignore
        navigate(name)
    }

    return (
        <View
            style={[
                styles.container,
                {
                    position: isMap ? 'absolute' : 'relative',
                    height: bottom + 56,
                    paddingBottom: bottom
                }
            ]}
        >
            {TABS.map(({ icon, name, routes }, i) => {

                const isFocused = routeName === name || !!routes?.includes(routeName)

                return (
                    <Pressable
                        onPress={() => onPress(name)}
                        key={name}
                        style={[styles.tab]}
                    // android_ripple={{ color: GRAY2, radius: WIDTH / 3 / 2 }}
                    >
                        <View >
                            {icon({ color: isFocused ? COLOR1 : '#75726A', focus: isFocused })}
                            {(name === 'Chat' && data && data.iUser.notReadChatCount > 0) && <View style={styles.notReadChatCountBadge} ><Text style={styles.notReadChatCount} >{data.iUser.notReadChatCount > 100 ? 99 : data.iUser.notReadChatCount}</Text></View>}
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default TabScreenBottomTabBar

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        bottom: 0, left: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: GRAY3,
        borderTopWidth: 1
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1
    },
    line: {
        height: 2,
        backgroundColor: COLOR1,
        flex: 1
    },
    notReadChatCountBadge: {
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        top: -5,
        right: -5
    },
    notReadChatCount: {
        fontSize: 10,
        color: COLOR1,
        fontWeight: 'bold',
        margin: 0,
        padding: 0
    },
    label: {
        fontSize: 11,
        marginTop: 6
    }
})