import { useApolloClient } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import { useCallback } from 'react'
import PushNotification from 'react-native-push-notification'

const useAuth = () => {

    const client = useApolloClient()

    const logout = useCallback(async () => {
        await auth().signOut()
        PushNotification.abandonPermissions()
        await client.clearStore()
    }, [])

    return {
        logout
    }
}

export default useAuth