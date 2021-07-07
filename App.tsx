import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/screens';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent />
        <View style={{ flex: 1 }} >
          <Navigation />
        </View>
      </SafeAreaProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})
