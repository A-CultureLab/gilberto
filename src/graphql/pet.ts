import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { myPets, } from "./__generated__/myPets";
import { registPet, registPetVariables } from "./__generated__/registPet";
import { sortPets, sortPetsVariables } from "./__generated__/sortPets";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const REGIST_PET = gql`
    mutation registPet ($data:RegistPetInput!) {
        registPet(data:$data) {
            id
            name
            image
            character
            species
            gender
            birth
            weight
        }
    }
`

export const useCreatePet = createMutationHook<registPet, registPetVariables>(REGIST_PET, {
    update(cache, { data }) {
        const preData = cache.readQuery<myPets>({ query: MY_PETS })?.myPets || []
        cache.writeQuery({
            query: MY_PETS,
            data: { myPets: [...preData, data?.registPet] }
        })
    }
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MY_PETS = gql`
    query myPets {
        myPets {
            id
            name
            image
            character
            species
            gender
            birth
            weight
        }

    }
`

export const useMyPets = createQueryHook<myPets, {}>(MY_PETS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const SORT_PETS = gql`
    mutation sortPets ($data: [Int!]!) {
        sortPets(data: $data) {
            id
            orderKey
        }
    }
`

export const useSortPets = createMutationHook<sortPets, sortPetsVariables>(SORT_PETS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

