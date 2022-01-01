import { useMutation } from '@apollo/client'
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

export interface MediaCreateProps {
    photos: string[]
}

const MediaCreate = () => {

    const { params } = useRoute<'MediaCreate'>()
    const { reset } = useNavigation()

    const { data: myPetsData } = useMyPets()
    const [createMedia, { loading }] = useCreateMedia()
    const [uploadImage, { loading: uploadImageLoading }] = useMutation<uploadImages, uploadImagesVariables>(UPLOAD_IMAGES)

    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState('')
    const [taggedPets, setTaggedPets] = useState<{ id: string, name: string, image: string }[]>([])



    const onSubmit = useCallback(async () => {
        if (loading) return
        const { data } = await uploadImage({
            variables: {
                images: params.photos.map((v, i) => generateImageToRNFile(v, Date.now().toString() + i.toString())),
                path: 'media/'
            }
        })
        if (!data) return
        const { errors } = await createMedia({
            variables: {
                input: {
                    content,
                    imageUrls: data.uploadImages,
                    taggedPetIds: taggedPets.map(v => v.id)
                }
            }
        })
        if (errors) return
        reset({ routes: [{ name: 'Tab' }] })
    }, [params, taggedPets, content, loading])



    return (
        <ScreenLayout>
            <Header
                title='게시물 생성'
                underline
                right={() =>
                    <Pressable style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }} onPress={onSubmit} >
                        {(loading || uploadImageLoading)
                            ? <ActivityIndicator size='small' color={COLOR1} />
                            : <Text style={{ fontWeight: 'bold', color: COLOR1 }} >등록</Text>
                        }
                    </Pressable>
                }
            />
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
                onChangeText={t => setContent(t)}
                maxLength={2000}
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

export default MediaCreate

const styles = StyleSheet.create({
    tagLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 24,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderTopWidth: 1,
        borderTopColor: GRAY3
    }
})