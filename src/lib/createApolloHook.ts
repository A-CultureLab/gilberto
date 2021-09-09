import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError, useLazyQuery, SubscriptionHookOptions, useSubscription } from "@apollo/client"
import { DocumentNode } from "graphql"
import useGlobalUi from "../hooks/useGlobalUi"


const errorLogger = (error: ApolloError, toast: any) => {
    if (__DEV__) console.log(error.message)
    for (const graphqlError of error.graphQLErrors) {
        if (graphqlError.extensions?.notification) {
            // toast
            toast({ content: graphqlError.message })
        } else {
            toast({ content: '알 수 없는 오류' })
        }
    }
}



export const createQueryHook = <Data, Vars>(query: DocumentNode, preOptions?: QueryHookOptions<Data, Vars>) => (options?: QueryHookOptions<Data, Vars>) => {
    const { toast } = useGlobalUi()
    return useQuery<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error, toast)
            options?.onError && options.onError(error)
        },
    })
}

export const createLazyQueryHook = <Data, Vars>(query: DocumentNode, preOptions?: QueryHookOptions<Data, Vars>) => (options?: QueryHookOptions<Data, Vars>) => {
    const { toast } = useGlobalUi()
    return useLazyQuery<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error, toast)
            options?.onError && options.onError(error)
        },
    })
}
export const createMutationHook = <Data, Vars>(query: DocumentNode, preOptions?: MutationHookOptions<Data, Vars>) => (options?: MutationHookOptions<Data, Vars>) => {
    const { toast } = useGlobalUi()
    return useMutation<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error, toast)
            options?.onError && options.onError(error)
        },
    })
}
export const createSubscriptionHook = <Data, Vars>(query: DocumentNode, preOptions?: SubscriptionHookOptions<Data, Vars>) => (options?: SubscriptionHookOptions<Data, Vars>) =>
    useSubscription<Data, Vars>(query, {
        ...preOptions,
        ...options
    })