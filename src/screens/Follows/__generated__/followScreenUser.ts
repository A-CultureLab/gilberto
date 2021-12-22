/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: followScreenUser
// ====================================================

export interface followScreenUser_user {
  __typename: "User";
  id: string;
  profileId: string;
}

export interface followScreenUser {
  user: followScreenUser_user;
}

export interface followScreenUserVariables {
  userId: string;
}
