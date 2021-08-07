import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DEFAULT_SHADOW, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { useMyPets } from '../../graphql/pet'
import Icon from 'react-native-vector-icons/MaterialIcons'
import getRandomPet from '../../utils/getRandomPet'
import { useIUser } from '../../graphql/user'

const ProfileButton = () => {

    const { data } = useMyPets()
    const { navigate } = useNavigation()

    const randomPet = useMemo(() => getRandomPet(data?.myPets || []), [data?.myPets])
    console.log(randomPet)
    return (
        <Pressable
            style={[styles.container]}
            onPress={() => navigate('MyPage')}
        >
            {randomPet
                ? <FastImage
                    style={styles.image}
                    source={{ uri: randomPet.image }}
                />
                : <Icon name='settings' style={{ alignSelf: 'center' }} size={24} color={GRAY1} />
            }
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
        marginLeft: 16,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        borderRadius: 28
    }
})