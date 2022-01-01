import React, { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { COLOR1, GRAY1, GRAY3 } from '../../../constants/styles'
import { useFollowing } from '../../../graphql/follow'
import { media_media } from '../../../graphql/__generated__/media'
import useGlobalUi from '../../../hooks/useGlobalUi'
import useNavigation from '../../../hooks/useNavigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import MediaCardImageCarousel from './MediaCardImageCarousel'
import HeartIcon from '../../../assets/svgs/heart.svg'
import HeartFillIcon from '../../../assets/svgs/heart_fill.svg'
import ChatIcon from '../../../assets/svgs/chat.svg'
import PetSelectSheet from '../../selectors/PetSelectSheet'
import { useDisLikeMedia, useLikeMedia } from '../../../graphql/media'
import ReadMore from '@fawazahmed/react-native-read-more';
import ReadMoreText from '../../texts/ReadMoreText'
import meterUnit from '../../../utils/meterUnit'
import { gql } from '@apollo/client'
import { createMutationHook } from '../../../lib/createApolloHook'
import { deleteMedia, deleteMediaVariables } from './__generated__/deleteMedia'

const DELETE_MEDIA = gql`
mutation deleteMedia($id:String!) {
    deleteMedia(id: $id) {
        id
    }
}
`


const MediaCard: React.FC<media_media> = (props) => {

    const { id, content, images, tagedPets, user, commentCount, recentComments, likeCount, isILiked, isInstagram } = props

    const { navigate, goBack } = useNavigation()
    const { toast, select, confirm } = useGlobalUi()

    const [deleteMedia] = createMutationHook<deleteMedia, deleteMediaVariables>(DELETE_MEDIA)({ variables: { id } })
    const [following] = useFollowing({ variables: { userId: user.id } })
    const [likeMedia] = useLikeMedia({ variables: { id } })
    const [disLikeMedia] = useDisLikeMedia({ variables: { id } })

    const [taggedPetsModalVisible, setTaggedPetsModalVisible] = useState(false)


    const onMore = useCallback(() => {
        if (!user.isMe)
            return select({
                list: ['신고하기'],
                onSelect: (i) => {
                    if (i === 0) toast({ content: '신고가 접수되었습니다' })
                }
            })
        if (!isInstagram) return select({
            list: ['삭제하기', '수정하기'],
            onSelect: (i) => {
                if (i === 0) confirm({
                    title: '삭제하기',
                    content: '정말 삭제하시겠습니까?',
                    onPress: async (isYes) => {
                        if (!isYes) return
                        const { data } = await deleteMedia()
                        if (!data) return
                        goBack()
                    }
                })
                if (i === 1) navigate('MediaEdit', { id })
            }
        })
    }, [user, isInstagram, id])

    const onLike = useCallback(() => {
        if (isILiked) disLikeMedia()
        else likeMedia()
    }, [isILiked])


    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Pressable
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                    onPress={() => navigate('UserDetail', { id: user.id })}
                >
                    <FastImage
                        style={{ height: 28, width: 28, borderRadius: 14, marginRight: 12 }}
                        source={{ uri: user.image }}
                    />
                    <Text>{user.profileId}</Text>
                    <Text style={{ color: GRAY1 }} > • {meterUnit(user.address.distance || 0)}</Text>
                    {(!user.isIFollowed && !user.isMe) && <Pressable onPress={() => following()} >
                        <Text style={{ color: COLOR1 }} ><Text style={{ color: GRAY1 }} > • </Text>팔로우</Text>
                    </Pressable>}
                </Pressable>
                <Pressable onPress={onMore} style={styles.headerBtn} ><Icon size={24} color={GRAY1} name='more-vert' /></Pressable>
            </View>
            <View>
                <MediaCardImageCarousel
                    urls={images.map(v => v.url)}
                />
                {isInstagram && <Icon2 style={{ position: 'absolute', right: 16, bottom: 16 }} size={24} color='#fff' name='instagram' />}
            </View>
            <View style={styles.optionBar} >
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} onPress={onLike} >
                    {isILiked ? <HeartFillIcon width={24} height={24} fill={COLOR1} /> : <HeartIcon width={24} height={24} fill={'#000'} />}
                    <Text style={{ fontWeight: 'bold', marginLeft: 8 }} >{likeCount.toLocaleString()}</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} onPress={() => navigate('MediaComments', { mediaId: id })} >
                    <ChatIcon width={24} height={24} fill={'#000'} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 8 }} >{commentCount.toLocaleString()}</Text>
                </Pressable>
                <View style={{ flex: 1 }} />
                {!!tagedPets.length && <Pressable
                    style={{ flexDirection: "row", alignItems: 'center' }}
                    onPress={() => setTaggedPetsModalVisible(true)}
                >
                    <Text style={{ fontSize: 12, color: GRAY1, marginRight: 8 }} >태그됨</Text>
                    <FastImage
                        style={{ width: 24, height: 24, borderRadius: 12 }}
                        source={{ uri: tagedPets[0].image }}
                    />
                    {tagedPets.length >= 2 &&
                        <View style={{ marginLeft: 4 }} >
                            <FastImage
                                style={{ width: 24, height: 24, borderRadius: 12 }}
                                source={{ uri: tagedPets[1].image }}
                            />
                            {tagedPets.length >= 3 &&
                                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ color: '#fff', fontSize: 8 }} >+{tagedPets.length - 2}</Text>
                                </View>
                            }
                        </View>
                    }
                </Pressable>}
            </View>

            <View style={styles.contentContainer} >
                <ReadMoreText>{content}</ReadMoreText>
            </View>

            {!!recentComments.length && <Pressable
                onPress={() => navigate('MediaComments', { mediaId: id })}
                style={styles.commentsContainer}
            >
                <Text style={{ color: GRAY1 }} >댓글 {commentCount}개 모두 보기</Text>
                {recentComments.map(({ id, content, user }) => (
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', marginTop: 4 }} key={id} >{user.profileId} <Text style={{ fontWeight: 'normal' }} >{content}</Text></Text>
                ))}
            </Pressable>}
            <PetSelectSheet
                visible={taggedPetsModalVisible}
                onSelect={(pet) => {
                    setTaggedPetsModalVisible(false)
                    navigate('PetDetail', { id: pet.id })
                }}
                onClose={() => setTaggedPetsModalVisible(false)}
                list={tagedPets}
            />
        </View>
    )
}

export default MediaCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    header: {
        width: '100%',
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
    },
    headerBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionBar: {
        width: '100%',
        height: 48,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    commentsContainer: {
        paddingHorizontal: 20,
        marginBottom: 16
    }
})