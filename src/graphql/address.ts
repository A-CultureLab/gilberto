import { gql } from "@apollo/client"
import { createMutationHook } from "../lib/createApolloHook"
import { createAddress, createAddressVariables } from "./__generated__/createAddress"

export const CREATE_ADDRESS = gql`
mutation createAddress ($latitude:Float!, $longitude:Float!) {
  createAddress(latitude: $latitude, longitude: $longitude) {
    id
    land {
      id
      fullName
    }
  }
}
`

export const useCreateAddress = createMutationHook<createAddress, createAddressVariables>(CREATE_ADDRESS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//