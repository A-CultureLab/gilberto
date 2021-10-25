import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import { myPets_myPets } from '../../graphql/__generated__/myPets'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Gender } from '../../../__generated__/globalTypes'
import useNavigation from '../../hooks/useNavigation'

interface PetInfoCardProps {
    data: myPets_myPets
    drag: () => void
    isActive: boolean
}

const PetInfoCard: React.FC<PetInfoCardProps> = ({ data, drag, isActive }) => {

    const { navigate } = useNavigation()

    const { image, id, age, character, gender, name, species, weight } = data

    return (
        <Pressable
            style={[styles.container, { borderTopColor: isActive ? GRAY3 : '#fff' }]}
            android_ripple={{ color: GRAY2 }}
            onPress={() => navigate('PetModify', { id })}
        >
            <View style={styles.contentContainer} >
                <Image style={styles.image} source={{ uri: image }} />
                <View>
                    <Text>
                        <Text style={styles.name} >{name}</Text>
                        <Text style={styles.species} > · {species}</Text>
                    </Text>
                    <Text style={styles.character} >{character}</Text>
                    <View style={styles.etcContainer} >
                        <View style={styles.etcItem} >
                            <Text style={styles.etc} >{gender === Gender.male ? '남아' : '여아'}</Text>
                        </View>
                        <View style={styles.etcItem} >
                            <Text style={styles.etc}>{age}</Text>
                        </View>
                        <View style={styles.etcItem} >
                            <Text style={styles.etc}>{weight}kg</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Pressable
                onPressIn={drag}
                style={styles.draggerContainer}
            >
                <Icon name='menu' size={24} color={isActive ? '#000' : GRAY2} />
            </Pressable>
        </Pressable>
    )
}

export default PetInfoCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        backgroundColor: '#fff',
        borderTopWidth: 1
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: 16
    },
    name: {
        fontWeight: 'bold'
    },
    species: {
        color: GRAY1
    },
    character: {
        fontWeight: 'bold',
        color: COLOR1,
        marginVertical: 8
    },
    etcContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    etcItem: {
        backgroundColor: GRAY1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        height: 20,
        borderRadius: 4,
        marginRight: 8
    },
    etc: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    draggerContainer: {
        height: '100%',
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    }
})