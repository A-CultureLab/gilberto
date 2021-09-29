/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: likePost
// ====================================================

export interface likePost_likePost {
  __typename: "Post";
  id: string;
  likeCount: number;
  isILiked: boolean;
}

export interface likePost {
  likePost: likePost_likePost;
}

export interface likePostVariables {
  id: string;
  like: boolean;
}
