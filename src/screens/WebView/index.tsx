import useRoute from '../../hooks/useRoute'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import Webview from 'react-native-webview'

export interface WebViewProps {
    title: string
    url: string
}

const WebView = () => {

    const { params } = useRoute<'WebView'>()

    return (
        <ScreenLayout>
            <Header title={params.title} />
            <Webview
                style={{ flex: 1 }}
                source={{ uri: params.url }}
            />
        </ScreenLayout>
    )
}

export default WebView

const styles = StyleSheet.create({})
