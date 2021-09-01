import { Gender } from "../../__generated__/globalTypes";

const userGenderGenerator = (gender: Gender) => {
    if (gender === Gender.male) return '남자'
    else return '여자'
}
const petGenderGenerator = (gender: Gender) => {
    if (gender === Gender.male) return '남아'
    else return '여아'
}

export default {
    user: userGenderGenerator,
    pet: petGenderGenerator
}