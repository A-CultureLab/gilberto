/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: chatRoomUpdated
// ====================================================

export interface chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo_user {
  __typename: "User";
  id: string;
  notReadChatCount: number;
}

export interface chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  bookmarked: boolean;
  notificated: boolean;
  blocked: boolean;
  notReadChatCount: number;
  user: chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo_user;
}

export interface chatRoomUpdated_chatRoomUpdated_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
}

export interface chatRoomUpdated_chatRoomUpdated {
  __typename: "ChatRoom";
  id: string;
  name: string;
  image: string;
  type: ChatRoomType;
  isIBlocked: boolean;
  isBlockedMe: boolean;
  iUserChatRoomInfo: chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo;
  recentChat: chatRoomUpdated_chatRoomUpdated_recentChat | null;
}

export interface chatRoomUpdated {
  chatRoomUpdated: chatRoomUpdated_chatRoomUpdated | null;
}

export interface chatRoomUpdatedVariables {
  userId: string;
}
