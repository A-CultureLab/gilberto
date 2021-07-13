import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { myPets, } from "./__generated__/myPets";
import auth from '@react-native-firebase/auth'
import { registPet, registPetVariables } from "./__generated__/registPet";

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
        cache.modify({
            fields: {
                myPets(existingRefs = []) {
                    if (!data) return existingRefs
                    const pet = data.registPet
                    const newRefs = cache.writeFragment({
                        data: pet,
                        fragment: gql`
                          fragment newPet on Pet {
                            id
                          }
                        `
                    })
                    // 이미 있는 id가 있다면 그냥 유지
                    if (existingRefs.filter((v: any) => v.__ref === newRefs?.__ref).length > 0) {
                        return existingRefs
                    }
                    return [...existingRefs, newRefs]
                }
            }
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