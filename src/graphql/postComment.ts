import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { createPostComment, createPostCommentVariables } from "./__generated__/createPostComment"
import { deletePostComment, deletePostCommentVariables } from "./__generated__/deletePostComment"
import { postComment, postCommentVariables } from "./__generated__/postComment"
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
        postReplyCommentCount
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
    }
}
`

export const usePostComments = createQueryHook<postComments, postCommentsVariables>(POST_COMMENTS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DELETE_POST_COMMENT = gql`
mutation deletePostComment ($id:String!) {
    deletePostComment(id:$id){
        id
    }
}
`
export const useDeletePostComment = createMutationHook<deletePostComment, deletePostCommentVariables>(DELETE_POST_COMMENT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const POST_COMMENT = gql`
query postComment($id:String!) {
    postComment(where: {id:$id}) {
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
export const usePostComment = createQueryHook<postComment, postCommentVariables>(POST_COMMENT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
