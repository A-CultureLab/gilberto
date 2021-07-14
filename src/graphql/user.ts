import { gql } from "@apollo/client";
import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { coordToRegion, coordToRegionVariables } from "./__generated__/coordToRegion";
import { isSignedup } from "./__generated__/isSignedup";
import { iUser, iUser_iUser } from "./__generated__/iUser";
import { signup, signupVariables } from "./__generated__/signup";


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
      image
      name
      age
      gender
      address
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
query coordToRegion ($latitude:Float!, $longitude:Float!) {
  coordsToRegion(latitude: $latitude, longitude: $longitude) {
    id
    address
    postcode
    latitude
    longitude
  }
}
`

export const useCoordToRegion = createLazyQueryHook<coordToRegion, coordToRegionVariables>(COORDS_TO_REGION)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const IS_SIGNEDUP = gql`
  query isSignedup {
    isSignedup
  }
`
export const useIsSignedup = createQueryHook<isSignedup, {}>(IS_SIGNEDUP, { fetchPolicy: 'network-only' })
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------------------------------------------//