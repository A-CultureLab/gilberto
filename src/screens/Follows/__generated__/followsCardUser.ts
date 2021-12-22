/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: followsCardUser
// ====================================================

export interface followsCardUser_user {
  __typename: "User";
  id: string;
  isIFollowed: boolean;
}

export interface followsCardUser {
  user: followsCardUser_user;
}

export interface followsCardUserVariables {
  userId: string;
}
