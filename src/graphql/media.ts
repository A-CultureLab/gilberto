import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { createMedia, createMediaVariables } from "./__generated__/createMedia"
import { mediasByPetId, mediasByPetIdVariables } from "./__generated__/mediasByPetId"
import { mediasByUserId, mediasByUserIdVariables } from "./__generated__/mediasByUserId"

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
export const CREATE_MDDIA = gql`
mutation createMedia($input:CreateMediaInput!) {
    createMedia(input:$input) {
        id
    }
}
`

export const useCreateMedia = createMutationHook<createMedia, createMediaVariables>(CREATE_MDDIA)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//