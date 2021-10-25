import React from 'react'
import { StatusBar, StyleSheet, View, LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/screens';
import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/lib/apollo';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import dayjs from 'dayjs';
import codePush from 'react-native-code-push';

dayjs.locale('ko')
dayjs.extend(relativeTime)

LogBox.ignoreLogs(['getNode()', 'EventEmitter.removeListener', 'NativeEventEmitter', 'Module IamportReactNativeViewManager'])

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

export default __DEV__ ? App : codePush(App)