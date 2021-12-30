/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediaCommentsComments
// ====================================================

export interface mediaCommentsComments_mediaComments_user {
  __typename: "User";
  id: string;
  profileId: string;
  image: string;
  isMe: boolean;
}

export interface mediaCommentsComments_mediaComments {
  __typename: "MediaComment";
  id: string;
  createdAt: any;
  content: string;
  replyCommentCount: number;
  user: mediaCommentsComments_mediaComments_user;
}

export interface mediaCommentsComments {
  mediaComments: mediaCommentsComments_mediaComments[];
}

export interface mediaCommentsCommentsVariables {
  mediaId: string;
  skip: number;
}
