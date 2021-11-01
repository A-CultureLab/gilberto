import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"
import { feeds, feedsVariables } from "./__generated__/feeds"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const FEEDS = gql`
query feeds ($filter:PostsAdressFilterInput, $take:Int, $skipPost:Int, $skipNews:Int) {
    feeds (filter:$filter, take:$take, skipPost:$skipPost, skipNews:$skipNews){
        id
        post {
            id
            createdAt
            isILiked
            likeCount
            images {
                id
                url
            }
            content
            type
            commentCount
            user {
                id
                name
                image
                address {
                    id
                    addressShort
                    distance
                }
            }    
        }
        news {
            id
            createdAt
            title
            image
            content
            link
        }
    }
}
`

export const useFeeds = createQueryHook<feeds, feedsVariables>(FEEDS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//