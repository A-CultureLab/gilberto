import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { createPostComment, createPostCommentVariables } from "./__generated__/createPostComment"
import { postComments, postCommentsVariables } from "./__generated__/postComments"

export const CREATE_POST_COMMENT = gql`
mutation createPostComment ($data:PostCommentCreateInput!) {
    createOnePostComment(data:$data) {
        id
        post {
            id
            commentCount
        }
    }
}
`
export const useCreatePostComment = createMutationHook<createPostComment, createPostCommentVariables>(CREATE_POST_COMMENT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const POST_COMMENTS = gql`
query postComments ($postId:String!,  $skip: Int) {
    postComments(
        where:{postId: {equals: $postId}}, 
        orderBy:{createdAt: desc},
        take: 10,
        skip:$skip
    ) {
        id
        createdAt
        content
        image
        user {
            id
            name
            image
            address {
                id
                adressShort
            }
        }
    }
}
`

export const usePostComments = createQueryHook<postComments, postCommentsVariables>(POST_COMMENTS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
