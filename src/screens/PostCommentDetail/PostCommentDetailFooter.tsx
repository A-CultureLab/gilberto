import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PostCommentDetailContext } from '.'
import { COLOR1, GRAY1, GRAY2 } from '../../constants/styles'
import { useCreatePostReplyComment } from '../../graphql/postReplyComment'
import { useIUser } from '../../graphql/user'
import useGlobalUi from '../../hooks/useGlobalUi'
import useImageUpload from '../../hooks/useImageUpload'

const PostCommentDetailFooter = () => {

    const { inputRef, postCommentId, refetch } = useContext(PostCommentDetailContext)
    const { toast } = useGlobalUi()

    const [createPostComment, { loading: createPostLoading }] = useCreatePostReplyComment()
    const { data: iUser } = useIUser()

    const [content, setContent] = useState('')
    const { selectAndUpload, image, clear, imageTemp, loading: imageUploadLoading } = useImageUpload('postReplyComment')


    const onSend = useCallback(async () => {
        if (imageUploadLoading) return
        if (createPostLoading) return
        if (!iUser) return
        if (!content) return toast({ content: '내용을 입력해주세요' })

        const { errors } = await createPostComment({
            variables: {
                data: {
                    image,
                    content,
                    postComment: { connect: { id: postCommentId } },
                    user: { connect: { id: iUser.iUser.id } }
                }
            }
        })
        if (errors) return toast({ content: '업로드 실패' })

        inputRef.current?.blur()
        inputRef.current?.clear()
        clear()
        setContent('')
        refetch()
    }, [image, content, imageUploadLoading, postCommentId, iUser, refetch])

    return (
        <View style={[styles.container]} >
            {(!!image || !!imageTemp) &&
                <View style={styles.imageContainer} >
                    <View>
                        <FastImage
                            style={styles.image}
                            source={{ uri: image || imageTemp || '' }}
                        />
                        {imageUploadLoading
                            ?
                            <View style={styles.imageLoadingWrapper} >
                                <ActivityIndicator size='small' color='#fff' />
                            </View>
                            :
                            <Pressable
                                onPress={clear}
                                style={styles.imageClose}
                            >
                                <Icon name='close' size={12} />
                            </Pressable>
                        }

                    </View>
                </View>
            }
            <Pressable
                android_ripple={{ color: GRAY2, radius: 28 }}
                onPress={() => selectAndUpload()}
                style={styles.btn}
            >
                <Icon name='image' color='#fff' size={24} />
            </Pressable>
            <View style={styles.inputContainer} >
                <TextInput
                    ref={inputRef}
                    value={content}
                    onChangeText={(t) => setContent(t)}
                    style={styles.input}
                    editable={!createPostLoading}
                    placeholderTextColor={GRAY1}
                    maxLength={2000}
                    multiline
                    placeholder='댓글을 입력해주세요'
                />
            </View>
            <Pressable
                android_ripple={{ color: GRAY2, radius: 28 }}
                onPress={onSend}
                style={styles.btn}
            >
                {createPostLoading ? <ActivityIndicator color='#fff' /> : <Icon name='send' color='#fff' size={20} />}
            </Pressable>
        </View>
    )
}

export default PostCommentDetailFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 56,
        backgroundColor: COLOR1
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 8,
        minHeight: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        maxHeight: 200,
        color: '#000',
        justifyContent: 'center',
        paddingVertical: 8
    },
    input: {
        margin: 0,
        padding: 0,
        textAlignVertical: 'center',
        color: '#000',
        width: '100%'
    },
    imageContainer: {
        position: 'absolute',
        bottom: 56,
        left: 0, right: 0,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 4
    },
    imageLoadingWrapper: {
        width: 64,
        height: 64,
        borderRadius: 4,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageClose: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        opacity: 0.5,
        borderRadius: 8,
        position: 'absolute',
        right: 4,
        top: 4
    }
})