import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DEFAULT_SHADOW } from '../../constants/styles'
import { useMyPets } from '../../graphql/pet'
import { useIUser } from '../../graphql/user'
import getRandomPet from '../../utils/getRandomPet'

const ProfileButton = () => {

    const { data } = useMyPets()
    const { navigate } = useNavigation()

    const randomPet = getRandomPet(data?.myPets || [])

    if (!randomPet) return null

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigate('MyPage')}
        >
            <FastImage
                style={styles.image}
                source={{ uri: randomPet.image }}
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