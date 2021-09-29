import { useNavigation } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GRAY2, GRAY3 } from '../../constants/styles'
import useGlobalUi from '../../hooks/useGlobalUi'

const PostHeader = () => {

    const { navigate } = useNavigation()
    const { selector } = useGlobalUi()

    const onLocation = useCallback(() => {
        selector({
            list: [],
            onSelect: () => { }
        })
    }, [])

    const onAdd = useCallback(() => {
        navigate('PostCreate')
    }, [])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onLocation}
                style={styles.locationSelector}
            >
                <Text style={styles.location} >전국</Text>
                <Icon name='keyboard-arrow-down' size={24} />
            </Pressable>
            <View style={{ flex: 1 }} />
            <Pressable
                onPress={onAdd}
                android_ripple={{ color: GRAY2, radius: 28 }}
                style={styles.addBtn}
            >
                <Icon name='add' size={24} />
            </Pressable>
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