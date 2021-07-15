/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  gender: Gender;
  age: number;
  birth: any;
  addressId: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  instagramId: string | null;
  introduce: string;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  data: UpdateUserInput;
}
