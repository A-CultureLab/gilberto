import React, { useCallback, useContext, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity, Share, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import useNavigation from '../../hooks/useNavigation'
import { useIUser } from '../../graphql/user'
import { useMyPets } from '../../graphql/pet'
import FastImage from 'react-native-fast-image'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuIcon from '../../assets/svgs/menu.svg'
import followCountUnit from '../../utils/followCountUnit'
import PlusIcon from '../../assets/svgs/plus.svg'
import { useMediasByUserId } from '../../graphql/media'
import useRefreshing from '../../hooks/useRefreshing'
import useGlobalUi from '../../hooks/useGlobalUi'

const MyPage = () => {

    const { navigate } = useNavigation()
    const { select } = useGlobalUi()

    const { data: userData, refetch: iUserRefetch } = useIUser()
    const { data: petData, refetch: petRefetch } = useMyPets()
    const { data: media, refetch: mediaRefetch, fetchMore, loading } = useMediasByUserId({ variables: { userId: userData?.iUser.id || '' }, skip: !userData })
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

    const refreshing = useRefreshing(async () => {
        try {
            await Promise.all([
                iUserRefetch(),
                petRefetch(),
                mediaRefetch()
            ])
        } catch (error) { }
    })

    const onEndReached = async () => {
        if (fetchMoreLoading) return
        setFetchMoreLoading(true)
        await fetchMore({
            variables: {
                instagramEndCursor: media?.mediasByUserId.filter(v => !!v.media?.isInstagram).pop()?.instagramEndCursor,
                endCursor: media?.mediasByUserId.filter(v => !v.media?.isInstagram).pop()?.media.id
            }
        })
        setFetchMoreLoading(false)
    }

    const MENUS = [
        {
            title: '설정',
            onPress: () => navigate('Settings')
        },
        {
            title: '문의/건의',
            onPress: () => Linking.openURL('https://38do.kr/support')
        },
        {
            title: '친구에게 추천하기',
            onPress: () => Share.share({ message: 'https://38do.kr/download' })
        },
        {
            title: '인스타그램',
            onPress: () => Linking.openURL('https://www.instagram.com/38do.official')
        }
    ]

    const onMenu = useCallback(() => {
        select({
            list: MENUS.map(v => v.title),
            onSelect: (i) => { MENUS[i].onPress() }
        })
    }, [select])




    if (!userData || !petData) return null

    return (
        <ScreenLayout>
            <Header
                backBtn='none'
                title={userData.iUser.profileId}
                underline={false}
                right={() => <Pressable onPress={onMenu} style={styles.headerBtn} ><MenuIcon width={20} height={20} fill='#000' /></Pressable>}
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
                                            onPress={() => navigate('MyPets')}
                                            style={styles.petContainer}
                                        >
                                            <View style={styles.petImage} >
                                                <PlusIcon width={16} height={16} fill='#000' />
                                            </View>
                                            <Text style={{ fontSize: 12 }} >{!petData.myPets.length ? '동물추가' : '추가/편집'}</Text>
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
                                onPress={() => navigate('Follows', { type: 'followers', userId: userData.iUser.id })}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.iUser.followerCount)}</Text>
                                <Text>팔로워</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigate('Follows', { type: 'followings', userId: userData.iUser.id })}
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
                ListEmptyComponent={
                    loading
                        ?
                        <ActivityIndicator style={{ marginTop: 32 }} size='small' color={GRAY1} />
                        : <Text style={styles.emptyString} >게시물이 없습니다</Text>
                }
                ListFooterComponent={
                    fetchMoreLoading ? <ActivityIndicator style={{ marginVertical: 32 }} size='small' color={GRAY1} /> : null
                }
                renderItem={({ item }) =>
                    <Pressable>
                        <FastImage
                            style={{ width: WIDTH / 3, height: WIDTH / 3, }}
                            source={{ uri: item.thumnail }}
                        />
                        {item.media?.isInstagram && <IconMC style={styles.itemInstagramIcon} name='instagram' size={20} color={GRAY3} />}
                    </Pressable>
                }
                {...refreshing}
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                data={media?.mediasByUserId || []}
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