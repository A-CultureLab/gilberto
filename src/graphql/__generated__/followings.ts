/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: followings
// ====================================================

export interface followings_followings_targetUser {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  isIFollowed: boolean;
}

export interface followings_followings {
  __typename: "Follow";
  id: string;
  createdAt: any;
  targetUser: followings_followings_targetUser;
}

export interface followings {
  followings: followings_followings[];
}

export interface followingsVariables {
  userId: string;
  take?: number | null;
  skip?: number | null;
}
