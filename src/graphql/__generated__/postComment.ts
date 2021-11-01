/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: postComment
// ====================================================

export interface postComment_postComment_user_address {
  __typename: "Address";
  id: string;
  addressShort: string;
}

export interface postComment_postComment_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: postComment_postComment_user_address;
}

export interface postComment_postComment {
  __typename: "PostComment";
  id: string;
  createdAt: any;
  content: string;
  image: string | null;
  isPoster: boolean;
  user: postComment_postComment_user;
}

export interface postComment {
  postComment: postComment_postComment;
}

export interface postCommentVariables {
  id: string;
}
