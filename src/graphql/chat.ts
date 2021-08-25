import { chatCreated, chatCreatedVariables } from "./__generated__/chatCreated";
import { chats, chatsVariables } from "./__generated__/chats";
import { createChat, createChatVariables } from "./__generated__/createChat";
import { createMutationHook, createQueryHook, createSubscriptionHook } from "../lib/createApolloHook";
import { gql } from "@apollo/client";
import { deleteChat, deleteChatVariables } from "./__generated__/deleteChat";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHATS = gql`
query chats ($chatRoomId:String!,  $cursor:String, $take:Int) {
    chats(chatRoomId:$chatRoomId, cursor:$cursor, take:$take) {
        id
        createdAt
        message
        image
        isDeleted
        user {
            id
            name
            image
            notReadChatCount
        }
    }
    chatRoom(where: {id:$chatRoomId}) {
        id
        name
        notReadChatCount
        recentChat {
            id
            createdAt
            message
        }
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
            name
            notReadChatCount
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
export const CHAT_CREATED = gql`
subscription chatCreated($userId:String!, $chatRoomId:String!) {
    chatCreated (userId:$userId, chatRoomId:$chatRoomId) {
        id
        createdAt
        message
        image
        isDeleted
        user {
            id
            name
            image
            notReadChatCount
        }
        chatRoom {
            id
            name
            notReadChatCount
            recentChat {
                id
                createdAt
                message
            }
        }
    }
}
`


export const useChatCreated = createSubscriptionHook<chatCreated, chatCreatedVariables>(CHAT_CREATED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
        // console.log(subscriptionData)
        // console.log('chatCreated')
        if (!subscriptionData.data?.chatCreated) return

        // 해당 챗룸 아이디에 맨 앞에 chat 넣어주기
        const chatRoomId = subscriptionData.data.chatCreated.chatRoom.id
        const preData = client.cache.readQuery<chats, chatsVariables>({ query: CHATS, variables: { chatRoomId } })?.chats || []
        client.cache.writeQuery<chats, chatsVariables>({
            query: CHATS,
            variables: { chatRoomId },
            data: {
                chatRoom: subscriptionData.data.chatCreated.chatRoom,
                chats: [subscriptionData.data.chatCreated, ...preData]
            }
        })
    },
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DELETE_CHAT = gql`
mutation deleteChat ($id: String!)  {
    deleteChat(id: $id) {
        id
        message
        image
        isDeleted
    }
}
`
export const useDeleteChat = createMutationHook<deleteChat, deleteChatVariables>(DELETE_CHAT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
