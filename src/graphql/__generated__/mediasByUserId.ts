/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediasByUserId
// ====================================================

export interface mediasByUserId_mediasByUserId_media {
  __typename: "Media";
  id: string;
  isInstagram: boolean;
}

export interface mediasByUserId_mediasByUserId {
  __typename: "MediaAndInstagramMedia";
  id: string;
  instagramEndCursor: string | null;
  thumnail: string;
  media: mediasByUserId_mediasByUserId_media | null;
}

export interface mediasByUserId {
  mediasByUserId: mediasByUserId_mediasByUserId[];
}

export interface mediasByUserIdVariables {
  userId: string;
  instagramEndCursor?: string | null;
}
