import { useRoute, Route } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import ScreenLayout from '../../components/layout/ScreenLayout'
import BrowserHeader from './BrowserHeader'

const Browser = () => {

    const { params } = useRoute<Route<'Browser', { url: string }>>()

    const [url, setUrl] = useState(params.url)


    return (
        <ScreenLayout>
            <BrowserHeader url={url} />
            <WebView
                style={{ flex: 1 }}
                source={{ uri: params.url }}
            />
        </ScreenLayout>
    )
}

export default Browser

const styles = StyleSheet.create({})
