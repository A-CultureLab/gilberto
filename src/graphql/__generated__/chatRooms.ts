/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chatRooms
// ====================================================

export interface chatRooms_chatRooms_users {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  notReadChatCount: number;
}

export interface chatRooms_chatRooms_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
}

export interface chatRooms_chatRooms {
  __typename: "ChatRoom";
  id: string;
  notReadChatCount: number;
  name: string;
  isNotificationOn: boolean;
  isBookmarked: boolean;
  type: ChatRoomType;
  users: chatRooms_chatRooms_users[];
  recentChat: chatRooms_chatRooms_recentChat | null;
}

export interface chatRooms {
  chatRooms: chatRooms_chatRooms[];
}

export interface chatRoomsVariables {
  cursor?: string | null;
  take?: number | null;
}
