import React, { useCallback, useContext, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity, Share, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import useNavigation from '../../hooks/useNavigation'
import { useMyPets, usePet } from '../../graphql/pet'
import FastImage from 'react-native-fast-image'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import followCountUnit from '../../utils/followCountUnit'
import { useMediasByPetId, useMediasByUserId } from '../../graphql/media'
import useRefreshing from '../../hooks/useRefreshing'
import useRoute from '../../hooks/useRoute'
import genderGenerator from '../../lib/genderGenerator'
import { useIUser } from '../../graphql/user'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import { useDisFollowing, useFollowing } from '../../graphql/follow'
export interface PetDetailProps {
    id: string
}

const PetDetail = () => {

    const { push } = useNavigation()
    const { params: { id } } = useRoute<'PetDetail'>()
    const { select, toast } = useGlobalUi()

    const { data: iUserData } = useIUser()
    const { data: petData, refetch: petRefetch } = usePet({ variables: { id } })
    const { data: media, refetch: mediaRefetch, fetchMore, loading } = useMediasByPetId({ variables: { petId: id } })
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
    const [following] = useFollowing({ variables: { userId: petData?.pet.user.id || '' } })
    const [disFollowing] = useDisFollowing({ variables: { userId: petData?.pet.user.id || '' } })

    const [ended, setEnded] = useState(false)

    const isIUser = iUserData?.iUser.id === petData?.pet.user.id





    const refreshing = useRefreshing(async () => {
        try {
            await Promise.all([
                petRefetch(),
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
                skip: media?.mediasByPetId.length
            }
        })
        setEnded(!data.mediasByPetId.length)
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
        if (!petData) return
        if (petData.pet.user.isIFollowed) disFollowing().then(() => petRefetch())
        else following()
    }, [petData])

    const onChat = useCallback(() => {
        if (!petData) return
        push('ChatDetail', { userId: petData.pet.user.id })
    }, [petData])




    if (!petData || !iUserData) return null

    return (
        <ScreenLayout>
            <Header
                title={petData.pet.user.profileId}
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
                                <Pressable onPress={() => push('ImageDetail', { index: 0, urls: [petData.pet.image, petData.pet.user.image, ...petData.pet.user.pets.filter(v => v.id !== id).map(v => v.image)] })}>
                                    <FastImage
                                        style={styles.profileImage}
                                        source={{ uri: petData.pet.image }}
                                    />
                                </Pressable>
                                <View style={styles.profileLine} />
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={petData.pet.user.pets.filter(v => v.id !== petData.pet.id)}
                                    ListHeaderComponent={
                                        <Pressable
                                            style={[styles.petContainer, { marginLeft: 16 }]}
                                            onPress={() => push('UserDetail', { id: petData.pet.user.id })}
                                        >
                                            <FastImage
                                                source={{ uri: petData.pet.user.image }}
                                                style={[styles.petImage, { borderWidth: 1, borderColor: COLOR1 }]}
                                            />
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{petData.pet.user.name}</Text>
                                        </Pressable>

                                    }
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
                                <Text style={styles.name} >{petData.pet.name}</Text>
                                <Text style={{ fontWeight: 'bold', color: GRAY1, fontSize: 12, marginLeft: 8, marginBottom: 2 }} >{genderGenerator.pet(petData.pet.gender)} • {petData.pet.age} • {petData.pet.weight}kg</Text>
                            </View>
                            <Text style={styles.address} >{petData.pet.species}</Text>
                        </View>
                        <View style={styles.followInfoContainer} >
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(petData.pet.mediaCount)}</Text>
                                <Text>게시물</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => push('Follows', { type: 'followers', userId: petData.pet.user.id })}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(petData.pet.user.followerCount)}</Text>
                                <Text>팔로워</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => push('Follows', { type: 'followings', userId: petData.pet.user.id })}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(petData.pet.user.followingCount)}</Text>
                                <Text>팔로잉</Text>
                            </Pressable>
                            <View style={{ flex: 1 }} />
                            {iUserData.iUser.id !== petData.pet.user.id && <>
                                <Pressable
                                    onPress={onFollow}
                                    style={[styles.editProfileBtn, { marginRight: 12, backgroundColor: petData.pet.user.isIFollowed ? '#fff' : COLOR1 }]}
                                    android_ripple={{ color: GRAY2 }}
                                >
                                    <Text style={{ color: petData.pet.user.isIFollowed ? '#000' : '#fff', marginHorizontal: 3 }} >{petData.pet.user.isIFollowed ? '팔로잉' : '팔로우'}</Text>
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
                        {item.isInstagram && <IconMC style={styles.itemInstagramIcon} name='instagram' size={20} color={GRAY3} />}
                    </Pressable>
                }
                {...refreshing}
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                data={media?.mediasByPetId || []}
            />
        </ScreenLayout >
    )
}

export default PetDetail

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