/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistPetInput, PetType, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: registPet
// ====================================================

export interface registPet_registPet {
  __typename: "Pet";
  id: string;
  type: PetType;
  name: string;
  image: string;
  character: string;
  birth: any;
  species: string;
  gender: Gender;
  age: string;
  weight: number;
  vaccinated: boolean;
  neutered: boolean;
}

export interface registPet {
  registPet: registPet_registPet | null;
}

export interface registPetVariables {
  data: RegistPetInput;
}
