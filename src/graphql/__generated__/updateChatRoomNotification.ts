/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateChatRoomNotification
// ====================================================

export interface updateChatRoomNotification_updateChatRoomNotification {
  __typename: "ChatRoom";
  id: string;
  isNotificationOn: boolean;
}

export interface updateChatRoomNotification {
  updateChatRoomNotification: updateChatRoomNotification_updateChatRoomNotification;
}

export interface updateChatRoomNotificationVariables {
  id: string;
  isOn: boolean;
}
