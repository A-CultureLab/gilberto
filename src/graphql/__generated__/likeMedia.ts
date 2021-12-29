/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: likeMedia
// ====================================================

export interface likeMedia_likeMedia {
  __typename: "Media";
  id: string;
  isILiked: boolean;
  likeCount: number;
}

export interface likeMedia {
  likeMedia: likeMedia_likeMedia;
}

export interface likeMediaVariables {
  id: string;
}
