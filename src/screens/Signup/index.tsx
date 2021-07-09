import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'

const Signup = () => {
    return (
        <ScreenLayout>
            <Header title='회원정보 등록' backBtn='none' />
        </ScreenLayout>
    )
}

export default Signup

const styles = StyleSheet.create({})
