import { createLazyQueryHook, createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { deletePet, deletePetVariables } from "./__generated__/deletePet";
import { registPet, registPetVariables } from "./__generated__/registPet";
import { sortPets, sortPetsVariables } from "./__generated__/sortPets";
import { updatePet, updatePetVariables } from "./__generated__/updatePet";

import { gql } from "@apollo/client";
import { myPets, } from "./__generated__/myPets";
import { petGroupByAddress, petGroupByAddressVariables } from "./__generated__/petGroupByAddress";
import { petsByAddress, petsByAddressVariables } from "./__generated__/petsByAddress";
import { pet, petVariables } from "./__generated__/pet";
import { pets, petsVariables } from "./__generated__/pets";

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
            user {
                id
                pets {
                    id
                    image
                }
            }
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
    mutation sortPets ($data: [String!]!) {
        sortPets(data: $data) {
            id
            orderKey
        }
    }
`

export const useSortPets = createMutationHook<sortPets, sortPetsVariables>(SORT_PETS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const UPDATE_PET = gql`
    mutation updatePet ($id:String!, $data:RegistPetInput!) {
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
    mutation deletePet ($id:String!) {
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
export const PET_GROUP_BY_ADDRESS = gql`
    query petGroupByAddress ($cameraRegion:CameraRegionInput!) {
        petGroupByAddress(cameraRegion: $cameraRegion) {
            groupBy
            petGroup {
                id
                groupName
                count
                region {
                    latitude
                    longitude
                }
                pets {
                    id
                    image
                }
            }
        }
    }
`

export const usePetGroupByAddress = createLazyQueryHook<petGroupByAddress, petGroupByAddressVariables>(PET_GROUP_BY_ADDRESS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const PETS_BY_ADDRESS = gql`
  query petsByAddress ($addressGroupId:String!, $take:Int, $skip:Int) {
    petsByAddress(addressGroupId: $addressGroupId, take:$take, skip:$skip ) {
        id
        image
        name
        species
        character
        gender
        age
        weight
        age
        user {
            id
            name
            age
            gender
            address {
                distance
            }
        }
    }
  }
`
export const usePetsByAddress = createQueryHook<petsByAddress, petsByAddressVariables>(PETS_BY_ADDRESS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const PET = gql`
  query pet ($id:String!) {
    pet(where: {id:$id}) {
        id
        image
        name
        species
        character
        gender
        age
        weight
        neutered
        vaccinated
        user {
            id
            image
            name
            gender
            age
            pets {
                id
                image
            }
        } 
    }
  }
`
export const usePet = createQueryHook<pet, petVariables>(PET)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
export const PETS = gql`
  query pets ($filter: PetsAdressFilterInput!, $skip: Int) {
    pets(filter:$filter, skip:$skip) {
        id
        image
        name
        species
        character
        gender
        age
        weight
        age
        user {
            id
            name
            age
            gender
            address {
                distance
            }
        }
    }
  }
`
export const usePets = createQueryHook<pets, petsVariables>(PETS)
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//