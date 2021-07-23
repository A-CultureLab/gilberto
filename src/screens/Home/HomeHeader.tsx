import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DEFAULT_SHADOW, GRAY1, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HomeScreenContext } from '.'
import { BaseButton } from 'react-native-gesture-handler'
import { IS_ANDROID } from '../../constants/values'
import ProfileButton from '../../components/buttons/ProfileButton'
import { useMyPets } from '../../graphql/pet'
import getRandomPet from '../../utils/getRandomPet'
import { useMemo } from 'react'

interface HomeHeaderProps {

}

const HomeHeader: React.FC<HomeHeaderProps> = () => {

    const { data } = useMyPets()
    const { setCategoryVerticalMode } = useContext(HomeScreenContext)

    const randomPet = useMemo(() => getRandomPet(data?.myPets || []), [data?.myPets])

    return (
        <View style={[styles.container]} >
            <View style={styles.searchContainer} >
                <BaseButton style={styles.searchBtn} >
                    <Text style={styles.searchText} >{randomPet ? randomPet.name : '반려동물'}과 함께가고 싶은 곳</Text>
                    <Icon name='search' size={22} color={GRAY2} style={{ marginHorizontal: 16 }} />
                </BaseButton>
                <Pressable onPress={() => setCategoryVerticalMode(true)} style={styles.menuBtn} >
                    <Icon name='menu' size={24} color={GRAY2} />
                </Pressable>
            </View>
            <ProfileButton />
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: WIDTH,
        top: STATUSBAR_HEIGHT + 16,
        left: 0, right: 0,
        elevation: 0,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    searchContainer: {
        flex: 1,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 8,
        ...DEFAULT_SHADOW,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: IS_ANDROID ? 'hidden' : 'visible'
    },
    menuBtn: {
        width: 56 + 8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.001)'
    },
    searchBtn: {
        paddingLeft: 64,
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0
    },
    searchText: {
        color: GRAY2,
        flex: 1,
        fontSize: 14
    },
})