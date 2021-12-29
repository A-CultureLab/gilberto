import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { createMedia, createMediaVariables } from "./__generated__/createMedia"
import { disLikeMedia, disLikeMediaVariables } from "./__generated__/disLikeMedia"
import { likeMedia, likeMediaVariables } from "./__generated__/likeMedia"
import { media, mediaVariables } from "./__generated__/media"
import { mediasByPetId, mediasByPetIdVariables } from "./__generated__/mediasByPetId"
import { mediasByUserId, mediasByUserIdVariables } from "./__generated__/mediasByUserId"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MEDIA = gql`
query media($id:String!) {
    media(id: $id) {
        id
        isInstagram
        content
        commentCount
        likeCount
        isILiked
        recentComments {
            id
            content
            user {
                id
                profileId
            }
        }
        images {
            id
            url
        }
        tagedPets {
            id
            image
            name
        }
        user {
            id
            profileId
            image
            isMe
            isIFollowed
            address {
                id
                distance
            }   
        }
    }
}
`

export const useMedia = createQueryHook<media, mediaVariables>(MEDIA)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MEDIAS_BY_USER_ID = gql`
query mediasByUserId($userId:String!, $instagramEndCursor: String, $endCursor: String) {
    mediasByUserId(userId:$userId, instagramEndCursor:$instagramEndCursor, endCursor:$endCursor) {
        id
        instagramEndCursor
        thumnail
        media {
            id
            isInstagram
        }
    }
}
`

export const useMediasByUserId = createQueryHook<mediasByUserId, mediasByUserIdVariables>(MEDIAS_BY_USER_ID)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MEDIAS_BY_PET_ID = gql`
query mediasByPetId($petId:String!, $take:Int, $skip:Int) {
    mediasByPetId(petId: $petId, take:$take, skip:$skip) {
        id
        isInstagram
        thumnail
    }
}
`

export const useMediasByPetId = createQueryHook<mediasByPetId, mediasByPetIdVariables>(MEDIAS_BY_PET_ID)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CREATE_MEDIA = gql`
mutation createMedia($input:CreateMediaInput!) {
    createMedia(input:$input) {
        id
    }
}
`

export const useCreateMedia = createMutationHook<createMedia, createMediaVariables>(CREATE_MEDIA)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const LIKE_MEDIA = gql`
mutation likeMedia($id:String!) {
    likeMedia(id:$id) {
        id
        isILiked
        likeCount
    }
}
`

export const useLikeMedia = createMutationHook<likeMedia, likeMediaVariables>(LIKE_MEDIA)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DIS_LIKE_MEDIA = gql`
mutation disLikeMedia($id:String!) {
    disLikeMedia(id:$id) {
        id
        isILiked
        likeCount
    }
}
`

export const useDisLikeMedia = createMutationHook<disLikeMedia, disLikeMediaVariables>(DIS_LIKE_MEDIA)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//