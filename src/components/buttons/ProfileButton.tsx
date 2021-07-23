import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DEFAULT_SHADOW } from '../../constants/styles'
import { useMyPets } from '../../graphql/pet'
import { useIUser } from '../../graphql/user'
import getRandomPet from '../../utils/getRandomPet'

const ProfileButton = () => {

    const { data } = useMyPets()
    const { data: userData } = useIUser()
    const { navigate } = useNavigation()

    const randomPet = useMemo(() => getRandomPet(data?.myPets || []), [data?.myPets])

    if (!randomPet && !userData) return null

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigate('MyPage')}
        >
            <FastImage
                style={styles.image}
                source={{ uri: randomPet?.image || userData?.iUser.image }}
            />
        </Pressable>
    )
}

export default ProfileButton

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        borderRadius: 28,
        ...DEFAULT_SHADOW,
        marginLeft: 16
    },
    image: {
        flex: 1,
        borderRadius: 28
    }
})