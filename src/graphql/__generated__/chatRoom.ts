/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: chatRoom
// ====================================================

export interface chatRoom_chatRoom_iUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  bookmarked: boolean;
  notificated: boolean;
  blocked: boolean;
  notReadChatCount: number;
}

export interface chatRoom_chatRoom_userChatRoomInfos_user {
  __typename: "User";
  id: string;
  image: string;
  name: string;
}

export interface chatRoom_chatRoom_userChatRoomInfos {
  __typename: "UserChatRoomInfo";
  id: string;
  user: chatRoom_chatRoom_userChatRoomInfos_user;
}

export interface chatRoom_chatRoom_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
}

export interface chatRoom_chatRoom {
  __typename: "ChatRoom";
  id: string;
  name: string;
  type: ChatRoomType;
  isIBlocked: boolean;
  isBlockedMe: boolean;
  iUserChatRoomInfo: chatRoom_chatRoom_iUserChatRoomInfo;
  userChatRoomInfos: chatRoom_chatRoom_userChatRoomInfos[];
  recentChat: chatRoom_chatRoom_recentChat | null;
}

export interface chatRoom {
  chatRoom: chatRoom_chatRoom;
}

export interface chatRoomVariables {
  id?: string | null;
  userId?: string | null;
}
