/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostsAdressFilterInput, PostType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: posts
// ====================================================

export interface posts_posts_images {
  __typename: "PostImage";
  id: string;
  url: string;
}

export interface posts_posts_user_address {
  __typename: "Address";
  id: string;
  addressShort: string;
  distance: number | null;
}

export interface posts_posts_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: posts_posts_user_address;
}

export interface posts_posts {
  __typename: "Post";
  id: string;
  createdAt: any;
  isILiked: boolean;
  likeCount: number;
  images: posts_posts_images[];
  content: string;
  type: PostType;
  commentCount: number;
  user: posts_posts_user;
}

export interface posts {
  posts: posts_posts[];
}

export interface postsVariables {
  filter?: PostsAdressFilterInput | null;
  take?: number | null;
  skip?: number | null;
}
