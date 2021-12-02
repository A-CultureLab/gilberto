import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import gql from 'graphql-tag'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetAccessToken } from '../graphql/user'




export type Auth = {
    refreshToken: string | null
    accessToken: string | null
    refreshTokenLoading: boolean
    login: (refreshToken: string) => void
    logout: () => void
}

export const AuthContext = createContext<Auth>({} as any)

const AuthWrapper: React.FC = ({ children }) => {

    const [getAccessToken] = useGetAccessToken() // 서버세어 엑세스 토큰 재발급


    const [refreshTokenLoading, setRefreshTokenLoading] = useState(true) // 로컬에서 리프레시 토큰 가져오는 로딩
    const [refreshToken, setRefreshToken] = useState<string | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const [getAccessTokenCount, setGetAccessTokenCount] = useState(0) // 재발급 받은 횟수
    const [getAccessTokenTimer, setGetAccessTokenTimer] = useState<NodeJS.Timeout | null>(null) // 재발급 받아야하는 기간을 알려주는 타이며

    // 로그인
    const login = useCallback((_refreshToken: string) => {
        setRefreshToken(_refreshToken)
    }, [])
    // 로컬 로그아웃
    const logout = useCallback(async () => {
        setRefreshToken(null) // 이것만 해도 로컬 스토리지에서 refreshToken 삭제됨 아래 useEffect 확인 바람
        setAccessToken(null)
        await AsyncStorage.removeItem('@ACCESS_TOKEN')
    }, [])

    // 엑세스 토큰 발급
    const refreshAccessToken = useCallback(async () => {
        // 타이머가 있다면 삭제
        getAccessTokenTimer && clearTimeout(getAccessTokenTimer)
        if (!refreshToken) return
        const { data, errors } = await getAccessToken({ variables: { refreshToken } })
        if (!data) return logout()
        // 유효하지 않은 refreshtoken이라면 로컬 refreshToken삭제
        setAccessToken(data.getAccessToken)

        // 5분뒤 다시 발급 요청 설정
        const timerId = setTimeout(() => { setGetAccessTokenCount(prev => prev + 1) }, 5 * 60 * 1000)
        setGetAccessTokenTimer(timerId)
    }, [refreshToken])


    // 리프레시 토큰이 바뀌거나 발급한지 5분이 지나면 엑세스 토큰 재발급
    useEffect(() => {
        refreshAccessToken()
    }, [refreshToken, getAccessTokenCount])

    // 리프레시 토큰이 바뀌면 로컬 스토리지에 동기화
    useEffect(() => {
        if (refreshTokenLoading) return
        if (!!refreshToken) AsyncStorage.setItem('@REFRESH_TOKEN', refreshToken)
        else AsyncStorage.removeItem('@REFRESH_TOKEN')
    }, [refreshToken, refreshTokenLoading])

    // 자동로그인을 위해서 로컬에 저장되있던 리프레시 토큰을 react state로 가져옴
    useEffect(() => {
        (async () => {
            const localRefreshToken = await AsyncStorage.getItem('@REFRESH_TOKEN')
            setRefreshTokenLoading(false)
            if (!localRefreshToken) return
            setRefreshToken(localRefreshToken)
        })() // IFFE
    }, [])

    // Header에 엑세스 토큰 전달을 위해서 로컬에 잠시 저장
    useEffect(() => {
        if (!accessToken) return
        AsyncStorage.setItem('@ACCESS_TOKEN', accessToken)
    }, [accessToken])


    const contextValue = useMemo<Auth>(() => ({
        refreshToken, accessToken, login, logout, refreshTokenLoading
    }), [refreshToken, accessToken, login, logout, refreshTokenLoading])

    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthWrapper