import { gql } from "@apollo/client";
import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { coordToRegion, coordToRegionVariables } from "./__generated__/coordToRegion";
import { isSignedup } from "./__generated__/isSignedup";
import { iUser } from "./__generated__/iUser";
import { signup, signupVariables } from "./__generated__/signup";
import { updateUser, updateUserVariables } from "./__generated__/updateUser";
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
export const useIsSignedup = createQueryHook<isSignedup, {}>(IS_SIGNEDUP, { fetchPolicy: 'network-only' })
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