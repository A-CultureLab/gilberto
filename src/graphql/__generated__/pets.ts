/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PetWhereInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: pets
// ====================================================

export interface pets_pets {
  __typename: "Pet";
  id: number;
  name: string;
  image: string;
}

export interface pets {
  pets: pets_pets[];
}

export interface petsVariables {
  where?: PetWhereInput | null;
  skip?: number | null;
  take?: number | null;
}
