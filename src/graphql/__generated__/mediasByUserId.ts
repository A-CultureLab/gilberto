/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediasByUserId
// ====================================================

export interface mediasByUserId_mediasByUserId_instagramMedia {
  __typename: "InstagramMedia";
  image: string;
  id: string;
}

export interface mediasByUserId_mediasByUserId {
  __typename: "MediaAndInstagramMedia";
  id: string;
  instagramEndCursor: string | null;
  instagramMedia: mediasByUserId_mediasByUserId_instagramMedia | null;
}

export interface mediasByUserId {
  mediasByUserId: mediasByUserId_mediasByUserId[];
}

export interface mediasByUserIdVariables {
  userId: string;
  instagramEndCursor?: string | null;
  init?: boolean | null;
}
