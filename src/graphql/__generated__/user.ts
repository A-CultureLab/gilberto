/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user {
  __typename: "User";
  image: string;
  name: string;
  age: number;
  gender: Gender;
  id: string;
}

export interface user {
  user: user_user | null;
}

export interface userVariables {
  where: UserWhereUniqueInput;
}
