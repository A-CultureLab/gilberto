/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PetsAdressFilterInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: pets
// ====================================================

export interface pets_pets_user_address {
  __typename: "Address";
  distance: number | null;
}

export interface pets_pets_user {
  __typename: "User";
  id: string;
  name: string;
  age: number;
  gender: Gender;
  address: pets_pets_user_address;
}

export interface pets_pets {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
  species: string;
  character: string;
  gender: Gender;
  age: string;
  weight: number;
  user: pets_pets_user;
}

export interface pets {
  pets: pets_pets[];
}

export interface petsVariables {
  filter: PetsAdressFilterInput;
  skip?: number | null;
}
