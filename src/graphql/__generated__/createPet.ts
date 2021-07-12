/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PetCreateInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPet
// ====================================================

export interface createPet_createOnePet {
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

export interface createPet {
  createOnePet: createPet_createOnePet;
}

export interface createPetVariables {
  data: PetCreateInput;
}
