/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: userWillReport
// ====================================================

export interface userWillReport_user {
  __typename: "User";
  id: string;
  name: string;
  age: number;
  gender: Gender;
  image: string;
}

export interface userWillReport {
  user: userWillReport_user;
}

export interface userWillReportVariables {
  id: string;
}
