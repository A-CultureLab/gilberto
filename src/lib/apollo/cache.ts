import { InMemoryCache } from "@apollo/client";
import { cursorPagination, offsetLimitPagination } from "./pagination";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                petsByAddress: offsetLimitPagination(['addressGroupId']),
                posts: offsetLimitPagination(['filter']),
                chatRooms: cursorPagination([]),
                chats: cursorPagination(['chatRoomId']),
                postComments: offsetLimitPagination(['postId'])
            }
        }
    },
})
