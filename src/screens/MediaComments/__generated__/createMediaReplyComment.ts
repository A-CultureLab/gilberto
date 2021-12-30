/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaReplyCommentCreateInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createMediaReplyComment
// ====================================================

export interface createMediaReplyComment_createOneMediaReplyComment_mediaComment_media_recentComments_user {
  __typename: "User";
  id: string;
  profileId: string;
}

export interface createMediaReplyComment_createOneMediaReplyComment_mediaComment_media_recentComments {
  __typename: "MediaComment";
  id: string;
  content: string;
  user: createMediaReplyComment_createOneMediaReplyComment_mediaComment_media_recentComments_user;
}

export interface createMediaReplyComment_createOneMediaReplyComment_mediaComment_media {
  __typename: "Media";
  id: string;
  commentCount: number;
  recentComments: createMediaReplyComment_createOneMediaReplyComment_mediaComment_media_recentComments[];
}

export interface createMediaReplyComment_createOneMediaReplyComment_mediaComment {
  __typename: "MediaComment";
  id: string;
  media: createMediaReplyComment_createOneMediaReplyComment_mediaComment_media;
}

export interface createMediaReplyComment_createOneMediaReplyComment {
  __typename: "MediaReplyComment";
  id: string;
  mediaComment: createMediaReplyComment_createOneMediaReplyComment_mediaComment;
}

export interface createMediaReplyComment {
  createOneMediaReplyComment: createMediaReplyComment_createOneMediaReplyComment;
}

export interface createMediaReplyCommentVariables {
  data: MediaReplyCommentCreateInput;
}
