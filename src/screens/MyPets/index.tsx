import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'

const MyPets = () => {
    return (
        <ScreenLayout>
            <Header title='반려동물 관리' />
        </ScreenLayout>
    )
}

export default MyPets

const styles = StyleSheet.create({})
