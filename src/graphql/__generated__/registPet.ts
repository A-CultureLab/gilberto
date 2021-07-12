/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegistPetInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: registPet
// ====================================================

export interface registPet_registPet {
  __typename: "Pet";
  id: number;
  name: string;
  image: string;
  character: string;
  species: string;
  gender: Gender;
  birth: any;
  weight: number;
}

export interface registPet {
  registPet: registPet_registPet | null;
}

export interface registPetVariables {
  data: RegistPetInput;
}
