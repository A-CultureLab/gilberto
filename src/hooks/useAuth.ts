import { useApolloClient } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { useCallback } from 'react'
import PushNotification from 'react-native-push-notification'

const useAuth = () => {

    const { reset } = useNavigation()
    const client = useApolloClient()

    const logout = useCallback(async () => {
        await auth().signOut()
        PushNotification.abandonPermissions()
        await client.clearStore()
        reset({ index: 0, routes: [{ name: 'Tab' }] })
    }, [])

    return {
        logout
    }
}

export default useAuth