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

export interface user_user_address_area1 {
  __typename: "Area1";
  id: string;
  name: string;
}

export interface user_user_address_area2 {
  __typename: "Area2";
  id: string;
  name: string;
}

export interface user_user_address_area3 {
  __typename: "Area3";
  id: string;
  name: string;
}

export interface user_user_address_land {
  __typename: "Land";
  id: string;
  name: string;
  buildingName: string;
}

export interface user_user_address {
  __typename: "Address";
  id: string;
  area1: user_user_address_area1;
  area2: user_user_address_area2;
  area3: user_user_address_area3;
  land: user_user_address_land;
}

export interface user_user {
  __typename: "User";
  id: string;
  image: string;
  name: string;
  age: number;
  gender: Gender;
  introduce: string;
  pets: user_user_pets[];
  address: user_user_address;
}

export interface user {
  user: user_user;
}

export interface userVariables {
  where: UserWhereUniqueInput;
}
