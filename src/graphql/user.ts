import { gql } from "@apollo/client";
import { createQueryHook } from "../lib/createApolloHook";


//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const KAKAO_TOKEN_TO_FIREBASE_TOKEN = gql`
    query KakaoTokenToFirebaseToken ($kakaoAccessToken: String!){
      kakaoTokenToFirebaseToken(kakaoAccessToken: $kakaoAccessToken) 
    }
`
export interface KakaoTokenToFirebaseTokenData {
  kakaoTokenToFirebaseToken: string
}
export interface KakaoTokenToFirebaseTokenDataVars {
  kakaoAccessToken: string
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const I_USER = gql`
  query iUser {
    iUser {
      id
      name
      image
    }
  }
`
export interface IUserData {
  iUser: {
    id: number
    name: string
    image: string
  } | null
}
interface IUserVars { }
export const useIUser = createQueryHook<IUserData, IUserVars>(I_USER)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//