/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostsAdressFilterInput, PostType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: feeds
// ====================================================

export interface feeds_feeds_post_images {
  __typename: "PostImage";
  id: string;
  url: string;
}

export interface feeds_feeds_post_user_address {
  __typename: "Address";
  id: string;
  adressShort: string;
  distance: number | null;
}

export interface feeds_feeds_post_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  address: feeds_feeds_post_user_address;
}

export interface feeds_feeds_post {
  __typename: "Post";
  id: string;
  createdAt: any;
  isILiked: boolean;
  likeCount: number;
  images: feeds_feeds_post_images[];
  content: string;
  type: PostType;
  commentCount: number;
  user: feeds_feeds_post_user;
}

export interface feeds_feeds_news {
  __typename: "News";
  id: string;
  createdAt: any;
  title: string;
  image: string;
  content: string;
  link: string;
}

export interface feeds_feeds {
  __typename: "Feed";
  id: string;
  post: feeds_feeds_post | null;
  news: feeds_feeds_news | null;
}

export interface feeds {
  feeds: feeds_feeds[];
}

export interface feedsVariables {
  filter?: PostsAdressFilterInput | null;
  take?: number | null;
  skipPost?: number | null;
  skipNews?: number | null;
}
