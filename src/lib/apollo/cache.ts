import { InMemoryCache } from "@apollo/client";
import { cursorPagination, offsetLimitPagination } from "./pagination";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                userGroupByAddress: offsetLimitPagination(['groupByAddress']),
                chatRooms: cursorPagination([]),
                chats: cursorPagination(['chatRoomId'])
            }
        }
    },
})
