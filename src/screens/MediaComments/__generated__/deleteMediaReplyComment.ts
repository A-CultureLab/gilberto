/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteMediaReplyComment
// ====================================================

export interface deleteMediaReplyComment_deleteMediaReplyComment {
  __typename: "MediaComment";
  id: string;
  replyCommentCount: number;
}

export interface deleteMediaReplyComment {
  deleteMediaReplyComment: deleteMediaReplyComment_deleteMediaReplyComment;
}

export interface deleteMediaReplyCommentVariables {
  id: string;
}
