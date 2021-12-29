/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: media
// ====================================================

export interface media_media_recentComments_user {
  __typename: "User";
  id: string;
  profileId: string;
}

export interface media_media_recentComments {
  __typename: "MediaComment";
  id: string;
  content: string;
  user: media_media_recentComments_user;
}

export interface media_media_images {
  __typename: "MediaImage";
  id: string;
  url: string;
}

export interface media_media_tagedPets {
  __typename: "Pet";
  id: string;
  image: string;
  name: string;
}

export interface media_media_user_address {
  __typename: "Address";
  id: string;
  distance: number | null;
}

export interface media_media_user {
  __typename: "User";
  id: string;
  profileId: string;
  image: string;
  isMe: boolean;
  isIFollowed: boolean;
  address: media_media_user_address;
}

export interface media_media {
  __typename: "Media";
  id: string;
  isInstagram: boolean;
  content: string;
  commentCount: number;
  likeCount: number;
  isILiked: boolean;
  recentComments: media_media_recentComments[];
  images: media_media_images[];
  tagedPets: media_media_tagedPets[];
  user: media_media_user;
}

export interface media {
  media: media_media;
}

export interface mediaVariables {
  id: string;
}
