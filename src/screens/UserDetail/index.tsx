import useNavigation from '../../hooks/useNavigation'
import React, { useCallback, useContext } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, DEFAULT_SHADOW, GRAY1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
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

export interface UserDetailProps {
    id: string
}

const UserDetail = () => {

    const { params: { id } } = useRoute<'UserDetail'>()
    const { data } = useUser({ variables: { where: { id } } })
    const { user: iUser } = useContext(AuthContext)
    const { data: iUserData, refetch } = useIUser({ skip: !iUser, fetchPolicy: 'cache-only' })
    const { select, toast } = useGlobalUi()
    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const refreshing = useRefreshing(refetch)

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
                            <Pressable onPress={() => navigate('ChatDetail', { userId: id })} >
                                <Text style={styles.chat} >채팅하기</Text>
                            </Pressable>
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
                        </View>
                        {!!user.introduce && <View style={styles.introduceContainer} >
                            <Text>{user.introduce}</Text>
                        </View>}
                        {!!user.instagramId && <View style={styles.instagramIdContainer} >
                            <IconMC name='instagram' size={24} color={GRAY1} />
                            <Text style={styles.instagramId} >@{user.instagramId}</Text>
                        </View>}
                    </>
                }
                {...refreshing}
                ListFooterComponent={<View style={{ height: bottom }} />}
                renderItem={({ index }) =>
                    <View style={{ width: WIDTH / 3, height: WIDTH / 3, backgroundColor: GRAY2, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ textAlign: 'center' }} >{`Templete\nMedia\n${index.toString()}`}</Text>
                    </View>
                }
                numColumns={3}
                // data={Array(20).fill(0)}
                data={[]}
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
        paddingVertical: 24,
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
    }
})
