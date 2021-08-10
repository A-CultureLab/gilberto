import React from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Marker } from 'react-native-maps'
import { HomeScreenContext } from '.'
import { COLOR1, DEFAULT_SHADOW } from '../../constants/styles'
import { petGroupByAddress_petGroupByAddress, petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress'

const PetMarker: React.FC<petGroupByAddress_petGroupByAddress_petGroup & Pick<petGroupByAddress_petGroupByAddress, 'groupBy'>> = ({ region, count, pets, id, groupBy }) => {

    const { selectedPetGroupId, setSelectedPetGroupId, mapRef } = useContext(HomeScreenContext)

    const isSelected = selectedPetGroupId === id

    const onPress = useCallback(() => {
        setSelectedPetGroupId(id)
        mapRef.current?.animateCamera({
            center: {
                latitude: region.latitude,
                longitude: region.longitude,
            }
        })
    }, [id, mapRef])

    return (
        <Marker
            onPress={onPress}
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        >
            <View style={styles.container} >
                {pets.length >= 2 && <FastImage
                    style={[styles.image, { transform: [{ translateX: 8 }], position: 'absolute', borderWidth: isSelected ? 3 : 0 }]}
                    source={{ uri: pets[1].image }}
                />}
                <FastImage
                    style={[styles.image, { borderWidth: isSelected ? 3 : 0 }]}
                    source={{ uri: pets[0].image }}
                />
                {!isSelected && <View style={styles.countContainer} >
                    <Text style={styles.count} >{count < 100 ? count : '99+'}</Text>
                </View>}
            </View>
        </Marker>
    )
}

export default PetMarker

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        ...DEFAULT_SHADOW
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderColor: COLOR1
    },
    countContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        color: '#fff'
    }
})