import { useApolloClient } from "@apollo/client"
import { useCallback, useState } from "react"
import ImageCropPicker, { Options } from "react-native-image-crop-picker"
import { UPLOAD_IMAGES } from "../graphql/util"
import { uploadImage, uploadImageVariables } from "../graphql/__generated__/uploadImage"
import { uploadImages, uploadImagesVariables } from "../graphql/__generated__/uploadImages"
import generateImageToRNFile from "../lib/generateRNFile"
import useGlobalUi from "./useGlobalUi"

const useImagesUpload = (initialValue: string[] = [], max = 10) => {

    const { mutate } = useApolloClient()
    const { select } = useGlobalUi()

    const [images, setImages] = useState<string[]>(initialValue)
    const [imagesTemp, setImagesTemp] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const uploadAble = images.length < max

    const clear = useCallback(() => {
        setImages([])
        setImagesTemp([])
        setLoading(false)
    }, [])


    const upload = async (option?: Options & { camera?: boolean }, _path: string = 'image/'): Promise<string[] | undefined> => {
        try {
            if (!uploadAble) return
            if (loading) return
            setLoading(true)

            const files = !option?.camera
                ? await ImageCropPicker.openPicker({
                    cropping: true,
                    cropperCancelText: '취소',
                    loadingLabelText: '불러오는중',
                    cropperChooseText: '완료',
                    mediaType: 'photo',
                    compressImageQuality: 0.8,
                    ...option,
                    multiple: true,
                    maxFiles: max - images.length
                })
                : await ImageCropPicker.openCamera({
                    cropping: true,
                    cropperCancelText: '취소',
                    loadingLabelText: '불러오는중',
                    cropperChooseText: '완료',
                    mediaType: 'photo',
                    compressImageQuality: 0.8,
                    ...option,
                    multiple: true,
                    maxFiles: max - images.length
                })

            const slicedFiles = files.slice(0, max - images.length)

            setImagesTemp(slicedFiles.map(v => v.path)) // 미리보기용

            const generatedFiles = slicedFiles.map((v, i) => generateImageToRNFile(v.path, v.filename + i.toString()))

            const { data } = await mutate<uploadImages, uploadImagesVariables>({
                mutation: UPLOAD_IMAGES,
                variables: {
                    images: generatedFiles,
                    path: _path
                }
            })
            if (!data) throw new Error
            setImages([...images, ...data.uploadImages])
            return data.uploadImages
        } catch (error) {
            console.error(error)
            throw new Error('이미지 업로드 실패')
        } finally {
            setLoading(false)
            setImagesTemp([])
        }
    }

    const selectAndUpload = async (option?: Options, path = 'image/') => {
        const value = await new Promise<string[] | null | undefined>((resolve, reject) => {
            select({
                list: ['카메라', '앨범'],
                closeToSelect: true,
                onSelect: async (i) => {
                    try {
                        if (i === -1) throw new Error('이미지 업로드 취소')
                        await new Promise(res => setTimeout(res, 500)) // ios modal 띄워저 있는동안 호출하면 오류남
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

    const remove = useCallback((index: number) => {
        if (loading) return
        setImages(images.filter((_, i) => i !== index))
    }, [images, loading])

    return {
        images,
        imagesTemp,
        loading,
        clear,
        remove,
        upload,
        selectAndUpload,
        uploadAble
    }
}

export default useImagesUpload