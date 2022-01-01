import useNavigation from '../../hooks/useNavigation'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MediaContext } from '.'
import { GRAY2, GRAY3 } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'

const MediaHeader = () => {

    const { select } = useGlobalUi()
    const { filter, setFilter } = useContext(MediaContext)
    const { data } = useIUser()

    const address = data?.iUser.address
    const currentAddress =
        filter.area1Id ? address?.area1.name
            : filter.area2Id ? address?.area2.name
                : filter.area3Id ? address?.area3.name
                    : (filter.landId ? address?.land.buildingName : '전국')

    const onLocation = useCallback(() => {
        select({
            list: [
                '전국',
                address?.area1.name || '',
                address?.area2.name || '',
                address?.area3.name || '',
                address?.land.name || '',
            ],
            onSelect: (i) => {
                setFilter({
                    area1Id: i === 1 ? address?.area1.id : undefined,
                    area2Id: i === 2 ? address?.area2.id : undefined,
                    area3Id: i === 3 ? address?.area3.id : undefined,
                    landId: i === 4 ? address?.land.id : undefined,
                })
            }
        })
    }, [address])


    return (
        <View style={styles.container} >
            <Pressable
                onPress={onLocation}
                style={styles.locationselect}
            >
                <View style={{ width: 24 }} />
                <Text numberOfLines={1} style={styles.location} >{currentAddress}</Text>
                <Icon name='keyboard-arrow-down' size={24} />
            </Pressable>
        </View>
    )
}

export default MediaHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    locationselect: {
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