/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: disLikeMedia
// ====================================================

export interface disLikeMedia_disLikeMedia {
  __typename: "Media";
  id: string;
  isILiked: boolean;
  likeCount: number;
}

export interface disLikeMedia {
  disLikeMedia: disLikeMedia_disLikeMedia;
}

export interface disLikeMediaVariables {
  id: string;
}
