import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1 } from '../../constants/styles'

export interface MediaCreateProps {
    photos: string[]
}

const MediaCreate = () => {

    const onSubmit = useCallback(() => {

    }, [])

    return (
        <ScreenLayout>
            <Header
                title='게시물 생성'
                underline
                right={() => <Pressable style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }} onPress={onSubmit} ><Text style={{ fontWeight: 'bold', color: COLOR1 }} >다음</Text></Pressable>}
            />
        </ScreenLayout>
    )
}

export default MediaCreate

const styles = StyleSheet.create({})
