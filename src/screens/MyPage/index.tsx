import React, { useContext } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR2, COLOR3, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import { useNavigation } from '@react-navigation/core'
import { useIUser } from '../../graphql/user'
import { useMyPets } from '../../graphql/pet'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '..'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'



const MyPage = () => {

    const { navigate } = useNavigation()
    const { user } = useContext(AuthContext)
    const { data: userData } = useIUser({ skip: !user })
    const { data: petData } = useMyPets({ skip: !user })
    const { bottom } = useSafeAreaInsets()


    const MENUS = [
        {
            title: '설정',
            icon: <Icon name='settings' color={GRAY2} size={16} />,
            onPress: () => navigate('Settings')
        },
        {
            title: '문의/건의',
            icon: <Icon name='chat' color={GRAY2} size={16} />,
            onPress: () => Linking.openURL('https://38do.kr/support')
        },
        {
            title: '이용약관',
            icon: <Icon name='check-circle' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '서비스 이용약관', url: 'https://38do.kr/agreement' })
        },
        {
            title: '개인정보 처리방침',
            icon: <Icon name='verified-user' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '개인정보 처리방침', url: 'https://38do.kr/privacy-policy' })
        },
        {
            title: '위치기반 서비스 이용약관',
            icon: <Icon name='my-location' color={GRAY2} size={16} />,
            onPress: () => navigate('WebView', { title: '위치기반 서비스 이용약관', url: 'https://38do.kr/agreement-location' })
        }
    ]

    return (
        <ScreenLayout>
            <Header backBtn='none' title='마이페이지' underline={false} />
            <View
                style={styles.profileContainer}
            >
                {user ?
                    <ScrollView
                        horizontal
                        overScrollMode='never'
                        showsHorizontalScrollIndicator={false}
                    >
                        <Pressable
                            onPress={() => navigate('Profile')}
                            android_ripple={{ color: GRAY2 }}
                            style={{ height: '100%', flexDirection: 'row', alignItems: 'center', minWidth: WIDTH }}
                        >
                            <FastImage
                                style={styles.image}
                                source={{ uri: userData?.iUser?.image }}
                            />
                            <View style={styles.line} />
                            {(petData?.myPets || []).length
                                ? <>
                                    {(petData?.myPets || []).map(({ image }, index) => (
                                        <FastImage
                                            key={index.toString()}
                                            style={styles.image}
                                            source={{ uri: image }}
                                        />
                                    ))}
                                    <Icon name='arrow-forward' color={GRAY2} size={24} style={{ alignSelf: 'center', marginHorizontal: 24 }} />
                                </>
                                : <Text style={styles.petRegistComment} >반려동물을 등록해주세요</Text>
                            }
                        </Pressable>
                    </ScrollView>
                    : <Pressable
                        onPress={() => navigate('Login')}
                        android_ripple={{ color: GRAY2 }}
                        style={{ height: '100%', flexDirection: 'row', alignItems: 'center', width: WIDTH }}
                    >
                        <Text style={[styles.petRegistComment, { marginLeft: 24 }]} >로그인을 해주세요</Text>
                    </Pressable>}
            </View>
            <View style={{ marginTop: 16, flex: 1 }}>
                {MENUS.map(({ icon, title, onPress }) => (
                    <Pressable
                        key={title}
                        onPress={onPress}
                        android_ripple={{ color: GRAY2 }}
                        style={styles.menuContainer}
                    >
                        {icon}
                        <Text style={styles.menuTitle} >{title}</Text>
                    </Pressable>
                ))}
            </View>
            < TabScreenBottomTabBar />
        </ScreenLayout >
    )
}

export default MyPage

const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        height: 56 + 24 + 24,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1,

    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginLeft: 16,
        alignSelf: 'center'
    },
    line: {
        width: 1,
        height: 32,
        backgroundColor: GRAY3,
        marginLeft: 16,
        alignSelf: 'center'
    },
    petRegistComment: {
        alignSelf: 'center',
        marginLeft: 16,
        fontSize: 14,
        color: GRAY1
    },
    menuContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    menuTitle: {
        marginLeft: 16
    },

})