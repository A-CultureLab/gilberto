/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePostInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost {
  __typename: "Post";
  id: string;
}

export interface createPost {
  createPost: createPost_createPost;
}

export interface createPostVariables {
  data: CreatePostInput;
}
