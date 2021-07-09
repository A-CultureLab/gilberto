import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError } from "@apollo/client"
import { useNavigation } from "@react-navigation/core"
import { DocumentNode } from "graphql"


const errorLogger = (error: ApolloError) => {
    if (__DEV__) console.log(error.message)
    // toastMessageVar(error.message)
}



export const createQueryHook = <Data, Vars>(query: DocumentNode, preOptions?: QueryHookOptions<Data, Vars>) => (options?: QueryHookOptions<Data, Vars>) =>
    useQuery<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })


export const createMutationHook = <Data, Vars>(query: DocumentNode, preOptions?: MutationHookOptions<Data, Vars>) => (options?: MutationHookOptions<Data, Vars>) =>
    useMutation<Data, Vars>(query, {
        ...preOptions,
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })


