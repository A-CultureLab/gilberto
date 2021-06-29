import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DEFAULT_SHADOW, GRAY1, GRAY2, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface HomeHeaderProps {

}

const HomeHeader: React.FC<HomeHeaderProps> = () => {


    return (
        <View style={styles.searchContainer} >
            <Pressable style={styles.menuBtn} >
                <Icon name='menu' size={24} color={GRAY2} />
            </Pressable>
            <Pressable style={styles.searchBtn} >
                <Text style={styles.searchText} >반려동물과 함께가고 싶은 곳</Text>
                <Icon name='search' size={22} color={GRAY2} style={{ marginHorizontal: 16 }} />
            </Pressable>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    searchContainer: {
        width: WIDTH - 32,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 8,
        position: 'absolute',
        top: STATUSBAR_HEIGHT + 16,
        left: 16,
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
        color: GRAY1,
        flex: 1,
        fontSize: 14
    },
    searchBtn: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    }
})