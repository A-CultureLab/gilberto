/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostReplyCommentCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPostReplyComment
// ====================================================

export interface createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments_user_address {
  __typename: "Address";
  id: string;
  addressShort: string;
}

export interface createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments_user_address;
}

export interface createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments {
  __typename: "PostReplyComment";
  id: string;
  createdAt: any;
  content: string;
  image: string | null;
  isPoster: boolean;
  user: createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments_user;
}

export interface createPostReplyComment_createOnePostReplyComment_postComment_post {
  __typename: "Post";
  id: string;
  commentCount: number;
}

export interface createPostReplyComment_createOnePostReplyComment_postComment {
  __typename: "PostComment";
  id: string;
  postReplyCommentCount: number;
  recentPostReplyComments: createPostReplyComment_createOnePostReplyComment_postComment_recentPostReplyComments[];
  post: createPostReplyComment_createOnePostReplyComment_postComment_post;
}

export interface createPostReplyComment_createOnePostReplyComment {
  __typename: "PostReplyComment";
  id: string;
  postComment: createPostReplyComment_createOnePostReplyComment_postComment;
}

export interface createPostReplyComment {
  createOnePostReplyComment: createPostReplyComment_createOnePostReplyComment;
}

export interface createPostReplyCommentVariables {
  data: PostReplyCommentCreateInput;
}
