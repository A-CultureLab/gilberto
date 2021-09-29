import gql from "graphql-tag";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { createPost, createPostVariables } from "./__generated__/createPost";
import { likePost, likePostVariables } from "./__generated__/likePost";
import { posts, postsVariables } from "./__generated__/posts";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CREATE_POST = gql`
mutation createPost ($data:CreatePostInput!) {
    createPost(data: $data) {
        id
    }
}
`
export const useCreatePost = createMutationHook<createPost, createPostVariables>(CREATE_POST)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const POSTS = gql`
query posts ($filter:PostsAdressFilterInput, $take:Int, $skip:Int) {
    posts(filter:$filter, take:$take, skip:$skip) {
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
                adressShort
                distance
            }
        }
    }
}
`

export const usePosts = createQueryHook<posts, postsVariables>(POSTS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const LIKE_POST = gql`
mutation likePost ($id:String!, $like:Boolean!) {
    likePost(id:$id, like:$like) {
        id
        likeCount
        isILiked
    }
}
`
export const useLikePost = createMutationHook<likePost, likePostVariables>(LIKE_POST)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//