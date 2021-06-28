import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'

const TabNavigationTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({ state, navigation, descriptors }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <>
            <View style={[styles.container, { height: 56 + bottom, paddingBottom: bottom }]} >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label = options.tabBarLabel as string
                    const isFocused = state.index === index
                    const Icon: any = options.tabBarIcon


                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }

                    };

                    return (
                        <Pressable
                            key={label}
                            onPress={onPress}
                            style={styles.btn}
                        >
                            <Icon color={isFocused ? COLOR1 : GRAY2} />
                            <Text style={[styles.label, { color: isFocused ? COLOR1 : GRAY1 }]} >{label}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </>
    )
}

export default TabNavigationTabBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: GRAY3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
        marginTop: 6
    }
})