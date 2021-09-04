/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chats
// ====================================================

export interface chats_chats_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
}

export interface chats_chats {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
  image: string | null;
  isDeleted: boolean;
  user: chats_chats_user;
}

export interface chats {
  chats: chats_chats[];
}

export interface chatsVariables {
  chatRoomId: string;
  cursor?: string | null;
  take?: number | null;
}
