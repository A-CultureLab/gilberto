import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import MediaCard from '../../components/cards/MediaCard'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { useMedia } from '../../graphql/media'
import useRoute from '../../hooks/useRoute'

export interface MediaDetailProps {
    id: string
}

const MediaDetail = () => {


    const { params: { id } } = useRoute<'MediaDetail'>()
    const { data, loading } = useMedia({ variables: { id } })

    return (
        <ScreenLayout>
            <Header title='게시물' />
            {loading
                ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator size='small' />
                </View>
                : <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    {data && <MediaCard
                        {...data?.media}
                    />}
                </ScrollView>
            }
        </ScreenLayout>
    )
}

export default MediaDetail

const styles = StyleSheet.create({})
