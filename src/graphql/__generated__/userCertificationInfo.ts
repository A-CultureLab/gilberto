/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: userCertificationInfo
// ====================================================

export interface userCertificationInfo_userCertificationInfo {
  __typename: "UserCertificationInfo";
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
}

export interface userCertificationInfo {
  userCertificationInfo: userCertificationInfo_userCertificationInfo;
}

export interface userCertificationInfoVariables {
  imp_uid: string;
}
