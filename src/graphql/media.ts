import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"
import { feeds, feedsVariables } from "./__generated__/feeds"
import { mediasByUserId, mediasByUserIdVariables } from "./__generated__/mediasByUserId"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MEDIAS_BY_USER_ID = gql`
query mediasByUserId($userId:String!, $instagramEndCursor: String) {
    mediasByUserId(userId:$userId, instagramEndCursor:$instagramEndCursor) {
        id
        instagramEndCursor
        instagramMedia {
            image
            id
        }
    }
}
`

export const useMediasByUserId = createQueryHook<mediasByUserId, mediasByUserIdVariables>(MEDIAS_BY_USER_ID)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//