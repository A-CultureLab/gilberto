import { useNavigation, useNavigationState } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import { user, user_user } from '../../graphql/__generated__/user'
import genderGenerator from '../../lib/genderGenerator'
import { AuthContext } from '../../screens'

interface UserFooterProps {
    user: Pick<user_user, 'id' | 'name' | 'gender' | 'age'>
}

const UserFooter: React.FC<UserFooterProps> = ({ user }) => {

    const { id, age, gender, name } = user

    const { bottom } = useSafeAreaInsets()
    const { navigate } = useNavigation()
    const { user: iUser } = useContext(AuthContext)
    const { data } = useIUser({ skip: !iUser })

    if (data?.iUser.id === id) return null

    return (
        <View style={[styles.container, { height: 56 + bottom, paddingBottom: bottom }]} >
            <Pressable style={styles.left} onPress={() => navigate('UserDetail', { id })} >
                <Text style={styles.name} >{name}</Text>
                <Text style={styles.genderAge} >{genderGenerator.user(gender)}, {age}세</Text>
            </Pressable>
            <Pressable
                style={styles.chatButton}
                android_ripple={{ color: GRAY2 }}
                onPress={() => navigate('ChatDetail', { userId: id })}
            >
                <Text style={styles.chat} >채팅하기</Text>
            </Pressable>
        </View>
    )
}

export default UserFooter

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: GRAY3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    left: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold'
    },
    genderAge: {
        fontSize: 12,
        color: GRAY1,
        marginTop: 4
    },
    chatButton: {
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chat: {
        fontWeight: 'bold',
        color: '#fff'
    }
})