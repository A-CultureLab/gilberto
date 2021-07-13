import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/screens';
import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/lib/apollo';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'


__DEV__ && enableFlipperApolloDevtools(client as any)

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent />
          <View style={{ flex: 1 }} >
            <Navigation />
          </View>
        </SafeAreaProvider>
      </ApolloProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})
