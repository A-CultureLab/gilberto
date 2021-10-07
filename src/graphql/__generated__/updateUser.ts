/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_address_area1 {
  __typename: "Area1";
  id: string;
  name: string;
}

export interface updateUser_updateUser_address_area2 {
  __typename: "Area2";
  id: string;
  name: string;
}

export interface updateUser_updateUser_address_area3 {
  __typename: "Area3";
  id: string;
  name: string;
}

export interface updateUser_updateUser_address_land {
  __typename: "Land";
  id: string;
  name: string;
  buildingName: string;
}

export interface updateUser_updateUser_address {
  __typename: "Address";
  id: string;
  area1: updateUser_updateUser_address_area1;
  area2: updateUser_updateUser_address_area2;
  area3: updateUser_updateUser_address_area3;
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
  introduce: string;
  address: updateUser_updateUser_address;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  data: UpdateUserInput;
}
