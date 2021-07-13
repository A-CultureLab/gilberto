/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistPetInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updatePet
// ====================================================

export interface updatePet_updatePet {
  __typename: "Pet";
  id: number;
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
  id: number;
  data: RegistPetInput;
}
