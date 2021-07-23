/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PetWhereInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: petsFilterByPostcode
// ====================================================

export interface petsFilterByPostcode_pets {
  __typename: "Pet";
  id: number;
  name: string;
  image: string;
}

export interface petsFilterByPostcode {
  pets: petsFilterByPostcode_pets[];
}

export interface petsFilterByPostcodeVariables {
  where?: PetWhereInput | null;
  skip?: number | null;
  take?: number | null;
}
