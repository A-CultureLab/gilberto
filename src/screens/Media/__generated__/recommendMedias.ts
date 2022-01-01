/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediasAdressFilterInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: recommendMedias
// ====================================================

export interface recommendMedias_recommendedMedias_recentComments_user {
  __typename: "User";
  id: string;
  profileId: string;
}

export interface recommendMedias_recommendedMedias_recentComments {
  __typename: "MediaComment";
  id: string;
  content: string;
  user: recommendMedias_recommendedMedias_recentComments_user;
}

export interface recommendMedias_recommendedMedias_images {
  __typename: "MediaImage";
  id: string;
  url: string;
}

export interface recommendMedias_recommendedMedias_tagedPets {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
}

export interface recommendMedias_recommendedMedias_user_address {
  __typename: "Address";
  id: string;
  distance: number | null;
}

export interface recommendMedias_recommendedMedias_user {
  __typename: "User";
  id: string;
  profileId: string;
  image: string;
  isMe: boolean;
  isIFollowed: boolean;
  address: recommendMedias_recommendedMedias_user_address;
}

export interface recommendMedias_recommendedMedias {
  __typename: "Media";
  id: string;
  isInstagram: boolean;
  content: string;
  commentCount: number;
  likeCount: number;
  isILiked: boolean;
  recentComments: recommendMedias_recommendedMedias_recentComments[];
  images: recommendMedias_recommendedMedias_images[];
  tagedPets: recommendMedias_recommendedMedias_tagedPets[];
  user: recommendMedias_recommendedMedias_user;
}

export interface recommendMedias {
  recommendedMedias: recommendMedias_recommendedMedias[];
}

export interface recommendMediasVariables {
  cursor?: string | null;
  filter?: MediasAdressFilterInput | null;
}
