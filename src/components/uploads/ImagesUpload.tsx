import React, { useEffect } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GRAY1, GRAY2, GRAY3 } from '../../constants/styles'
import useImagesUpload from '../../hooks/useImagesUpload'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FastImage from 'react-native-fast-image'

interface ImagesUploadProps {
    max?: number
    value?: string[]
    onChange?: (images: string[]) => void
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({ max, onChange, value }) => {

    const { images, imagesTemp, loading, selectAndUpload, uploadAble, remove, upload } = useImagesUpload(value, max)

    useEffect(() => {
        onChange && onChange(images)
    }, [images])

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            overScrollMode='never'
            horizontal
            style={styles.container}
        >
            <View style={{ width: 16 }} />

            {images.map((v, i) => (
                <View key={v} style={styles.imageContainer} >
                    <FastImage
                        style={styles.image}
                        source={{ uri: v }}
                    />
                    <Pressable
                        onPress={() => remove(i)}
                        style={styles.removeBtn}
                    >
                        <Icon name='close' size={12} color='#000' />
                    </Pressable>
                </View>
            ))}

            {imagesTemp.map(v => (
                <View key={v} style={styles.imageContainer} >
                    <FastImage
                        style={styles.image}
                        source={{ uri: v }}
                    />
                    <View style={styles.imageTempWrapper} >
                        <ActivityIndicator size='small' color='#fff' />
                    </View>
                </View>
            ))}

            {uploadAble && <Pressable
                onPress={() => upload({ camera: false }, 'postImage/')}
                style={styles.addContainer}
            >
                <Icon name='add' size={24} color={GRAY2} />
            </Pressable>}
        </ScrollView>
    )
}

export default ImagesUpload

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: GRAY3
    },
    imageContainer: {
        width: 64,
        height: 64,
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 16
    },
    image: {
        width: 64,
        height: 64,
    },
    imageTempWrapper: {
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    removeBtn: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        opacity: 0.5,
        position: 'absolute',
        top: 4, right: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addContainer: {
        width: 64,
        height: 64,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: GRAY3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16
    }
})