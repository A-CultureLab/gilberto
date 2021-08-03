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
  notReadChatCount: number;
}

export interface chats_chats {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
  image: string | null;
  user: chats_chats_user;
}

export interface chats_chatRoom_recentChat {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
}

export interface chats_chatRoom {
  __typename: "ChatRoom";
  id: number;
  name: string;
  notReadChatCount: number;
  recentChat: chats_chatRoom_recentChat | null;
}

export interface chats {
  chats: chats_chats[];
  chatRoom: chats_chatRoom | null;
}

export interface chatsVariables {
  chatRoomId: number;
  cursor?: number | null;
  take?: number | null;
}
