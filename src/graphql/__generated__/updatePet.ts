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
}

export interface updatePet {
  updatePet: updatePet_updatePet | null;
}

export interface updatePetVariables {
  id: string;
  data: RegistPetInput;
}
