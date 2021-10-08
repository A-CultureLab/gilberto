/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: petsByAddress
// ====================================================

export interface petsByAddress_petsByAddress_user {
  __typename: "User";
  id: string;
  name: string;
  age: number;
  gender: Gender;
}

export interface petsByAddress_petsByAddress {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
  species: string;
  character: string;
  gender: Gender;
  age: string;
  weight: number;
  user: petsByAddress_petsByAddress_user;
}

export interface petsByAddress {
  petsByAddress: petsByAddress_petsByAddress[];
}

export interface petsByAddressVariables {
  addressGroupId: string;
  take?: number | null;
  skip?: number | null;
}
