import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PetListContext } from '.'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useNavigation from '../../hooks/useNavigation'
import { useIUser } from '../../graphql/user'

const PetListEmpty = () => {

    const { navigate } = useNavigation()
    const { filter } = useContext(PetListContext)
    const { data } = useIUser()


    const address = data?.iUser.address
    const currentAddress =
        filter.area1Id ? address?.area1.name
            : filter.area2Id ? address?.area2.name
                : filter.area3Id ? address?.area3.name
                    : (filter.landId ? address?.land.buildingName : '전국')

    return (
        <View style={styles.container} >
            <Pressable
                onPress={() => navigate('Profile')}
                style={{ alignItems: 'center' }}
            >
                <Text style={styles.title} >{currentAddress}에 첫번째 반려동물을 등록해주세요!</Text>
                <Icon name='add' size={24} />
            </Pressable>
        </View>
    )
}

export default PetListEmpty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    }
})