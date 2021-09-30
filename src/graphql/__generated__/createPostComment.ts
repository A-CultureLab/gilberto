/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostCommentCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPostComment
// ====================================================

export interface createPostComment_createOnePostComment_post {
  __typename: "Post";
  id: string;
  commentCount: number;
}

export interface createPostComment_createOnePostComment {
  __typename: "PostComment";
  id: string;
  post: createPostComment_createOnePostComment_post;
}

export interface createPostComment {
  createOnePostComment: createPostComment_createOnePostComment;
}

export interface createPostCommentVariables {
  data: PostCommentCreateInput;
}
