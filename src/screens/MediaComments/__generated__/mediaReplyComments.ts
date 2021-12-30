/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediaReplyComments
// ====================================================

export interface mediaReplyComments_mediaReplyComments_user {
  __typename: "User";
  id: string;
  profileId: string;
  image: string;
  isMe: boolean;
}

export interface mediaReplyComments_mediaReplyComments {
  __typename: "MediaReplyComment";
  id: string;
  createdAt: any;
  content: string;
  user: mediaReplyComments_mediaReplyComments_user;
}

export interface mediaReplyComments {
  mediaReplyComments: mediaReplyComments_mediaReplyComments[];
}

export interface mediaReplyCommentsVariables {
  mediaCommentId: string;
  skip: number;
}
