import { useApolloClient } from "@apollo/client"
import { useCallback, useState } from "react"
import ImageCropPicker, { Options } from "react-native-image-crop-picker"
import { UPLOAD_IMAGE } from "../graphql/util"
import { uploadImage, uploadImageVariables } from "../graphql/__generated__/uploadImage"
import generateImageToRNFile from "../lib/generateRNFile"

const useImageUpload = (fileName = 'image') => {

    const { mutate } = useApolloClient()

    const [image, setImage] = useState<null | string>(null)
    const [imageTemp, setImageTemp] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const clear = useCallback(() => {
        setImage(null)
        setImageTemp(null)
        setLoading(false)
    }, [])

    const upload = useCallback(async (option?: Options, _path: string | undefined = undefined) => {
        try {
            if (loading) return
            setLoading(true)
            const { path } = await ImageCropPicker.openPicker({
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
    }, [loading])

    return {
        image,
        imageTemp,
        loading,
        clear,
        upload
    }
}

export default useImageUpload