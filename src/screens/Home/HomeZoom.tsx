import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { HomeScreenContext } from '.'
import { DEFAULT_SHADOW, GRAY1, GRAY2 } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeZoom = () => {

    const { selectedGroupByAddress, setZoomLevel, zoomLevel } = useContext(HomeScreenContext)


    const onPlus = useCallback(() => {
        setZoomLevel(zoomLevel >= 3 ? 3 : zoomLevel + 1)
    }, [zoomLevel])

    const onMinus = useCallback(() => {
        setZoomLevel(zoomLevel <= 0 ? 0 : zoomLevel - 1)
    }, [zoomLevel])

    if (selectedGroupByAddress) return null

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onPlus}
                android_ripple={{ color: GRAY2 }}
                style={styles.btn}
            >
                <Icon name='add' color={GRAY1} size={16} />
            </Pressable>
            <Pressable
                onPress={onMinus}
                android_ripple={{ color: GRAY2 }}
                style={styles.btn}
            >
                <Icon name='remove' color={GRAY1} size={16} />
            </Pressable>
        </View>
    )
}

export default HomeZoom

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 16,
        width: 40,
        height: 100,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        ...DEFAULT_SHADOW
    },
    btn: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})