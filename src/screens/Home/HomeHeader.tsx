import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DEFAULT_SHADOW, GRAY1, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HomeScreenContext } from '.'

interface HomeHeaderProps {

}

const HomeHeader: React.FC<HomeHeaderProps> = () => {

    const { setCategoryVerticalMode } = useContext(HomeScreenContext)

    return (
        <View style={[styles.container]} >
            <View style={styles.searchContainer} >
                <Pressable onPress={() => setCategoryVerticalMode(true)} style={styles.menuBtn} >
                    <Icon name='menu' size={24} color={GRAY2} />
                </Pressable>
                <Pressable style={styles.searchBtn} >
                    <Text style={styles.searchText} >반려동물과 함께가고 싶은 곳</Text>
                    <Icon name='search' size={22} color={GRAY2} style={{ marginHorizontal: 16 }} />
                </Pressable>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 16,
        left: 0, right: 0,
        elevation: 0
    },
    searchContainer: {
        marginLeft: 16,
        width: WIDTH - 32,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 8,
        ...DEFAULT_SHADOW,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
    },
    searchText: {
        color: GRAY2,
        flex: 1,
        fontSize: 16
    },
    searchBtn: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    }
})