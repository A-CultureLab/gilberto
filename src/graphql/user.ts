import { gql } from "@apollo/client";
import { createQueryHook } from "../lib/createApolloHook";
import { iUser, iUser_iUser } from "./__generated__/iUser";


//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const KAKAO_TOKEN_TO_FIREBASE_TOKEN = gql`
    query KakaoTokenToFirebaseToken ($kakaoAccessToken: String!){
      kakaoTokenToFirebaseToken(kakaoAccessToken: $kakaoAccessToken) 
    }
`

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
export const useIUser = createQueryHook<iUser, {}>(I_USER)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//