/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserChatRoomInfoInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUserChatRoomInfo
// ====================================================

export interface updateUserChatRoomInfo_updateUserChatRoomInfo_chatRoom {
  __typename: "ChatRoom";
  id: string;
  isBlockedMe: boolean;
  isIBlocked: boolean;
}

export interface updateUserChatRoomInfo_updateUserChatRoomInfo {
  __typename: "UserChatRoomInfo";
  id: string;
  bookmarked: boolean;
  notificated: boolean;
  blocked: boolean;
  chatRoom: updateUserChatRoomInfo_updateUserChatRoomInfo_chatRoom;
}

export interface updateUserChatRoomInfo {
  updateUserChatRoomInfo: updateUserChatRoomInfo_updateUserChatRoomInfo;
}

export interface updateUserChatRoomInfoVariables {
  input: UpdateUserChatRoomInfoInput;
}
