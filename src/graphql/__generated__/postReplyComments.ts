/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: postReplyComments
// ====================================================

export interface postReplyComments_postReplyComments_user_address {
  __typename: "Address";
  id: string;
  addressShort: string;
}

export interface postReplyComments_postReplyComments_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: postReplyComments_postReplyComments_user_address;
}

export interface postReplyComments_postReplyComments {
  __typename: "PostReplyComment";
  id: string;
  createdAt: any;
  content: string;
  image: string | null;
  isPoster: boolean;
  user: postReplyComments_postReplyComments_user;
}

export interface postReplyComments {
  postReplyComments: postReplyComments_postReplyComments[];
}

export interface postReplyCommentsVariables {
  postId: string;
  skip?: number | null;
}
