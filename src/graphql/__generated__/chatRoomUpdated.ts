/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: chatRoomUpdated
// ====================================================

export interface chatRoomUpdated_chatRoomUpdated_users {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  notReadChatCount: number;
}

export interface chatRoomUpdated_chatRoomUpdated_recentChat {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
}

export interface chatRoomUpdated_chatRoomUpdated {
  __typename: "ChatRoom";
  id: number;
  notReadChatCount: number;
  name: string;
  users: chatRoomUpdated_chatRoomUpdated_users[];
  recentChat: chatRoomUpdated_chatRoomUpdated_recentChat | null;
}

export interface chatRoomUpdated {
  chatRoomUpdated: chatRoomUpdated_chatRoomUpdated | null;
}

export interface chatRoomUpdatedVariables {
  userId: string;
}
