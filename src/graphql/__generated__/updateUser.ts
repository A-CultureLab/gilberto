/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_address_land {
  __typename: "Land";
  id: string;
  fullName: string;
}

export interface updateUser_updateUser_address {
  __typename: "Address";
  id: number;
  land: updateUser_updateUser_address_land;
}

export interface updateUser_updateUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  gender: Gender;
  age: number;
  birth: any;
  instagramId: string | null;
  introduce: string;
  address: updateUser_updateUser_address | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  data: UpdateUserInput;
}
