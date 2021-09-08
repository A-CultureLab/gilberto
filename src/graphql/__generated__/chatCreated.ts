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

export interface chatCreated_chatCreated_chatRoom_iUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  notReadChatCount: number;
}

export interface chatCreated_chatCreated_chatRoom_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
  image: string | null;
}

export interface chatCreated_chatCreated_chatRoom {
  __typename: "ChatRoom";
  id: string;
  iUserChatRoomInfo: chatCreated_chatCreated_chatRoom_iUserChatRoomInfo;
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
