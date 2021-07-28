import { gql } from "@apollo/client";
import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { chatRooms, chatRoomsVariables } from "./__generated__/chatRooms";
import { chats, chatsVariables } from "./__generated__/chats";
import { createChat, createChatVariables } from "./__generated__/createChat";


//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHATS = gql`
query chats ($chatRoomId:Int!,  $cursor:Int, $take:Int) {
    chats(chatRoomId:$chatRoomId, cursor:$cursor, take:$take) {
        id
        createdAt
        message
        image
        user {
            id
            name
            image
        }
    }
    chatRoom(where: {id:$chatRoomId}) {
        id
        name
    }
}
`
export const useChats = createQueryHook<chats, chatsVariables>(CHATS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CREATE_CHAT = gql`
mutation createChat ($input:CreateChatInput!) {
    createChat(input: $input) {
        id
        chatRoom {
            id
            users {
                id
                name
                image
            }
            recentChat {
                id
                createdAt
                message
            }
            notReadChatCount
        }
    }
}
`
export const useCreateChat = createMutationHook<createChat, createChatVariables>(CREATE_CHAT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
