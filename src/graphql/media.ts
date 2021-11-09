import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"
import { mediasByUserId, mediasByUserIdVariables } from "./__generated__/mediasByUserId"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MEDIAS_BY_USER_ID = gql`
query mediasByUserId($userId:String!, $instagramEndCursor: String) {
    mediasByUserId(userId:$userId, instagramEndCursor:$instagramEndCursor) {
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