import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { updateFcmToken, updateFcmTokenVariables } from "./__generated__/updateFcmToken";
import { updateUser, updateUserVariables } from "./__generated__/updateUser";
import { user, userVariables } from "./__generated__/user";
import { withdraw, withdrawVariables } from "./__generated__/withdraw";

import { gql } from "@apollo/client";
import { iUser } from "./__generated__/iUser";
import { login, loginVariables } from "./__generated__/login";

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
      introduce
      instagramId
      notReadChatCount
      address {
        id
        area1 {
          id
          name
        }
        area2 {
          id
          name
        }
        area3 {
          id
          name
        }
        land {
          id
          name
          buildingName
        }
      }
    }
  }
`
export const useIUser = createQueryHook<iUser, {}>(I_USER)
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
      introduce
      instagramId
      address {
        id
        area1 {
          id
          name
        }
        area2 {
          id
          name
        }
        area3 {
          id
          name
        }
        land {
          id
          name
          buildingName
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
    instagramId
    followerCount
    followingCount
    mediaCount
    isIFollowed
    pets {
      id
      image
    }
    address {
      id
      distance
      addressFull
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
    }
  }
`
export const useUpdateFcmToken = createMutationHook<updateFcmToken, updateFcmTokenVariables>(UPDATE_FCM_TOKEN)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const LOGIN = gql`
mutation login($phone:String!, $password:String!) {
  login(phone: $phone, password: $password) 
}
`
export const useLogin = createMutationHook<login, loginVariables>(LOGIN)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//