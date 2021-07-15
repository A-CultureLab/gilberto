import { useApolloClient } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { useCallback } from 'react'

const useAuth = () => {

    const { reset } = useNavigation()
    const client = useApolloClient()

    const logout = useCallback(async () => {
        // await messaging().deleteToken()
        await auth().signOut()

        await client.clearStore()
        reset({ index: 0, routes: [{ name: 'Tab' }] })
    }, [])

    return {
        logout
    }
}

export default useAuth