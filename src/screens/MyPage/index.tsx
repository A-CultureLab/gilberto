import React, { useContext } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity, Share, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, COLOR2, COLOR3, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import useNavigation from '../../hooks/useNavigation'
import { useIUser } from '../../graphql/user'
import { useMyPets } from '../../graphql/pet'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuIcon from '../../assets/svgs/menu.svg'
import followCountUnit from '../../utils/followCountUnit'
import PlusIcon from '../../assets/svgs/plus.svg'

const MyPage = () => {

    const { navigate } = useNavigation()
    const { data: userData } = useIUser()
    const { data: petData } = useMyPets()


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
            title: '친구에게 추천하기',
            icon: <Icon name='share' color={GRAY2} size={16} />,
            onPress: () => Share.share({ message: 'https://38do.kr/download' })
        },
        {
            title: '인스타그램',
            icon: <IconMC name='instagram' color={GRAY2} size={16} />,
            onPress: () => Linking.openURL('https://www.instagram.com/38do.official')
        }
    ]

    if (!userData || !petData) return null

    return (
        <ScreenLayout>
            <Header
                backBtn='none'
                title={userData.iUser.profileId}
                underline={false}
                right={() => <Pressable style={styles.headerBtn} ><MenuIcon width={20} height={20} fill='#000' /></Pressable>}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                ListHeaderComponent={
                    <>
                        <View style={styles.profileInfoContainer} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Pressable onPress={() => navigate('ImageDetail', { index: 0, urls: [userData.iUser.image, ...petData.myPets.map(v => v.image)] })}>
                                    <FastImage
                                        style={styles.profileImage}
                                        source={{ uri: userData.iUser.image }}
                                    />
                                </Pressable>
                                <View style={styles.profileLine} />
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={petData.myPets}
                                    ListHeaderComponent={<View style={{ width: 16 }} />}
                                    renderItem={({ item }) =>
                                        <Pressable
                                            style={styles.petContainer}
                                            onPress={() => navigate('PetDetail', { id: item.id })}
                                        >
                                            <FastImage
                                                source={{ uri: item.image }}
                                                style={styles.petImage}
                                            />
                                            <Text style={{ fontSize: 12 }} >{item.name}</Text>
                                        </Pressable>
                                    }
                                    ListFooterComponent={
                                        <Pressable
                                            onPress={() => navigate('PetList')}
                                            style={styles.petContainer}
                                        >
                                            <View style={styles.petImage} >
                                                <PlusIcon width={16} height={16} fill='#000' />
                                            </View>
                                            <Text style={{ fontSize: 12 }} >추가/편집</Text>
                                        </Pressable>
                                    }
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 24 }} >
                                <Text style={styles.name} >{userData.iUser.name}</Text>
                            </View>
                            <Text style={styles.address} >{userData.iUser.address.addressFull}</Text>
                            {!!userData.iUser.introduce && <Text style={{ marginTop: 16 }} >{userData.iUser.introduce}</Text>}
                        </View>
                        <View style={styles.followInfoContainer} >
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.iUser.mediaCount)}</Text>
                                <Text>게시물</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.iUser.followerCount)}</Text>
                                <Text>팔로워</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.iUser.followingCount)}</Text>
                                <Text>팔로잉</Text>
                            </Pressable>
                            <View style={{ flex: 1 }} />
                            <Pressable
                                onPress={() => navigate('ProfileModify')}
                                style={styles.editProfileBtn}
                                android_ripple={{ color: GRAY2 }}
                            >
                                <Text>프로필 수정</Text>
                            </Pressable>
                        </View>
                    </>
                }
                // {...refreshing}
                ListEmptyComponent={
                    false // TODO
                        ?
                        <ActivityIndicator style={{ marginTop: 32 }} size='small' color={GRAY1} />
                        : <Text style={styles.emptyString} >게시물이 없습니다</Text>
                }
                renderItem={({ item }) =>
                    <Pressable>
                        {/* <FastImage
                            style={{ width: WIDTH / 3, height: WIDTH / 3, }}
                        source={{ uri: item.thumnail }}
                        /> */}
                        {/* {item.media.isInstagram && <IconMC style={styles.itemInstagramIcon} name='instagram' size={20} color={GRAY3} />} */}
                    </Pressable>
                }
                numColumns={3}
                // onEndReached={() => fetchMore({ variables: { instagramEndCursor: media?.mediasByUserId.filter(v => !!v.media.isInstagram).pop()?.instagramEndCursor } })}
                onEndReachedThreshold={0.5}
                data={[]}
            />
            < TabScreenBottomTabBar />
        </ScreenLayout >
    )
}

export default MyPage

const styles = StyleSheet.create({
    headerBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 80,
        height: 80,
        marginRight: 20,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: GRAY3
    },
    profileLine: {
        width: 1,
        height: 60,
        backgroundColor: '#eee'
    },
    profileInfoContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    petContainer: {
        height: 80,
        alignItems: 'center',
        marginRight: 16,
    },
    petImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: GRAY3,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        marginTop: 12,
        color: GRAY1
    },
    introduceContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    followInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 24,
        paddingLeft: 8,
        paddingRight: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
    },
    followInfoBtn: {
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    followInfoCount: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    followBtn: {
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR1,
        marginLeft: 16
    },
    editProfileBtn: {
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: GRAY3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyString: {
        alignSelf: 'center',
        marginTop: 40,
        color: GRAY1
    },
    itemInstagramIcon: {
        position: 'absolute',
        bottom: 8,
        right: 8
    }
})