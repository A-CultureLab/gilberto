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
  id: number;
  createdAt: any;
  message: string | null;
  image: string | null;
  user: chats_chats_user;
}

export interface chats {
  chats: chats_chats[];
}

export interface chatsVariables {
  chatRoomId: number;
  cursor?: number | null;
  take?: number | null;
}
