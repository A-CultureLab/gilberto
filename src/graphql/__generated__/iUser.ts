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
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  age: number;
  addressId: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  instagramId: string | null;
  introduce: string;
}

export interface iUser {
  iUser: iUser_iUser;
}
