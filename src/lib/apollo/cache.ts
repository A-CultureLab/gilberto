import { InMemoryCache } from "@apollo/client";
import { cursorPagination, offsetLimitPagination } from "./pagination";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                petsByAddress: offsetLimitPagination(['addressGroupId']),
                chatRooms: cursorPagination([]),
                chats: cursorPagination(['chatRoomId'])
            }
        }
    },
})
