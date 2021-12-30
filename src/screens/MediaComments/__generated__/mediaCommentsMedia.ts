/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediaCommentsMedia
// ====================================================

export interface mediaCommentsMedia_media_user {
  __typename: "User";
  id: string;
  isMe: boolean;
  profileId: string;
  image: string;
}

export interface mediaCommentsMedia_media {
  __typename: "Media";
  id: string;
  createdAt: any;
  content: string;
  user: mediaCommentsMedia_media_user;
}

export interface mediaCommentsMedia {
  media: mediaCommentsMedia_media;
}

export interface mediaCommentsMediaVariables {
  id: string;
}
