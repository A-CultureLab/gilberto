import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { petsByAddress_petsByAddress } from '../../graphql/__generated__/petsByAddress'
import genderGenerator from '../../lib/genderGenerator'
import meterUnit from '../../utils/meterUnit'

const PetCard: React.FC<petsByAddress_petsByAddress> = (props) => {

    const { navigate } = useNavigation()

    const { id, image, name, species, character, age, gender, weight, user } = props


    return (
        <Pressable android_ripple={{ color: GRAY2 }} onPress={() => navigate('PetDetail', { id })} style={styles.container} >
            <FastImage style={styles.image} source={{ uri: image }} />
            <View>
                <Text numberOfLines={1} style={styles.name} >{name}<Text style={styles.species} > · {species}</Text></Text>
                <Text numberOfLines={1} style={styles.character} >{character}</Text>
                <View style={{ flexDirection: 'row' }} >
                    <View style={styles.petDetailContainer} ><Text style={styles.petDetailText} numberOfLines={1} >{genderGenerator.pet(gender)}</Text></View>
                    <View style={styles.petDetailContainer}><Text style={styles.petDetailText} numberOfLines={1} >{age}</Text></View>
                    <View style={styles.petDetailContainer}><Text style={styles.petDetailText} numberOfLines={1} >{weight}kg</Text></View>
                </View>
                <Text style={styles.userDetail} >{user.name} {user.age}세 {genderGenerator.user(user.gender)}{user.address.distance !== null ? ` • ${meterUnit(user.address.distance)}` : ''}</Text>
            </View>
        </Pressable>
    )
}

export default PetCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        flexDirection: 'row',
    },
    image: {
        width: 96,
        height: 96,
        marginRight: 16,
        borderRadius: 8
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 8
    },
    species: {
        fontWeight: 'normal',
        color: GRAY1
    },
    character: {
        fontWeight: 'bold',
        color: COLOR1,
        marginBottom: 8
    },
    petDetailContainer: {
        marginBottom: 8,
        backgroundColor: GRAY1,
        borderRadius: 4,
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    petDetailText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
    },
    userDetail: {
        fontSize: 12,
        color: GRAY1,
    }
})