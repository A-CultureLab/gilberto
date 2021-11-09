import useNavigation from '../../hooks/useNavigation'
import React, { useCallback, useContext } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, COLOR3, DEFAULT_SHADOW, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import { useIUser, useUser } from '../../graphql/user'
import genderGenerator from '../../lib/genderGenerator'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import { AuthContext } from '..'
import useRoute from '../../hooks/useRoute'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import meterUnit from '../../utils/meterUnit'
import useRefreshing from '../../hooks/useRefreshing'
import { useMediasByUserId } from '../../graphql/media'
import followCountUnit from '../../utils/followCountUnit'

export interface UserDetailProps {
    id: string
}

const UserDetail = () => {

    const { params: { id } } = useRoute<'UserDetail'>()
    const { data } = useUser({ variables: { where: { id } } })
    const { user: iUser } = useContext(AuthContext)
    const { data: iUserData, refetch: iUserRefetch } = useIUser({ skip: !iUser, fetchPolicy: 'cache-only' })
    const { data: media, refetch: mediaRefetch, fetchMore, loading } = useMediasByUserId({ variables: { userId: id } })
    const { select, toast } = useGlobalUi()
    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const refreshing = useRefreshing(async () => {
        try {
            await iUserRefetch()
            await mediaRefetch()
        } catch (error) {

        }
    })

    const user = data?.user
    const isIUser = iUserData?.iUser.id === user?.id

    const onMore = useCallback(() => {
        if (isIUser) return
        select({
            list: ['신고하기'],
            onSelect: (i) => {
                if (i === 0) toast({ content: '신고가 접수되었습니다' })
            }
        })
    }, [isIUser])

    return (
        <ScreenLayout>
            <Header
                underline={false}
                right={() =>
                    !isIUser
                        ? <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Pressable
                                onPress={onMore}
                                android_ripple={{ color: GRAY2, radius: 28 }}
                                style={styles.headerBtn}
                            >
                                <Icon size={24} color={GRAY1} name='more-vert' />
                            </Pressable>
                        </View>
                        : null
                }
            />
            {user && <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                ListHeaderComponent={
                    <>
                        <View style={styles.profileInfoContainer} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Pressable onPress={() => navigate('ImageDetail', { index: 0, urls: [user.image, ...user.pets.map(v => v.image)] })}>
                                    <FastImage
                                        style={styles.profileImage}
                                        source={{ uri: user.image }}
                                    />
                                </Pressable>
                                {!!user.pets.length && <View style={styles.profileLine} />}
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={user.pets}
                                    ListHeaderComponent={<View style={{ width: 16 }} />}
                                    renderItem={({ item }) =>
                                        <Pressable
                                            onPress={() => navigate('PetDetail', { id: item.id })}
                                        >
                                            <FastImage
                                                source={{ uri: item.image }}
                                                style={styles.petImage}
                                            />
                                        </Pressable>
                                    }
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 24 }} >
                                <Text style={styles.age} >{user.name}</Text>
                                <Text style={styles.genderAge} >{genderGenerator.user(user.gender)}, {user.age}세</Text>
                            </View>
                            <Text style={styles.address} >{!isIUser ? `${meterUnit(user.address.distance || 0)} • ` : ''}{user.address.addressFull}</Text>
                            {!!user.introduce && <Text style={{ marginTop: 16 }} >{user.introduce}</Text>}
                        </View>
                        <View style={styles.followInfoContainer} >
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(user.mediaCount)}</Text>
                                <Text>게시물</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(user.followerCount)}</Text>
                                <Text>팔로워</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => { }}
                                android_ripple={{ color: GRAY2 }}
                                style={styles.followInfoBtn}
                            >
                                <Text style={styles.followInfoCount} >{followCountUnit(user.followingCount)}</Text>
                                <Text>팔로잉</Text>
                            </Pressable>
                            <View style={{ flex: 1 }} />
                            {!isIUser && <>
                                <Pressable
                                    onPress={() => { }}
                                    android_ripple={{ color: GRAY2 }}
                                    style={user.isIFollowed ? styles.chatBtn : styles.followBtn}
                                >
                                    <Text style={{ color: user.isIFollowed ? GRAY1 : '#fff' }} >팔로우</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => navigate('ChatDetail', { userId: id })}
                                    android_ripple={{ color: GRAY2 }}
                                    style={user.isIFollowed ? styles.followBtn : styles.chatBtn}
                                >
                                    <Text style={{ color: user.isIFollowed ? '#fff' : GRAY1 }} >채팅</Text>
                                </Pressable>
                            </>}
                        </View>
                        {!!user.instagramId && <View style={styles.instagramIdContainer} >
                            <IconMC name='instagram' size={20} color={'#aaa'} />
                            <Text style={styles.instagramId} >@{user.instagramId}</Text>
                        </View>}
                    </>
                }
                {...refreshing}
                ListFooterComponent={<View style={{ height: bottom }} />}
                ListEmptyComponent={
                    loading
                        ?
                        <ActivityIndicator style={{ marginTop: 32 }} size='small' color={GRAY1} />
                        : <Text style={styles.emptyString} >게시물이 없습니다</Text>
                }
                renderItem={({ item }) =>
                    <Pressable>
                        <FastImage
                            style={{ width: WIDTH / 3, height: WIDTH / 3, }}
                            source={{ uri: item.thumnail }}
                        />
                        {item.media.isInstagram && <IconMC style={styles.itemInstagramIcon} name='instagram' size={20} color={GRAY3} />}
                    </Pressable>
                }
                numColumns={3}
                onEndReached={() => fetchMore({ variables: { instagramEndCursor: media?.mediasByUserId.filter(v => !!v.media.isInstagram).pop()?.instagramEndCursor } })}
                onEndReachedThreshold={0.5}
                data={media?.mediasByUserId || []}
            />
            }
        </ScreenLayout>
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
    chat: {
        color: COLOR1,
        fontWeight: 'bold'
    },
    profileImage: {
        width: 56,
        height: 56,
        marginRight: 16,
        borderRadius: 28
    },
    profileLine: {
        width: 1,
        height: 32,
        backgroundColor: '#eee'
    },
    profileInfoContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    petImage: {
        width: 56,
        height: 56,
        marginRight: 16,
        borderRadius: 28
    },
    age: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    genderAge: {
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 8,
        color: GRAY1
    },
    address: {
        marginTop: 16,
        color: GRAY1
    },
    introduceContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    followInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 24,
        paddingLeft: 4,
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
    chatBtn: {
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: GRAY2,
        marginLeft: 16
    },
    instagramIdContainer: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    instagramId: {
        color: GRAY1,
        marginLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
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
