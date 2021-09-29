import { useApolloClient } from "@apollo/client"
import { useCallback, useState } from "react"
import ImageCropPicker, { Options } from "react-native-image-crop-picker"
import { UPLOAD_IMAGE } from "../graphql/util"
import { uploadImage, uploadImageVariables } from "../graphql/__generated__/uploadImage"
import generateImageToRNFile from "../lib/generateRNFile"
import useGlobalUi from "./useGlobalUi"

const useImageUpload = (fileName = 'image') => {

    const { mutate } = useApolloClient()
    const { selector } = useGlobalUi()

    const [image, setImage] = useState<null | string>(null)
    const [imageTemp, setImageTemp] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const clear = useCallback(() => {
        setImage(null)
        setImageTemp(null)
        setLoading(false)
    }, [])

    const upload = async (option?: Options & { camera?: boolean }, _path: string = 'image/') => {
        try {
            if (loading) return
            setLoading(true)

            const { path } = !option?.camera
                ? await ImageCropPicker.openPicker({
                    cropping: true,
                    cropperCancelText: '취소',
                    loadingLabelText: '불러오는중',
                    cropperChooseText: '완료',
                    mediaType: 'photo',
                    compressImageQuality: 0.8,
                    ...option,
                    multiple: false,
                })
                : await ImageCropPicker.openCamera({
                    cropping: true,
                    cropperCancelText: '취소',
                    loadingLabelText: '불러오는중',
                    cropperChooseText: '완료',
                    mediaType: 'photo',
                    compressImageQuality: 0.8,
                    ...option,
                    multiple: false,
                })
            setImageTemp(path) // 미리보기용

            const imageFile = generateImageToRNFile(path, fileName)
            const { data } = await mutate<uploadImage, uploadImageVariables>({
                mutation: UPLOAD_IMAGE,
                variables: {
                    image: imageFile,
                    path: _path
                }
            })
            if (!data) throw new Error
            setImage(data.uploadImage)
            return data.uploadImage
        } catch (error) {
            console.error(error)
            throw new Error('이미지 업로드 실패')
        } finally {
            setLoading(false)
        }
    }

    const selectAndUpload = async (option?: Options, path = 'image/') => {
        const value = await new Promise<string | null | undefined>((resolve, reject) => {
            selector({
                list: ['카메라', '앨범'],
                closeToSelect: true,
                onSelect: async (i) => {
                    try {
                        if (i === -1) throw new Error('이미지 업로드 취소')
                        await new Promise(res => setTimeout(res, 1000)) // ios modal 띄워저 있는동안 호출하면 오류남
                        const uploadData = await upload({ ...option, camera: i === 0 ? true : false }, path)
                        resolve(uploadData)
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        })
        return value
    }

    return {
        image,
        imageTemp,
        loading,
        clear,
        upload,
        selectAndUpload
    }
}

export default useImageUpload