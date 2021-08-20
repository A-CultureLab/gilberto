/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sortPets
// ====================================================

export interface sortPets_sortPets {
  __typename: "Pet";
  id: string;
  orderKey: number;
}

export interface sortPets {
  sortPets: sortPets_sortPets[];
}

export interface sortPetsVariables {
  data: string[];
}
