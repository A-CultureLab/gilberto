/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteChat
// ====================================================

export interface deleteChat_deleteChat {
  __typename: "Chat";
  id: string;
  message: string | null;
  image: string | null;
  isDeleted: boolean;
}

export interface deleteChat {
  deleteChat: deleteChat_deleteChat;
}

export interface deleteChatVariables {
  id: string;
}
