import React, { useCallback, useContext, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity, Share, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import useNavigation from '../../hooks/useNavigation'
import FastImage from 'react-native-fast-image'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import followCountUnit from '../../utils/followCountUnit'
import { useMediasByPetId, useMediasByUserId } from '../../graphql/media'
import useRefreshing from '../../hooks/useRefreshing'
import useRoute from '../../hooks/useRoute'
import { useIUser, useUser } from '../../graphql/user'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import meterUnit from '../../utils/meterUnit'
import { useDisFollowing, useFollowing } from '../../graphql/follow'

export interface UserDetailProps {
    id: string
}

const UserDetail = () => {

    const { push } = useNavigation()
    const { params: { id } } = useRoute<'UserDetail'>()
    const { select, toast } = useGlobalUi()

    const { data: iUserData } = useIUser()
    const { data: userData, refetch: userRefetch } = useUser({ variables: { where: { id } } })
    const { data: media, refetch: mediaRefetch, fetchMore, loading } = useMediasByUserId({ variables: { userId: id } })
    const [following] = useFollowing({ variables: { userId: id } })
    const [disFollowing] = useDisFollowing({ variables: { userId: id } })

    const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

    const [ended, setEnded] = useState(false)

    const isIUser = iUserData?.iUser.id === userData?.user.id





    const refreshing = useRefreshing(async () => {
        try {
            await Promise.all([
                userRefetch(),
                mediaRefetch()
            ])
        } catch (error) { }
    })

    const onEndReached = async () => {
        if (fetchMoreLoading) return
        if (ended) return
        setFetchMoreLoading(true)
        const { data } = await fetchMore({
            variables: {
                instagramEndCursor: media?.mediasByUserId.filter(v => !!v.media?.isInstagram).pop()?.instagramEndCursor,
                endCursor: media?.mediasByUserId.filter(v => !v.media?.isInstagram).pop()?.media.id
            }
        })
        setEnded(!data.mediasByUserId.length)
        setFetchMoreLoading(false)
    }

    const onMore = useCallback(() => {
        select({
            list: ['신고하기'],
            onSelect: (i) => {
                if (i === 0) toast({ content: '신고가 접수되었습니다' })
            }
        })
    }, [isIUser])

    const onFollow = useCallback(() => {
        if (!userData) return
        if (userData.user.isIFollowed) disFollowing().then(() => userRefetch())
        else following()
    }, [userData])

    const onChat = useCallback(() => {
        if (!userData) return
        push('ChatDetail', { userId: userData.user.id })
    }, [userData])




    if (!userData || !iUserData) return null

    return (
        <ScreenLayout>
            <Header
                title={userData.user.profileId}
                underline={false}
                right={() => <Pressable onPress={onMore} style={styles.headerBtn} ><Icon size={24} color={GRAY1} name='more-vert' /></Pressable>}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                ListHeaderComponent={
                    <>
                        <View style={styles.profileInfoContainer} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Pressable onPress={() => push('ImageDetail', { index: 0, urls: [userData.user.image, ...userData.user.pets.map(v => v.image)] })}>
                                    <FastImage
                                        style={styles.profileImage}
                                        source={{ uri: userData.user.image }}
                                    />
                                </Pressable>
                                <View style={styles.profileLine} />
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={userData.user.pets}
                                    renderItem={({ item }) =>
                                        <Pressable
                                            style={styles.petContainer}
                                            onPress={() => push('PetDetail', { id: item.id })}
                                        >
                                            <FastImage
                                                source={{ uri: item.image }}
                                                style={styles.petImage}
                                            />
                                            <Text style={{ fontSize: 12 }} >{item.name}</Text>
                                        </Pressable>
                                    }
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 24 }} >
                                <Text style={styles.name} >{userData.user.name}</Text>
                            </View>
                            <Text style={styles.address} >{!isIUser ? `${meterUnit(userData.user.address.distance || 0)} • ` : ''}{userData.user.address.addressFull}</Text>
                            {!!userData.user.introduce && <Text style={{ marginTop: 16 }} >{userData.user.introduce}</Text>}
                        </View>
                        <View style={styles.followInfoContainer} >
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.user.mediaCount)}</Text>
                                <Text>게시물</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => push('Follows', { type: 'followers', userId: userData.user.id })}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.user.followerCount)}</Text>
                                <Text>팔로워</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => push('Follows', { type: 'followings', userId: userData.user.id })}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(userData.user.followingCount)}</Text>
                                <Text>팔로잉</Text>
                            </Pressable>
                            <View style={{ flex: 1 }} />
                            {iUserData.iUser.id !== userData.user.id && <>
                                <Pressable
                                    onPress={onFollow}
                                    style={[styles.editProfileBtn, { marginRight: 12, backgroundColor: userData.user.isIFollowed ? '#fff' : COLOR1 }]}
                                    android_ripple={{ color: GRAY2 }}
                                >
                                    <Text style={{ color: userData.user.isIFollowed ? '#000' : '#fff', marginHorizontal: 3 }} >{userData.user.isIFollowed ? '팔로잉' : '팔로우'}</Text>
                                </Pressable>
                                <Pressable
                                    onPress={onChat}
                                    style={styles.editProfileBtn}
                                    android_ripple={{ color: GRAY2 }}
                                >
                                    <Text>채팅</Text>
                                </Pressable>
                            </>}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    loading
                        ?
                        <ActivityIndicator style={{ marginTop: 32 }
                        } size='small' color={GRAY1} />
                        : <Text style={styles.emptyString} >게시물이 없습니다</Text>
                }
                ListFooterComponent={
                    fetchMoreLoading ? <ActivityIndicator style={{ marginVertical: 32 }
                    } size='small' color={GRAY1} /> : null
                }
                renderItem={({ item }) =>
                    <Pressable onPress={() => push('MediaDetail', { id: item.id })} >
                        <FastImage
                            style={{ width: WIDTH / 3, height: WIDTH / 3, }}
                            source={{ uri: item.thumnail }}
                        />
                        {item.media.isInstagram && <IconMC style={styles.itemInstagramIcon} name='instagram' size={20} color={GRAY3} />}
                    </Pressable>
                }
                {...refreshing}
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                data={media?.mediasByUserId || []}
            />
        </ScreenLayout >
    )
}

export default UserDetail

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