import { chatRoomUpdated, chatRoomUpdatedVariables } from "./__generated__/chatRoomUpdated";
import { createLazyQueryHook, createMutationHook, createQueryHook, createSubscriptionHook } from "../lib/createApolloHook";

import { gql } from "@apollo/client";
import { chatRooms, chatRoomsVariables } from "./__generated__/chatRooms";
import { exitChatRoom, exitChatRoomVariables } from "./__generated__/exitChatRoom";
import { chatRoom, chatRoomVariables } from "./__generated__/chatRoom";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_ROOM = gql`
query chatRoom ($id:String, $userId: String) {
    chatRoom(id:$id, userId:$userId) {
        id
        name
        type
        isIBlocked
        isBlockedMe
        iUserChatRoomInfo {
            id
            bookmarked
            notificated
            blocked
            notReadChatCount
            user {
                id
                notReadChatCount
            }
        }
        userChatRoomInfos {
          id
          user {
            id
            image
            name
          }  
        } 
        recentChat {
            id
            createdAt
            message
        }
    }
}
`
export const useChatRoom = createQueryHook<chatRoom, chatRoomVariables>(CHAT_ROOM)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_ROOMS = gql`
query chatRooms ($cursor:String, $take:Int) {
    chatRooms(cursor:$cursor, take:$take) {
        id
        name
        image
        type
        isIBlocked
        isBlockedMe
        iUserChatRoomInfo {
            id
            bookmarked
            notificated
            blocked
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
        name
        image
        type
        isIBlocked
        isBlockedMe
        iUserChatRoomInfo {
            id
            bookmarked
            notificated
            blocked
            notReadChatCount
            user {
                id
                notReadChatCount
            }
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

        // console.log('chatRoomUpdated')
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
export const EXIT_CHAT_ROOM = gql`
mutation exitChatRoom ($id:String!) {
    exitChatRoom(id: $id) {
        id
    }
}
`
export const useExitChatRoom = createMutationHook<exitChatRoom, exitChatRoomVariables>(EXIT_CHAT_ROOM, {
    update: (cache, { data }) => {
        // 채팅 스크린에서 채팅방 삭제
        cache.modify({
            fields: {
                chatRooms: (existingRefs, { readField }) => {
                    return existingRefs.filter((ref: any) => data?.exitChatRoom.id !== readField('id', ref))
                }
            }
        })
    }
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
