import { gql } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { disFollowing, disFollowingVariables } from "./__generated__/disFollowing"
import { followers, followersVariables } from "./__generated__/followers"
import { following, followingVariables } from "./__generated__/following"
import { followings, followingsVariables } from "./__generated__/followings"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const FOLLOWERS = gql`
query followers($userId:String!, $take:Int, $skip:Int) {
    followers(userId: $userId, take:$take, skip:$skip) {
        id
        createdAt
        user {
            id
            name
            image
            isIFollowed
        }
    }   
}
`

export const useFollowers = createQueryHook<followers, followersVariables>(FOLLOWERS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const FOLLOWINGS = gql`
query followings($userId:String!, $take:Int, $skip:Int) {
    followings(userId: $userId, take:$take, skip:$skip) {
        id
        createdAt
        targetUser {
            id
            name
            image
            isIFollowed
        }
    }   
}
`

export const useFollowings = createQueryHook<followings, followingsVariables>(FOLLOWINGS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const FOLLOWING = gql`
mutation following($userId:String!) {
    following(userId: $userId) {
        targetUser {
            id
            isIFollowed
        }
        user {
            id
            followingCount
        }
    }
}
`

export const useFollowing = createMutationHook<following, followingVariables>(FOLLOWING)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DIS_FOLLOWING = gql`
mutation disFollowing($userId:String!) {
    disFollowing(userId: $userId) 
}
`

export const useDisFollowing = createMutationHook<disFollowing, disFollowingVariables>(DIS_FOLLOWING)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
