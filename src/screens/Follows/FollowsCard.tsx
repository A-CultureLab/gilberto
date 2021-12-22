import { gql } from '@apollo/client'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY3 } from '../../constants/styles'
import { useDisFollowing, useFollowing } from '../../graphql/follow'
import { followers_followers_user } from '../../graphql/__generated__/followers'
import { followings_followings_targetUser } from '../../graphql/__generated__/followings'
import useNavigation from '../../hooks/useNavigation'
import { createLazyQueryHook } from '../../lib/createApolloHook'
import { followsCardUser, followsCardUserVariables } from './__generated__/followsCardUser'

interface FollowsCardProps {
    user: followers_followers_user | followings_followings_targetUser
}

const FOLLOWS_CARD_USER = gql`
query followsCardUser($userId:String!) {
    user(where: {id:$userId}) {
        id
        isIFollowed
    }
}
`

const FollowsCard: React.FC<FollowsCardProps> = (props) => {

    const { user } = props


    const [refreshUser] = createLazyQueryHook<followsCardUser, followsCardUserVariables>(FOLLOWS_CARD_USER)({ variables: { userId: user.id } })
    const [following] = useFollowing({ variables: { userId: user.id } })
    const [disFollowing] = useDisFollowing({ variables: { userId: user.id } })

    const { navigate } = useNavigation()

    return (
        <Pressable style={styles.conatiner} onPress={() => navigate('UserDetail', { id: user.id })} >
            <FastImage
                source={{ uri: user.image }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <Text style={{ fontWeight: 'bold', marginLeft: 12, flex: 1 }} >{user.name}</Text>
            <Pressable
                onPress={() => {
                    user.isIFollowed
                        ? disFollowing().then(refreshUser)
                        : following()
                }}
                style={[
                    { width: 80, height: 28, borderRadius: 6, borderColor: GRAY3, alignItems: 'center', justifyContent: 'center' },
                    { borderWidth: user.isIFollowed ? 1 : 0, backgroundColor: user.isIFollowed ? '#fff' : COLOR1 }
                ]}
            >
                <Text style={{ color: user.isIFollowed ? '#000' : '#fff' }} >{user.isIFollowed ? '팔로잉' : '팔로우'}</Text>
            </Pressable>
        </Pressable>
    )
}

export default FollowsCard

const styles = StyleSheet.create({
    conatiner: {
        height: 64,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
})