import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PostContext } from '.'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'
import { useIUser } from '../../graphql/user'
import { AuthContext } from '..'

const PostEmpty = () => {

    const { navigate } = useNavigation()
    const { filter, refetch } = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const { data } = useIUser({ skip: !user })

    const buildingName = data?.iUser.address.land.buildingName

    const adress = filter.area1Id || filter.area2Id || filter.area3Id || buildingName

    return (
        <View style={styles.container} >
            <Pressable
                onPress={() => navigate('PostCreate', { refetch })}
                style={{ alignItems: 'center' }}
            >
                <Text style={styles.title} >{adress}에 첫번째 게시물을 작성해주세요!</Text>
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