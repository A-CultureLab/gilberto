import { FieldPolicy, Reference } from "@apollo/client";


type KeyArgs = FieldPolicy<any>["keyArgs"]


export const offsetLimitPagination = <T = Reference>(keyArgs: KeyArgs = false): FieldPolicy<T[]> => {
    return {
        keyArgs,
        merge(existing, incoming, { args }) {
            const merged = existing ? existing.slice(0) : [];
            if (args) {
                const { skip = 0 } = args;
                for (let i = 0; i < incoming.length; ++i) {
                    merged[skip + i] = incoming[i];
                }
            } else {
                merged.push.apply(merged, incoming as T[]);
            }
            return merged;
        },
    }
}



export const cursorPagination = <T = Reference>(keyArgs: KeyArgs = false): FieldPolicy<T[]> => {
    return {
        keyArgs,
        merge(existing, incoming, { args: { cursor }, readField }: any) {
            if (!cursor) return incoming
            let merged = existing ? existing.slice(0) : [];
            let index = merged.length - 1

            for (let i = merged.length - 1; i >= 0; i--) {
                if (readField('id', merged[i]) === cursor) {
                    index = i
                    break
                }
            }
            merged = merged.slice(0, index)
            merged = [...merged, ...incoming]

            return merged
        }
    }
}

