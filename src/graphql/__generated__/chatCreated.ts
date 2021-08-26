/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: chatCreated
// ====================================================

export interface chatCreated_chatCreated_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  notReadChatCount: number;
}

export interface chatCreated_chatCreated_chatRoom_users {
  __typename: "User";
  id: string;
  image: string;
  name: string;
}

export interface chatCreated_chatCreated_chatRoom_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
}

export interface chatCreated_chatCreated_chatRoom {
  __typename: "ChatRoom";
  id: string;
  name: string;
  notReadChatCount: number;
  isNotificationOn: boolean;
  type: ChatRoomType;
  users: chatCreated_chatCreated_chatRoom_users[];
  recentChat: chatCreated_chatCreated_chatRoom_recentChat | null;
}

export interface chatCreated_chatCreated {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
  image: string | null;
  isDeleted: boolean;
  user: chatCreated_chatCreated_user;
  chatRoom: chatCreated_chatCreated_chatRoom;
}

export interface chatCreated {
  chatCreated: chatCreated_chatCreated | null;
}

export interface chatCreatedVariables {
  userId: string;
  chatRoomId: string;
}
