/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: pet
// ====================================================

export interface pet_pet_user_pets {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
}

export interface pet_pet_user {
  __typename: "User";
  id: string;
  image: string;
  profileId: string;
  name: string;
  followerCount: number;
  followingCount: number;
  isIFollowed: boolean;
  pets: pet_pet_user_pets[];
}

export interface pet_pet {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
  species: string;
  character: string;
  gender: Gender;
  age: string;
  weight: number;
  mediaCount: number;
  user: pet_pet_user;
}

export interface pet {
  pet: pet_pet;
}

export interface petVariables {
  id: string;
}
