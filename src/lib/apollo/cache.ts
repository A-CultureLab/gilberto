import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                pets: offsetLimitPagination(['where']),
                chatRooms: offsetLimitPagination(['where']),
                chats: {
                    keyArgs: ["chatRoomId"],
                    //@ts-ignore
                    merge(existing = [], incoming, { args: { cursor }, readField }) {
                        if (!cursor) return incoming
                        let index = existing.length - 1

                        for (let i = existing.length - 1; i >= 0; i--) {
                            if (readField('id', existing[i]) === cursor) {
                                index = i
                                break
                            }
                        }

                        let merged = existing.slice(0, index)
                        merged = [...merged, ...incoming]

                        return merged
                    }
                },
            }
        }
    },
})


// @ts-ignore
export function offsetLimitPagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        // @ts-ignore
        merge: function (existing, incoming, _a) {
            var args = _a.args;
            var merged = existing ? existing.slice(0) : [];
            if (args) {
                var _b = args.skip, skip = _b === void 0 ? 0 : _b;
                for (var i = 0; i < incoming.length; ++i) {
                    merged[skip + i] = incoming[i];
                }
            }
            else {
                merged.push.apply(merged, incoming);
            }
            return merged;
        },
    };
}