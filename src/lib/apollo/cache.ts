import { InMemoryCache } from "@apollo/client";
import { cursorPagination, offsetLimitPagination } from "./pagination";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                pets: offsetLimitPagination(['where']),
                chatRooms: cursorPagination([]),
                chats: cursorPagination(['chatRoomId'])
            }
        }
    },
})
