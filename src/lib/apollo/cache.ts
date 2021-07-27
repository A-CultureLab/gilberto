import { InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";


export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                pets: offsetLimitPagination(['where']),
                chatRooms: offsetLimitPagination(['where'])
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