/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: iUser
// ====================================================

export interface iUser_iUser_address {
  __typename: "Address";
  addressName: string;
  buildingName: string;
  postcode: string;
}

export interface iUser_iUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  age: number;
  addressPostcode: string | null;
  instagramId: string | null;
  introduce: string;
  notReadChatCount: number;
  address: iUser_iUser_address | null;
}

export interface iUser {
  iUser: iUser_iUser;
}
