import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { signup, signupVariables } from "./__generated__/signup";
import { updateFcmToken, updateFcmTokenVariables } from "./__generated__/updateFcmToken";
import { updateUser, updateUserVariables } from "./__generated__/updateUser";
import { user, userVariables } from "./__generated__/user";
import { withdraw, withdrawVariables } from "./__generated__/withdraw";

import { gql } from "@apollo/client";
import { iUser } from "./__generated__/iUser";
import { isSignedup } from "./__generated__/isSignedup";

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
      gender
      birth
      age
      instagramId
      introduce
      notReadChatCount
      address {
        id
        land {
          id
          fullName
        }
      }
    }
  }
`
export const useIUser = createQueryHook<iUser, {}>(I_USER)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const SIGN_UP = gql`
  mutation signup ($data: SignupInput!) {
    signup(data: $data) {
      id
      image
      pets {
        id
        image
      }
    }
  }
`
export const useSignup = createMutationHook<signup, signupVariables>(SIGN_UP)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

export const IS_SIGNEDUP = gql`
  query isSignedup {
    isSignedup
  }
`
export const useIsSignedup = createLazyQueryHook<isSignedup, {}>(IS_SIGNEDUP, { fetchPolicy: 'network-only' })
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      image
      gender
      age
      birth
      instagramId
      introduce
      address {
        id
        land {
          id
          fullName
        }
      }
    }
  }
`

export const useUpdateUser = createMutationHook<updateUser, updateUserVariables>(UPDATE_USER)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
const WITHDRAW = gql`
mutation withdraw($reason:String!) {
  withdraw(reason:$reason) {
    id
  }
}
`
export const useWithdraw = createMutationHook<withdraw, withdrawVariables>(WITHDRAW)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const USER = gql`
query user($where:UserWhereUniqueInput!) {
  user(where:$where) {
    id
    image
    name
    age
    gender
    introduce
    pets {
      id
      image
    }
    address {
      land {
        fullName
      }
    }
  }
}
`
export const useUser = createQueryHook<user, userVariables>(USER)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const I_USER_NOT_READ_CHAT_NUM = gql`
  query iUserNotReadChatNum {
    iUser {
      id
      notReadChatCount
    }
  }
`
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const UPDATE_FCM_TOKEN = gql`
  mutation updateFcmToken ($token: String!) {
    updateFcmToken(token:$token) {
      id
      fcmToken
    }
  }
`
export const useUpdateFcmToken = createMutationHook<updateFcmToken, updateFcmTokenVariables>(UPDATE_FCM_TOKEN)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------------------------------------------//