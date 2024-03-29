import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View, FlatList, Image, PermissionsAndroid } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY2, GRAY3, WIDTH } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useGlobalUi from '../../hooks/useGlobalUi'
import CameraRoll from "@react-native-community/cameraroll";
import InstagramImageCropper, { CroppedData } from '../../components/croppers/InstagramImageCropper'
import { IS_ANDROID } from '../../constants/values'
import useNavigation from '../../hooks/useNavigation'



const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

const MediaCreateSelectPhoto = () => {

    const { bottom } = useSafeAreaInsets()
    const { select, toast } = useGlobalUi()
    const { navigate } = useNavigation()

    // values
    const [multiple, setMultiple] = useState(false)
    const [albums, setAlbums] = useState<CameraRoll.Album[]>([])
    const [currentAlbum, setCurrentAlbum] = useState<null | string>(null)
    const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifier[]>([])
    const [nextCursor, setNextCursor] = useState<string | undefined>()
    const [currentPhotos, setCurrentPhotos] = useState<CameraRoll.PhotoIdentifier[]>([])

    const [croppedImages, setCroppedImages] = useState<CroppedData[]>([])

    useEffect(() => {
        (async () => {
            const _albums = await CameraRoll.getAlbums({ assetType: 'Photos' })
            setAlbums(_albums)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (IS_ANDROID) await hasAndroidPermission()
            const { edges, page_info } = await CameraRoll.getPhotos({
                assetType: 'Photos',
                groupTypes: currentAlbum ? 'Album' : 'All',
                first: 24,
                groupName: currentAlbum || undefined,
                include: ['imageSize', 'filename']
            })
            setPhotos(edges)
            edges.length && setCurrentPhotos([edges[0]])
            setNextCursor(page_info.end_cursor)
        })()
    }, [currentAlbum, setPhotos])

    const onMultipleToggle = useCallback(() => {
        if (multiple && currentPhotos.length) setCurrentPhotos([currentPhotos[0]]) // 초기화
        setMultiple(!multiple)
    }, [multiple, currentPhotos])

    const onSelectAlbum = useCallback(() => {
        select({
            list: ['전체', ...albums.map(v => v.title)],
            onSelect: (i) => i === 0 ? setCurrentAlbum(null) : setCurrentAlbum(albums[i - 1].title)
        })
    }, [albums])

    const onEndReached = async () => {
        if (!nextCursor) return
        const { edges, page_info } = await CameraRoll.getPhotos({
            assetType: 'Photos',
            groupTypes: currentAlbum ? 'Album' : 'All',
            first: 24,
            after: nextCursor,
            groupName: currentAlbum || undefined,
            include: ['imageSize', 'filename']
        })
        setPhotos(prev => [...prev, ...edges])
        setNextCursor(page_info.end_cursor)
    }

    const onSubmit = useCallback(() => {
        if (!croppedImages) toast({ content: '최소 1장의 사진이 필요합니다.' })
        navigate('MediaCreate', { photos: croppedImages.map(v => v.croppedUri) })
    }, [croppedImages])

    const onPhoto = useCallback((photo: CameraRoll.PhotoIdentifier) => {
        if (multiple) {
            if (currentPhotos.includes(photo)) setCurrentPhotos(prev => prev.filter(v => v !== photo))
            else {
                if (currentPhotos.length >= 9) return toast({ content: '사진은 최대 9장까지 첨부할 수 있습니다' })
                setCurrentPhotos(prev => [...prev, photo])
            }
        } else {
            if (currentPhotos.includes(photo)) setCurrentPhotos([])
            else setCurrentPhotos([photo])
        }
    }, [currentPhotos, multiple])

    const onImageCropped = useCallback((data: CroppedData) => {
        setCroppedImages(prev => [...prev.filter(v => v.originalUri !== data.originalUri), data])
    }, [])

    useEffect(() => {
        setCroppedImages(prev => prev.filter(v => currentPhotos.map(v => v.node.image.uri).includes(v.originalUri)))
    }, [currentPhotos])

    return (
        <ScreenLayout>
            <Header
                title='게시물 생성'
                underline
                right={() => <Pressable style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }} onPress={onSubmit} ><Text style={{ fontWeight: 'bold', color: COLOR1 }} >다음</Text></Pressable>}
            />
            <View style={styles.imageCropContainer} >
                {!!currentPhotos.length &&
                    <InstagramImageCropper
                        image={currentPhotos[currentPhotos.length - 1].node.image}
                        onCropped={onImageCropped}
                    />
                }
            </View>
            <View style={styles.menubar} >
                <Pressable onPress={onSelectAlbum} style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }} >
                    <Text style={{ marginRight: 8 }} >{currentAlbum || '전체'}</Text>
                    <Icon name='chevron-down' size={16} />
                </Pressable>
                <View style={{ flex: 1 }} />
                <Pressable onPress={onMultipleToggle} style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }} >
                    <Text style={{ marginRight: 8 }} >다중선택</Text>
                    <Icon color={multiple ? COLOR1 : GRAY2} name={multiple ? 'check-circle' : 'check-circle-outline'} size={20} />
                </Pressable>
            </View>
            <FlatList
                numColumns={4}
                data={photos}
                showsVerticalScrollIndicator={false}
                keyExtractor={v => v.node.image.uri}
                onEndReached={onEndReached}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onPhoto(item)} >
                        <Image
                            style={styles.photo}
                            source={{ uri: item.node.image.uri }}
                        />
                        {currentPhotos.includes(item) && <View style={styles.photoSelectedWrapper} />}
                        {(multiple && currentPhotos.includes(item)) && <View style={styles.multipleBtn} ><Text style={styles.multipleText} >{currentPhotos.indexOf(item) + 1}</Text></View>}
                    </Pressable>
                )}
                ListFooterComponent={<View style={{ height: bottom }} />}
            />
        </ScreenLayout>
    )
}

export default MediaCreateSelectPhoto

const styles = StyleSheet.create({
    imageCropContainer: {
        width: WIDTH,
        height: WIDTH
    },
    menubar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 48,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: GRAY3
    },
    photo: {
        width: WIDTH / 4,
        height: WIDTH / 4,
        borderWidth: 0.5,
        borderColor: '#fff'
    },
    photoSelectedWrapper: {
        position: 'absolute',
        right: 0, top: 0, left: 0, bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    multipleBtn: {
        width: 20, height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: COLOR1,
        position: 'absolute',
        top: 4,
        right: 4
    },
    multipleText: {
        fontSize: 12,
        color: '#fff'
    }
})