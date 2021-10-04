import { useNavigation, useRoute, Route } from '@react-navigation/core'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CreatePostInput, UpdatePostInput } from '../../../__generated__/globalTypes'
import Footer from '../../components/footers/Footer'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import ImagesUpload from '../../components/uploads/ImagesUpload'
import { GRAY1, GRAY3 } from '../../constants/styles'
import { POST_TYPES } from '../../constants/values'
import { usePost, useUpdatePost } from '../../graphql/post'
import useGlobalUi from '../../hooks/useGlobalUi'

interface PostEditProps {
    id: string
}

const PostEdit = () => {

    const { goBack } = useNavigation()
    const { params: { id } } = useRoute<Route<"PostEdit", PostEditProps>>()

    const { data } = usePost({ variables: { id }, fetchPolicy: 'network-only' })

    const { control, handleSubmit, formState, clearErrors, setValue } = useForm<UpdatePostInput>()
    const { selector, toast } = useGlobalUi()

    const [updatePost, { loading }] = useUpdatePost()

    const onSubmit = handleSubmit(async (data) => {
        if (loading) return

        const { errors } = await updatePost({ variables: { data } })
        if (errors) return

        goBack()
    })

    useEffect(() => {
        const errors = formState.errors
        if (Object.keys(errors).length === 0) return
        // @ts-ignore
        toast({ content: errors[Object.keys(errors)[0]].message })
        clearErrors()
    }, [formState])

    useEffect(() => {
        if (!data) return
        setValue("id", data.post.id)
        setValue('type', data.post.type)
        setValue('content', data.post.content)
        setValue("images", data.post.images.map(v => v.url))
    }, [data])

    return (
        <ScreenLayout>
            <Header title='글수정' />
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
                        <>
                            {
                                field.value
                                    ? <ImagesUpload
                                        max={10}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    : null
                            }
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name='content'
                    rules={{ required: '내용을 입력해주세요' }}
                    render={({ field }) => (
                        <View style={styles.contentInputContainer} >
                            <TextInput
                                multiline
                                maxLength={5000}
                                numberOfLines={20}
                                style={styles.contentInput}
                                placeholderTextColor={GRAY1}
                                placeholder='반려동물에 관한 질문이나 산책공고를 올려보세요!'
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        </View>
                    )}
                />
            </ScrollView>
            <Footer
                text='완료'
                loading={loading}
                onPress={onSubmit}
            />
        </ScreenLayout>
    )
}

export default PostEdit

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
    contentInputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    contentInput: {
        padding: 0,
        margin: 0,
        lineHeight: 20,
    }
})