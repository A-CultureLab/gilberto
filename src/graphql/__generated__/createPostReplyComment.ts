/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostReplyCommentCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPostReplyComment
// ====================================================

export interface createPostReplyComment_createOnePostReplyComment_postComment_post {
  __typename: "Post";
  id: string;
  commentCount: number;
}

export interface createPostReplyComment_createOnePostReplyComment_postComment {
  __typename: "PostComment";
  id: string;
  postReplyCommentCount: number;
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