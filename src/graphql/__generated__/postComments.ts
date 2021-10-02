/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: postComments
// ====================================================

export interface postComments_postComments_user_address {
  __typename: "Address";
  id: string;
  adressShort: string;
}

export interface postComments_postComments_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: postComments_postComments_user_address;
}

export interface postComments_postComments_recentPostReplyComments_user_address {
  __typename: "Address";
  id: string;
  adressShort: string;
}

export interface postComments_postComments_recentPostReplyComments_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: postComments_postComments_recentPostReplyComments_user_address;
}

export interface postComments_postComments_recentPostReplyComments {
  __typename: "PostReplyComment";
  id: string;
  createdAt: any;
  content: string;
  image: string | null;
  user: postComments_postComments_recentPostReplyComments_user;
}

export interface postComments_postComments {
  __typename: "PostComment";
  id: string;
  createdAt: any;
  content: string;
  image: string | null;
  postReplyCommentCount: number;
  user: postComments_postComments_user;
  recentPostReplyComments: postComments_postComments_recentPostReplyComments[];
}

export interface postComments {
  postComments: postComments_postComments[];
}

export interface postCommentsVariables {
  postId: string;
  skip?: number | null;
}
