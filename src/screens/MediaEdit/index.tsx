import { gql, useMutation } from '@apollo/client'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, COLOR3, GRAY3 } from '../../constants/styles'
import { useCreateMedia } from '../../graphql/media'
import { useMyPets } from '../../graphql/pet'
import { UPLOAD_IMAGES } from '../../graphql/util'
import { uploadImages, uploadImagesVariables } from '../../graphql/__generated__/uploadImages'
import useRoute from '../../hooks/useRoute'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PetSelectSheet from '../../components/selectors/PetSelectSheet'
import useNavigation from '../../hooks/useNavigation'
import generateImageToRNFile from '../../lib/generateRNFile'
import { createMutationHook, createQueryHook } from '../../lib/createApolloHook'
import { updateMedia, updateMediaVariables } from './__generated__/updateMedia'
import { prevMedia, prevMediaVariables } from './__generated__/prevMedia'
import useImagesUpload from '../../hooks/useImagesUpload'

const MEDIA = gql`
query prevMedia($id:String!) {
    media(id: $id) {
        id
        content
        tagedPets {
            id
            name
            image
        }
        images {
            id
            url
        }
    }
}
`

const UPDATE_MEDIA = gql`
mutation updateMedia($id:String!, $input:CreateMediaInput!) {
updateMedia(id: $id, input: $input) {
    id
    content
    images {
        id
        url
    }
    tagedPets {
        id
        name
        image
    }
}   
}
`

export interface MediaEditProps {
    id: string
}

const MediaEdit = () => {

    const { params: { id } } = useRoute<'MediaEdit'>()
    const { goBack } = useNavigation()

    const { data } = createQueryHook<prevMedia, prevMediaVariables>(MEDIA)({ variables: { id } })
    const { data: myPetsData } = useMyPets()

    const [updateMedia, { loading }] = createMutationHook<updateMedia, updateMediaVariables>(UPDATE_MEDIA)()
    const { images, imagesTemp, remove, selectAndUpload, loading: imageUploadLoading, uploadAble } = useImagesUpload(data?.media.images.map(v => v.url), 9)

    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState(data?.media.content || '')
    const [taggedPets, setTaggedPets] = useState<{ id: string, name: string, image: string }[]>(data?.media.tagedPets || [])



    const onSubmit = useCallback(async () => {
        if (loading || imageUploadLoading) return
        const { errors } = await updateMedia({
            variables: {
                id,
                input: {
                    content,
                    imageUrls: images,
                    taggedPetIds: taggedPets.map(v => v.id)
                }
            }
        })
        if (errors) return
        goBack()
    }, [id, taggedPets, content, loading, images, imageUploadLoading])



    return (
        <ScreenLayout>
            <Header
                title='게시물 생성'
                underline
                right={() =>
                    <Pressable style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }} onPress={onSubmit} >
                        {loading
                            ? <ActivityIndicator size='small' color={COLOR1} />
                            : <Text style={{ fontWeight: 'bold', color: COLOR1 }} >수정</Text>
                        }
                    </Pressable>
                }
            />

            <View style={{ width: '100%', height: 120 }} >
                <FlatList
                    horizontal
                    ListHeaderComponent={<View style={{ width: 20 }} />}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={[...images, ...imagesTemp]}
                    keyExtractor={item => item}
                    ListFooterComponent={
                        uploadAble
                            ?
                            <Pressable
                                onPress={() => selectAndUpload({ width: 1024, height: 1024 })}
                                style={{ alignItems: 'center', marginRight: 20 }}
                            >
                                <View style={{ width: 80, height: 80, borderRadius: 8, borderWidth: 1, borderColor: GRAY3, alignItems: 'center', justifyContent: 'center' }} >
                                    <Icon name='add' size={24} color={'#000'} />
                                </View>
                            </Pressable>
                            :
                            null
                    }
                    renderItem={({ item, index }) => (
                        <View style={{ marginRight: 20 }} >
                            <FastImage
                                style={{ width: 80, height: 80, borderRadius: 8 }}
                                source={{ uri: item }}
                            />
                            <Pressable
                                onPress={() => remove(index)}
                                style={{ position: 'absolute', right: -8, top: -8, backgroundColor: COLOR3, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Icon name='close' size={16} color={'#fff'} />
                            </Pressable>
                            {imageUploadLoading && <View style={{ position: 'absolute', right: 0, top: 0, left: 0, bottom: 0, borderRadius: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }} >
                                <ActivityIndicator size='small' />
                            </View>}
                        </View>
                    )}
                />
            </View>
            <Text style={styles.tagLabel} >태그</Text>
            <View style={{ height: 128, width: '100%' }} >
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    data={taggedPets}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListHeaderComponent={<View style={{ width: 20 }} />}
                    ListFooterComponent={
                        myPetsData?.myPets.length !== taggedPets.length
                            ?
                            <Pressable
                                onPress={() => setVisible(true)}
                                style={{ alignItems: 'center', marginRight: 20 }}
                            >
                                <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: GRAY3, alignItems: 'center', justifyContent: 'center' }} >
                                    <Icon name='add' size={24} color={'#000'} />
                                </View>
                                <Text style={{ marginTop: 8 }} >태그추가</Text>
                            </Pressable>
                            :
                            null
                    }
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', marginRight: 20 }} >
                            <View>
                                <FastImage
                                    style={{ width: 64, height: 64, borderRadius: 32 }}
                                    source={{ uri: item.image }}
                                />
                                <Pressable
                                    onPress={() => setTaggedPets(prev => prev.filter(v => v.id !== item.id))}
                                    style={{ position: 'absolute', right: 0, top: 0, backgroundColor: COLOR3, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Icon name='close' size={16} color={'#fff'} />
                                </Pressable>
                            </View>
                            <Text style={{ marginTop: 8 }} >{item.name}</Text>
                        </View>
                    )}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder='내용을 입력하세요'
                value={content}
                onChangeText={t => setContent(t)}
                maxLength={2000}
                placeholderTextColor='#ccc'
            />
            <PetSelectSheet
                visible={visible}
                onSelect={(pet) => { setTaggedPets(prev => [...prev, pet]); setVisible(false) }}
                onClose={() => setVisible(false)}
                list={myPetsData?.myPets.filter(v => !taggedPets.map(v => v.id).includes(v.id)) || []}
            />
        </ScreenLayout>
    )
}

export default MediaEdit

const styles = StyleSheet.create({
    tagLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 12
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderTopWidth: 1,
        borderTopColor: GRAY3,
        color: '#000'
    }
})