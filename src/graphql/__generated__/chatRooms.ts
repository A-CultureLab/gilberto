/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chatRooms
// ====================================================

export interface chatRooms_chatRooms_iUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  bookmarked: boolean;
  notificated: boolean;
  blocked: boolean;
  notReadChatCount: number;
}

export interface chatRooms_chatRooms_userChatRoomInfos_user {
  __typename: "User";
  id: string;
  image: string;
  name: string;
}

export interface chatRooms_chatRooms_userChatRoomInfos {
  __typename: "UserChatRoomInfo";
  id: string;
  user: chatRooms_chatRooms_userChatRoomInfos_user;
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
  name: string;
  type: ChatRoomType;
  isIBlocked: boolean;
  isBlockedMe: boolean;
  iUserChatRoomInfo: chatRooms_chatRooms_iUserChatRoomInfo;
  userChatRoomInfos: chatRooms_chatRooms_userChatRoomInfos[];
  recentChat: chatRooms_chatRooms_recentChat | null;
}

export interface chatRooms {
  chatRooms: chatRooms_chatRooms[];
}

export interface chatRoomsVariables {
  cursor?: string | null;
  take?: number | null;
}
