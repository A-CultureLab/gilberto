import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'

const Friend = () => {
    return (
        <ScreenLayout>
            <Header title='친구' backBtn='none' />
            <View style={{ flex: 1 }} >

            </View>
            <TabScreenBottomTabBar />
        </ScreenLayout>
    )
}

export default Friend

const styles = StyleSheet.create({})
