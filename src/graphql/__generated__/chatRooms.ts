/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomWhereInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chatRooms
// ====================================================

export interface chatRooms_chatRooms_users {
  __typename: "User";
  id: string;
  name: string;
  image: string;
}

export interface chatRooms_chatRooms_recentChat {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
}

export interface chatRooms_chatRooms {
  __typename: "ChatRoom";
  id: number;
  notReadChatCount: number;
  name: string;
  users: chatRooms_chatRooms_users[];
  recentChat: chatRooms_chatRooms_recentChat | null;
}

export interface chatRooms {
  chatRooms: chatRooms_chatRooms[];
}

export interface chatRoomsVariables {
  where?: ChatRoomWhereInput | null;
  skip?: number | null;
  take?: number | null;
}
