import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PostContext } from '.'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useNavigation from '../../hooks/useNavigation'
import { useIUser } from '../../graphql/user'
import { AuthContext } from '../../navigations'

const PostEmpty = () => {

    const { navigate } = useNavigation()
    const { filter, refetch } = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const { data } = useIUser({ skip: !user })


    const address = data?.iUser.address
    const currentAddress =
        filter.area1Id ? address?.area1.name
            : filter.area2Id ? address?.area2.name
                : filter.area3Id ? address?.area3.name
                    : (filter.landId ? address?.land.buildingName : '전국')

    return (
        <View style={styles.container} >
            <Pressable
                onPress={() => navigate('PostCreate', { refetch })}
                style={{ alignItems: 'center' }}
            >
                <Text style={styles.title} >{currentAddress}에 첫번째 게시물을 작성해주세요!</Text>
                <Icon name='add' size={24} />
            </Pressable>
        </View>
    )
}

export default PostEmpty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    }
})