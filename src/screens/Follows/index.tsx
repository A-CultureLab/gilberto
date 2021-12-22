import { gql } from '@apollo/client'
import React, { useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY3, WIDTH } from '../../constants/styles'
import useRoute from '../../hooks/useRoute'
import { createQueryHook } from '../../lib/createApolloHook'
import FollowsFollowerList from './FollowsFollowerList'
import FollowsFollowingList from './FollowsFollowingList'
import { followScreenUser, followScreenUserVariables } from './__generated__/followScreenUser'

export interface FollowsProps {
    type: 'followers' | 'followings'
    userId: string
}

const USER = gql`
query followScreenUser($userId:String!) {
    user(where: {id:$userId}) {
        id
        profileId
    }
}
`

const Follows = () => {

    const { params: { type, userId } } = useRoute<'Follows'>()

    const { data: userData } = createQueryHook<followScreenUser, followScreenUserVariables>(USER)({ variables: { userId } })

    const [index, setIndex] = useState(type === 'followers' ? 0 : 1)
    const [routes] = useState([
        { key: 'followers', title: '팔로워' },
        { key: 'followings', title: '팔로잉' },
    ]);

    return (
        <ScreenLayout>
            <Header title={userData?.user.profileId || ''} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    followers: () => <FollowsFollowerList userId={userId} />,
                    followings: () => <FollowsFollowingList userId={userId} />
                })}
                onIndexChange={setIndex}
                renderTabBar={({ jumpTo, layout, navigationState, position }) =>
                    <View style={{ width: WIDTH, height: 40, borderBottomWidth: 1, borderBottomColor: GRAY3, flexDirection: 'row', alignItems: 'center' }} >
                        {navigationState.routes.map((v, i) =>
                            <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }} key={v.key} onPress={() => jumpTo(v.key)} >
                                <Text style={{ fontWeight: i === navigationState.index ? 'bold' : 'normal' }} >{v.title}</Text>
                            </Pressable>
                        )}
                        <Animated.View
                            style={[
                                { height: 1, position: 'absolute', bottom: 0, left: 0, backgroundColor: COLOR1, width: layout.width / navigationState.routes.length },
                                {
                                    transform: [{
                                        translateX: position.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, layout.width - (layout.width / navigationState.routes.length)]
                                        })
                                    }]
                                }
                            ]}
                        />
                    </View>
                }
            />
        </ScreenLayout>
    )
}

export default Follows

const styles = StyleSheet.create({})
