import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { deletePet, deletePetVariables } from "./__generated__/deletePet";
import { myPets, } from "./__generated__/myPets";
import { registPet, registPetVariables } from "./__generated__/registPet";
import { sortPets, sortPetsVariables } from "./__generated__/sortPets";
import { updatePet, updatePetVariables } from "./__generated__/updatePet";

//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const REGIST_PET = gql`
    mutation registPet ($data:RegistPetInput!) {
        registPet(data:$data) {
            id
            type
            name
            image
            character
            birth
            species
            gender
            age
            weight
            vaccinated
            neutered
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
            type
            name
            image
            character
            birth
            species
            gender
            age
            weight
            vaccinated
            neutered
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
export const UPDATE_PET = gql`
    mutation updatePet ($id:Int!, $data:RegistPetInput!) {
        updatePet(id:$id data:$data) {
            id
            type
            name
            image
            character
            birth
            species
            gender
            age
            weight
            vaccinated
            neutered
        }
    }
`

export const useUpdatePet = createMutationHook<updatePet, updatePetVariables>(UPDATE_PET)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const DELETE_PET = gql`
    mutation deletePet ($id:Int!) {
        deletePet(id:$id) {
            id
        }
    }
`

export const useDeletePet = createMutationHook<deletePet, deletePetVariables>(DELETE_PET, {
    update(cache, { data }) {
        const preData = cache.readQuery<myPets>({ query: MY_PETS })?.myPets || []
        cache.writeQuery({
            query: MY_PETS,
            data: { myPets: preData.filter(({ id }) => id !== data?.deletePet?.id) }
        })
    }
})
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

