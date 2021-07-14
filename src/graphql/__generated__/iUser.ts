/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: iUser
// ====================================================

export interface iUser_iUser {
  __typename: "User";
  id: string;
  image: string;
  name: string;
  age: number;
  gender: Gender;
  address: string;
}

export interface iUser {
  iUser: iUser_iUser;
}
