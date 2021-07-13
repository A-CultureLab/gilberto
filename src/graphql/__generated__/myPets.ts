/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: myPets
// ====================================================

export interface myPets_myPets {
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

export interface myPets {
  myPets: myPets_myPets[];
}
