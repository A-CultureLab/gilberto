/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userDetail
// ====================================================

export interface userDetail_user {
  __typename: "User";
  image: string;
  name: string;
  id: string;
}

export interface userDetail {
  user: userDetail_user | null;
}

export interface userDetailVariables {
  id: string;
}
