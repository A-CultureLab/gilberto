import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import { createLazyQueryHook, createMutationHook, createQueryHook, createSubscriptionHook } from "../lib/createApolloHook";
import { chatCreated, chatCreatedVariables } from "./__generated__/chatCreated";
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
            name
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
subscription chatCreated($userId:String!, $chatRoomId:Int!) {
    chatCreated (userId:$userId, chatRoomId:$chatRoomId) {
        id
        createdAt
        message
        image
        user {
            id
            name
            image
        }
        chatRoom {
            id
            name
        }
    }
}
`


export const useChatCreated = createSubscriptionHook<chatCreated, chatCreatedVariables>(CHAT_CREATED, {
    onSubscriptionComplete: () => {
        console.log('subscription completed')
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
        console.log(subscriptionData)
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
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
