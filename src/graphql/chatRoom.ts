import { chatRoomUpdated, chatRoomUpdatedVariables } from "./__generated__/chatRoomUpdated";
import { chatRooms, chatRoomsVariables } from "./__generated__/chatRooms";
import { createLazyQueryHook, createMutationHook, createQueryHook, createSubscriptionHook } from "../lib/createApolloHook";

import { gql } from "@apollo/client";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_ROOMS = gql`
query chatRooms ($cursor:Int, $take:Int) {
    chatRooms(cursor:$cursor, take:$take) {
        id
        notReadChatCount
        name
        users {
            id
            name,
            image
        }    
        recentChat {
            id
            createdAt
            message
        }
    }
}
`
export const useChatRooms = createQueryHook<chatRooms, chatRoomsVariables>(CHAT_ROOMS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_ROOM_UPDATED = gql`
subscription chatRoomUpdated($userId:String!) {
    chatRoomUpdated(userId: $userId) {
        id
        notReadChatCount
        name
        users {
            id
            name,
            image
        }    
        recentChat {
            id
            createdAt
            message
        }
    }
}
`

export const useChatRoomUpdated = createSubscriptionHook<chatRoomUpdated, chatRoomUpdatedVariables>(CHAT_ROOM_UPDATED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
        console.log(subscriptionData)
        if (!subscriptionData.data?.chatRoomUpdated) return

        // 해당 챗룸 맨 앞으로 빼주기
        // const chatRoomId = subscriptionData.data.chatRoomUpdated.chatRoom.id
        // const preData = client.cache.readQuery<chatRooms, chatRoomsVariables>({ query: CHATS, variables: { chatRoomId } })?.chats || []
        // client.cache.writeQuery<chats, chatsVariables>({
        //     query: CHATS,
        //     variables: { chatRoomId },
        //     data: {
        //         chatRoom: subscriptionData.data.chatCreated.chatRoom,
        //         chats: [subscriptionData.data.chatCreated, ...preData]
        //     }
        // })
    },
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
