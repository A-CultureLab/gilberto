import { gql } from "@apollo/client";
import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { coordToRegion, coordToRegionVariables } from "./__generated__/coordToRegion";
import { isSignedup } from "./__generated__/isSignedup";
import { iUser } from "./__generated__/iUser";
import { signup, signupVariables } from "./__generated__/signup";
import { updateFcmToken, updateFcmTokenVariables } from "./__generated__/updateFcmToken";
import { updateUser, updateUserVariables } from "./__generated__/updateUser";
import { user, userVariables } from "./__generated__/user";
import { withdraw, withdrawVariables } from "./__generated__/withdraw";


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
      addressPostcode
      instagramId
      introduce
      notReadChatCount
      address {
        addressName
        buildingName
        postcode
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
export const COORDS_TO_REGION = gql`
mutation coordToRegion ($latitude:Float!, $longitude:Float!) {
  coordsToRegion(latitude: $latitude, longitude: $longitude) {
    postcode
    addressName
    buildingName
  }
}
`

export const useCoordToRegion = createMutationHook<coordToRegion, coordToRegionVariables>(COORDS_TO_REGION)
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
      addressPostcode 
      instagramId
      introduce
      address {
        postcode
        addressName
        buildingName
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
    image
    name
    id
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