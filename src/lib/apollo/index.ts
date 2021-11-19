import { ApolloClient, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import cache from './cache'
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_SERVER_URL, WEBSOCKET_SERVER_URL } from '../../constants/values';
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const wsClient = new SubscriptionClient(WEBSOCKET_SERVER_URL as string, {
    reconnect: true
})


const wsLink = new WebSocketLink(wsClient)

const httpLink = createUploadLink({
    uri: GRAPHQL_SERVER_URL
})


const authLink = setContext(async (_, { headers }) => {
    // 파이어베이스에서 해당 유저의 계정 토큰을 받아서 header에 authorization 속성에 추가
    const accessToken = await AsyncStorage.getItem('@ACCESS_TOKEN')

    return {
        headers: {
            ...headers,
            accessToken
        }
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

export const client = new ApolloClient({
    link: splitLink,
    cache,
    connectToDevTools: __DEV__ // flipper 에서 apollo client devtool 사용가능함
})