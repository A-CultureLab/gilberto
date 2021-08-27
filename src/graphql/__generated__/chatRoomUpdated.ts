/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChatRoomType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: chatRoomUpdated
// ====================================================

export interface chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  bookmarked: boolean;
  notificated: boolean;
  notReadChatCount: number;
}

export interface chatRoomUpdated_chatRoomUpdated_userChatRoomInfos_user {
  __typename: "User";
  id: string;
  image: string;
  name: string;
}

export interface chatRoomUpdated_chatRoomUpdated_userChatRoomInfos {
  __typename: "UserChatRoomInfo";
  id: string;
  user: chatRoomUpdated_chatRoomUpdated_userChatRoomInfos_user;
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
  type: ChatRoomType;
  iUserChatRoomInfo: chatRoomUpdated_chatRoomUpdated_iUserChatRoomInfo;
  userChatRoomInfos: chatRoomUpdated_chatRoomUpdated_userChatRoomInfos[];
  recentChat: chatRoomUpdated_chatRoomUpdated_recentChat | null;
}

export interface chatRoomUpdated {
  chatRoomUpdated: chatRoomUpdated_chatRoomUpdated | null;
}

export interface chatRoomUpdatedVariables {
  userId: string;
}
