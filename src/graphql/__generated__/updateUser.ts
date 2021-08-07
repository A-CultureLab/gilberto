/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_address {
  __typename: "Address";
  postcode: string;
  addressName: string;
  buildingName: string;
}

export interface updateUser_updateUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  gender: Gender;
  age: number;
  birth: any;
  addressPostcode: string | null;
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
