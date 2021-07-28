/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: chatCreated
// ====================================================

export interface chatCreated_chatCreated_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
}

export interface chatCreated_chatCreated_chatRoom_recentChat {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
}

export interface chatCreated_chatCreated_chatRoom {
  __typename: "ChatRoom";
  id: number;
  name: string;
  recentChat: chatCreated_chatCreated_chatRoom_recentChat | null;
  notReadChatCount: number;
}

export interface chatCreated_chatCreated {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
  image: string | null;
  user: chatCreated_chatCreated_user;
  chatRoom: chatCreated_chatCreated_chatRoom;
}

export interface chatCreated {
  chatCreated: chatCreated_chatCreated | null;
}
