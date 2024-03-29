import { InMemoryCache } from "@apollo/client";
import { cursorPagination, offsetLimitPagination, offsetLimitPaginationMergeLastest } from "./pagination";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                petsByAddress: offsetLimitPagination(['addressGroupId']),
                posts: offsetLimitPagination(['filter']),
                feeds: offsetLimitPaginationMergeLastest(['filter']),
                chatRooms: cursorPagination([]),
                chats: cursorPagination(['chatRoomId']),
                postComments: offsetLimitPagination(['where']),
                postReplyComments: offsetLimitPagination(['where']),
                mediasByUserId: offsetLimitPaginationMergeLastest(['userId']),
                followers: offsetLimitPaginationMergeLastest(['userId']),
                followings: offsetLimitPaginationMergeLastest(['userId']),
                mediaComments: offsetLimitPaginationMergeLastest(['where', 'orderBy']),
                mediaReplyComments: offsetLimitPaginationMergeLastest(['where', 'orderBy']),
                recommendedMedias: cursorPagination(['filter'])
            }
        }
    },
})
