/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaCommentCreateInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createMediaComment
// ====================================================

export interface createMediaComment_createOneMediaComment_media_recentComments_user {
  __typename: "User";
  id: string;
  profileId: string;
}

export interface createMediaComment_createOneMediaComment_media_recentComments {
  __typename: "MediaComment";
  id: string;
  content: string;
  user: createMediaComment_createOneMediaComment_media_recentComments_user;
}

export interface createMediaComment_createOneMediaComment_media {
  __typename: "Media";
  id: string;
  commentCount: number;
  recentComments: createMediaComment_createOneMediaComment_media_recentComments[];
}

export interface createMediaComment_createOneMediaComment {
  __typename: "MediaComment";
  id: string;
  media: createMediaComment_createOneMediaComment_media;
}

export interface createMediaComment {
  createOneMediaComment: createMediaComment_createOneMediaComment;
}

export interface createMediaCommentVariables {
  data: MediaCommentCreateInput;
}
