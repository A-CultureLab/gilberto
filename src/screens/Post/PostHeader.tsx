import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PostContext } from '.'
import { AuthContext } from '..'
import { GRAY2, GRAY3 } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'

const PostHeader = () => {

    const { navigate } = useNavigation()
    const { selector } = useGlobalUi()
    const { filter, setFilter, refetch } = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const { data } = useIUser({ skip: !user })

    const address = data?.iUser.address
    const currentAddress = filter.area1Id || filter.area2Id || filter.area3Id || (filter.landId ? address?.land.buildingName : '전국')

    const onLocation = useCallback(() => {
        selector({
            list: [
                '전국',
                address?.area1Id || '',
                address?.area2Id || '',
                address?.area3Id || '',
                address?.land.buildingName || '',
            ],
            onSelect: (i) => {
                setFilter({
                    area1Id: i === 1 ? address?.area1Id : undefined,
                    area2Id: i === 2 ? address?.area2Id : undefined,
                    area3Id: i === 3 ? address?.area3Id : undefined,
                    landId: i === 4 ? address?.landId : undefined,
                })
            }
        })
    }, [address])

    const onAdd = useCallback(() => {
        navigate('PostCreate', { refetch })
    }, [])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onLocation}
                style={styles.locationSelector}
            >
                <Text style={styles.location} >{currentAddress}</Text>
                {user && <Icon name='keyboard-arrow-down' size={24} />}
            </Pressable>
            <View style={{ flex: 1 }} />
            {user && <Pressable
                onPress={onAdd}
                android_ripple={{ color: GRAY2, radius: 28 }}
                style={styles.addBtn}
            >
                <Icon name='add' size={24} />
            </Pressable>}
        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    },
    locationSelector: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    location: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8
    },
    addBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})