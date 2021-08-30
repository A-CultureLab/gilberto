import { gql } from "@apollo/client"
import { createMutationHook } from "../lib/createApolloHook"
import { updateUserChatRoomInfo, updateUserChatRoomInfoVariables } from "./__generated__/updateUserChatRoomInfo"

const UPDATE_USER_CHAT_ROOM_INFO = gql`
mutation updateUserChatRoomInfo($input: UpdateUserChatRoomInfoInput!) {
    updateUserChatRoomInfo(input: $input) {
        id
        bookmarked
        notificated
        blocked
        chatRoom {
            id
            isBlockedMe
            isIBlocked
        }
    }
}
`

export const useUpdateUserChatRoomInfo = createMutationHook<updateUserChatRoomInfo, updateUserChatRoomInfoVariables>(UPDATE_USER_CHAT_ROOM_INFO)