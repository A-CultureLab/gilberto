/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateChatInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createChat
// ====================================================

export interface createChat_createChat_chatRoom_recentChat {
  __typename: "Chat";
  id: number;
  createdAt: any;
  message: string | null;
}

export interface createChat_createChat_chatRoom {
  __typename: "ChatRoom";
  id: number;
  name: string;
  recentChat: createChat_createChat_chatRoom_recentChat | null;
  notReadChatCount: number;
}

export interface createChat_createChat {
  __typename: "Chat";
  id: number;
  chatRoom: createChat_createChat_chatRoom;
}

export interface createChat {
  createChat: createChat_createChat;
}

export interface createChatVariables {
  input: CreateChatInput;
}