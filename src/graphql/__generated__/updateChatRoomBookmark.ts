/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateChatRoomBookmark
// ====================================================

export interface updateChatRoomBookmark_updateChatRoomBookmark {
  __typename: "ChatRoom";
  id: string;
  isBookmarked: boolean;
}

export interface updateChatRoomBookmark {
  updateChatRoomBookmark: updateChatRoomBookmark_updateChatRoomBookmark;
}

export interface updateChatRoomBookmarkVariables {
  id: string;
  isBookmarked: boolean;
}
