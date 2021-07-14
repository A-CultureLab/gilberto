/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistPetInput, PetType, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updatePet
// ====================================================

export interface updatePet_updatePet {
  __typename: "Pet";
  id: number;
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

export interface updatePet {
  updatePet: updatePet_updatePet | null;
}

export interface updatePetVariables {
  id: number;
  data: RegistPetInput;
}
