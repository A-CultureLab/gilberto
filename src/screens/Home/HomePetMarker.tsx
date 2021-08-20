import React from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Align, Marker } from 'react-native-nmap'
import { HomeScreenContext } from '.'
import { COLOR1 } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { petGroupByAddress_petGroupByAddress, petGroupByAddress_petGroupByAddress_petGroup } from '../../graphql/__generated__/petGroupByAddress'

const HomePetMarker: React.FC<petGroupByAddress_petGroupByAddress_petGroup & Pick<petGroupByAddress_petGroupByAddress, 'groupBy'>> = ({ region, count, pets, id, groupBy }) => {

    const { selectedGroupByAddressId, setSelectedGroupByAddressId, mapRef } = useContext(HomeScreenContext)

    const isSelected = selectedGroupByAddressId === id

    const onPress = useCallback(() => {
        setSelectedGroupByAddressId(id)
        mapRef.current?.animateToCoordinate(region)
    }, [id, mapRef, region, setSelectedGroupByAddressId])

    return (
        <Marker
            coordinate={region}
            width={56}
            height={56}
            image={isSelected ? require('../../assets/circle-marker-bordered.png') : require('../../assets/circle-marker.png')}
            caption={{ text: count.toString(), color: '#ffffff', textSize: 14, haloColor: IS_IOS ? 'rgba(0, 0, 0, 0)' : '#000000', align: Align.Center }}
            zIndex={isSelected ? 99 : 0}
            onClick={onPress}
        />
    )
}

export default React.memo(HomePetMarker)