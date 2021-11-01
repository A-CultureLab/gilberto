/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: iUser
// ====================================================

export interface iUser_iUser_address_area1 {
  __typename: "Area1";
  id: string;
  name: string;
}

export interface iUser_iUser_address_area2 {
  __typename: "Area2";
  id: string;
  name: string;
}

export interface iUser_iUser_address_area3 {
  __typename: "Area3";
  id: string;
  name: string;
}

export interface iUser_iUser_address_land {
  __typename: "Land";
  id: string;
  name: string;
  buildingName: string;
}

export interface iUser_iUser_address {
  __typename: "Address";
  id: string;
  area1: iUser_iUser_address_area1;
  area2: iUser_iUser_address_area2;
  area3: iUser_iUser_address_area3;
  land: iUser_iUser_address_land;
}

export interface iUser_iUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  age: number;
  introduce: string;
  instagramId: string | null;
  notReadChatCount: number;
  address: iUser_iUser_address;
}

export interface iUser {
  iUser: iUser_iUser;
}
