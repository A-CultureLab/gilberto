import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useFollowings } from '../../graphql/follow'
import useRefreshing from '../../hooks/useRefreshing'
import FollowsCard from './FollowsCard'

const FollowsFollowingList: React.FC<{ userId: string }> = ({ userId }) => {

    const { data, fetchMore, refetch } = useFollowings({ variables: { userId } })
    const refreshing = useRefreshing(refetch)

    return (
        <FlatList
            style={{ marginTop: 20 }}
            {...refreshing}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            onEndReached={() => fetchMore({ variables: { skip: data?.followings.length } })}
            data={data?.followings || []}
            renderItem={({ item }) => <FollowsCard user={item.targetUser} />}
        />
    )
}

export default FollowsFollowingList

const styles = StyleSheet.create({})
