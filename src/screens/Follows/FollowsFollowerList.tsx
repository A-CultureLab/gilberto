import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useFollowers, useFollowings } from '../../graphql/follow'
import useRefreshing from '../../hooks/useRefreshing'
import FollowsCard from './FollowsCard'

const FollowsFollowerList: React.FC<{ userId: string }> = ({ userId }) => {

    const { data, fetchMore, refetch } = useFollowers({ variables: { userId } })
    const refreshing = useRefreshing(refetch)

    return (
        <FlatList
            {...refreshing}
            style={{ marginTop: 20 }}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            onEndReached={() => fetchMore({ variables: { skip: data?.followers.length } })}
            data={data?.followers || []}
            renderItem={({ item }) => <FollowsCard user={item.user} />}
        />
    )
}

export default FollowsFollowerList

const styles = StyleSheet.create({})
