/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: post
// ====================================================

export interface post_post_images {
  __typename: "PostImage";
  id: string;
  url: string;
}

export interface post_post_user_address {
  __typename: "Address";
  id: string;
  addressShort: string;
  distance: number | null;
}

export interface post_post_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: post_post_user_address;
}

export interface post_post {
  __typename: "Post";
  id: string;
  createdAt: any;
  isILiked: boolean;
  likeCount: number;
  images: post_post_images[];
  content: string;
  type: PostType;
  commentCount: number;
  user: post_post_user;
}

export interface post {
  post: post_post;
}

export interface postVariables {
  id: string;
}
