/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMediaInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createMedia
// ====================================================

export interface createMedia_createMedia {
  __typename: "Media";
  id: string;
}

export interface createMedia {
  createMedia: createMedia_createMedia;
}

export interface createMediaVariables {
  input: CreateMediaInput;
}
