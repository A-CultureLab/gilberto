import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { chatRoomWillReport, chatRoomWillReportVariables } from "./__generated__/chatRoomWillReport"
import { chatWillReport, chatWillReportVariables } from "./__generated__/chatWillReport"
import { createReport, createReportVariables } from "./__generated__/createReport"
import { userWillReport, userWillReportVariables } from "./__generated__/userWillReport"

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CREATE_REPORT = gql`
mutation createReport ($reason:String!, $userId:String, $chatId:String, $chatRoomId:String) {
    createReport(reason:$reason, userId:$userId, chatId:$chatId, chatRoomId:$chatRoomId) {
        id
    }
}
`
export const useCreateReport = createMutationHook<createReport, createReportVariables>(CREATE_REPORT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_WILL_REPORT = gql`
query chatWillReport ($id:String!) {
    chat(where:{id:$id}) {
        id
        message
        image
    }
}
`
export const useChatWillReport = createQueryHook<chatWillReport, chatWillReportVariables>(CHAT_WILL_REPORT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const USER_WILL_REPORT = gql`
query userWillReport ($id:String!) {
    user(where: {id:$id}) {
        id
        name
        age
        gender
        image
    }
}
`
export const useUserWillReport = createQueryHook<userWillReport, userWillReportVariables>(USER_WILL_REPORT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const CHAT_ROOM_WILL_REPORT = gql`
query chatRoomWillReport ($id:String!) {
    chatRoom(id:$id) {
        id
        name
    }
}
`
export const useChatRoomWillReport = createQueryHook<chatRoomWillReport, chatRoomWillReportVariables>(CHAT_ROOM_WILL_REPORT)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//