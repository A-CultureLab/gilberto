/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user_pets {
  __typename: "Pet";
  id: string;
  image: string;
}

export interface user_user_address {
  __typename: "Address";
  id: string;
  distance: number | null;
  addressFull: string;
}

export interface user_user {
  __typename: "User";
  id: string;
  image: string;
  name: string;
  age: number;
  gender: Gender;
  introduce: string;
  instagramId: string | null;
  pets: user_user_pets[];
  address: user_user_address;
}

export interface user {
  user: user_user;
}

export interface userVariables {
  where: UserWhereUniqueInput;
}
