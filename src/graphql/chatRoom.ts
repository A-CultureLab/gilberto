import { chatRoomUpdated, chatRoomUpdatedVariables } from "./__generated__/chatRoomUpdated";
import { createQueryHook, createSubscriptionHook } from "../lib/createApolloHook";

import { gql } from "@apollo/client";
import { chatRooms, chatRoomsVariables } from "./__generated__/chatRooms";
import { I_USER_NOT_READ_CHAT_NUM } from "./user";

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
            notReadChatCount
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
            notReadChatCount
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
        if (!subscriptionData.data?.chatRoomUpdated) return

        // 해당 챗룸을 맨 앞으로 빼주기
        const chatRoom = subscriptionData.data.chatRoomUpdated
        const preData = client.cache.readQuery<chatRooms, chatRoomsVariables>({ query: CHAT_ROOMS })?.chatRooms || []
        // console.log(preData)
        client.cache.writeQuery<chatRooms, chatRoomsVariables>({
            query: CHAT_ROOMS,
            data: {
                chatRooms: [chatRoom, ...preData.filter(v => v.id !== chatRoom.id)]
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
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
