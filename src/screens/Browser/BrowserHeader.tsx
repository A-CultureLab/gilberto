import React, { useCallback } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'
import useGlobalUi from '../../hooks/useGlobalUi'
import Clipboard from '@react-native-clipboard/clipboard'

interface BrowserHeaderProps {
    url: string
}

const BrowserHeader: React.FC<BrowserHeaderProps> = ({ url }) => {

    const { goBack } = useNavigation()
    const { select, toast } = useGlobalUi()

    const onMore = useCallback(() => {
        select({
            list: ['다른 브라우저에서 보기', '링크복사'],
            onSelect: (i) => {
                if (i === 0) Linking.openURL(url)
                else if (i === 1) Clipboard.setString(url)
            }
        })
    }, [url])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={goBack}
                style={styles.btn}
                android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
            >
                <Icon name='keyboard-arrow-left' size={24} />
            </Pressable>
            <Pressable
                onPress={() => toast({ content: url })}
                style={styles.urlContainer}
            >
                <Text style={styles.url} numberOfLines={1}  >{url}</Text>
            </Pressable>
            <Pressable
                onPress={onMore}
                style={styles.btn}
                android_ripple={{ color: GRAY2, borderless: true, radius: 28 }}
            >
                <Icon name='more-vert' size={24} color={GRAY1} />
            </Pressable>
        </View>
    )
}

export default BrowserHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    urlContainer: {
        flex: 1,
        height: 24,
        backgroundColor: GRAY3,
        borderRadius: 4,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    url: {
        fontSize: 12,
        color: GRAY1
    }
})