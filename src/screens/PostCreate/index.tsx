import { useNavigation } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CreatePostInput } from '../../../__generated__/globalTypes'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import ImagesUpload from '../../components/uploads/ImagesUpload'
import { COLOR3, GRAY1, GRAY3 } from '../../constants/styles'
import { POST_TYPES } from '../../constants/values'
import { useCreatePost } from '../../graphql/post'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImagesUpload from '../../hooks/useImagesUpload'

const PostCreate = () => {

    const { goBack } = useNavigation()

    const { control, handleSubmit } = useForm<CreatePostInput>({
        defaultValues: {
            images: []
        }
    })
    const { selector } = useGlobalUi()

    const [createPost, { loading }] = useCreatePost()

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        if (loading) return

        const { errors } = await createPost({ variables: { data } })
        if (errors) return
        goBack()
    })

    return (
        <ScreenLayout>
            <Header title='글쓰기' />
            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
            >
                <Controller
                    control={control}
                    name='type'
                    rules={{ required: '주제를 선택해주세요' }}
                    render={({ field }) => (
                        <Pressable
                            onPress={() => selector({
                                list: POST_TYPES.map(v => v.name),
                                onSelect: (i) => {
                                    field.onChange(POST_TYPES[i].value)
                                }
                            })}
                            style={styles.typeContainer}
                        >
                            <Text style={{ color: !!field.value ? '#000' : GRAY1, flex: 1 }} >{POST_TYPES.find(v => v.value === field.value)?.name || '주제를 선택해주세요'}</Text>
                            <Icon name='keyboard-arrow-down' size={24} />
                        </Pressable>
                    )}
                />
                <Controller
                    control={control}
                    name='images'
                    render={({ field }) => (
                        <ImagesUpload
                            max={10}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='content'
                    rules={{ required: '내용을 입력해주세요' }}
                    render={({ field }) => (
                        <TextInput
                            style={styles.contentInput}
                            placeholderTextColor={GRAY1}
                            placeholder='반려동물에 관한 질문이나 산책공고를 올려보세요!'
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                    )}
                />
            </ScrollView>
            <Footer
                text='완료'
                // disable={ }
                loading={loading}
                onPress={onSubmit}
            />
        </ScreenLayout>
    )
}

export default PostCreate

const styles = StyleSheet.create({
    typeContainer: {
        width: '100%',
        paddingHorizontal: 16,
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    },
    contentInput: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    }
})