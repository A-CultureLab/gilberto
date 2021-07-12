import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { createPet, createPetVariables } from "./__generated__/createPet";
import { myPets, myPetsVariables } from "./__generated__/myPets";

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

export const useCreatePet = createMutationHook<createPet, createPetVariables>(REGIST_PET)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const MY_PETS = gql`
    query myPets ($userId: String!) {
        pets(where:{userId: {equals:$userId}}) {
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

export const useMyPets = createQueryHook<myPets, myPetsVariables>(MY_PETS)