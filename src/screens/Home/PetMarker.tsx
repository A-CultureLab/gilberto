import React from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Align, Circle, Marker } from 'react-native-nmap'
import { HomeScreenContext } from '.'
import { PetGroupByAddressGroupBy } from '../../../__generated__/globalTypes'
import { COLOR1, COLOR2, COLOR3 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { petGroupByAddress_petGroupByAddress, petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress'

const PetMarker: React.FC<petGroupByAddress_petGroupByAddress_petGroup & Pick<petGroupByAddress_petGroupByAddress, 'groupBy'>> = ({ region, count, pets, id, groupBy }) => {

    const { selectedPetGroupId, setSelectedPetGroupId, mapRef } = useContext(HomeScreenContext)

    const isSelected = selectedPetGroupId === id

    const onPress = useCallback(() => {
        setSelectedPetGroupId(id)
        mapRef.current?.animateToCoordinate(region)
    }, [id, mapRef, region])

    return (
        <>
            {/* <Circle
                onClick={onPress}
                zIndex={99}
                coordinate={region}
                color='rgba(0, 0, 0, 0.4)'
                radius={radius}
                outlineColor={COLOR1}
                outlineWidth={isSelected ? IS_IOS ? 3 : Math.sqrt(radius) : 0}
            /> */}
            <Marker
                coordinate={region}
                width={56}
                height={56}
                image={isSelected ? require('../../assets/circle-marker-bordered.png') : require('../../assets/circle-marker.png')}
                caption={{ text: count.toString(), color: '#ffffff', textSize: 14, haloColor: IS_IOS ? 'rgba(0, 0, 0, 0)' : '#000000', align: Align.Center }}
                zIndex={99}
                onClick={onPress}
            />
        </>
    )
}

export default React.memo(PetMarker)

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR1
    },
    count: {
        color: '#fff'
    }
})