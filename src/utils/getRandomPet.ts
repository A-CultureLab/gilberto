import { myPets_myPets } from "../graphql/__generated__/myPets";

const getRandomPet = (pets: myPets_myPets[]) => {
    if (pets.length === 0) return null
    return pets[Math.floor(Math.random() * pets.length)]
}

export default getRandomPet