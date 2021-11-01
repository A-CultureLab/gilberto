import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { createPostReplyComment, createPostReplyCommentVariables } from "./__generated__/createPostReplyComment"
import { postReplyComments, postReplyCommentsVariables } from "./__generated__/postReplyComments"

export const POST_REPLY_COMMENTS = gql`
query postReplyComments($postId:String!, $skip:Int) {
    postReplyComments (where:{postCommentId:{equals:$postId}}, skip:$skip, take:10) {
        id
        createdAt
        content
        image
        isPoster
        user {
            id
            name
            image
            address {
                id
                addressShort
            }
        }
    }
}
`
export const usePostReplyComments = createQueryHook<postReplyComments, postReplyCommentsVariables>(POST_REPLY_COMMENTS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CREATE_POST_REPLY_COMMENT = gql`
mutation createPostReplyComment($data:PostReplyCommentCreateInput!) {
    createOnePostReplyComment(data:$data) {
        id
        postComment {
            id
            postReplyCommentCount
            recentPostReplyComments {
                id
                createdAt
                content
                image
                isPoster
                user {
                    id
                    name
                    image
                    address {
                        id
                        addressShort
                    }
                }
            }
            post {
                id
                commentCount
            }
        }
    }
}
`
export const useCreatePostReplyComment = createMutationHook<createPostReplyComment, createPostReplyCommentVariables>(CREATE_POST_REPLY_COMMENT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DELETE_POST_REPLY_COMMENT = gql`
mutation deletePostReplyComment ($id:String!) {
    deletePostReplyComment(id:$id){
        id
    }
}
`
export const useDeletePostReplyComment = createMutationHook(DELETE_POST_REPLY_COMMENT)