/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePostInput, PostType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updatePost
// ====================================================

export interface updatePost_updatePost_images {
  __typename: "PostImage";
  id: string;
  url: string;
}

export interface updatePost_updatePost {
  __typename: "Post";
  id: string;
  type: PostType;
  content: string;
  images: updatePost_updatePost_images[];
}

export interface updatePost {
  updatePost: updatePost_updatePost;
}

export interface updatePostVariables {
  data: UpdatePostInput;
}
