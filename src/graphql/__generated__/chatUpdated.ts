/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: chatUpdated
// ====================================================

export interface chatUpdated_chatUpdated_chatRoom_recentChat {
  __typename: "Chat";
  id: string;
  createdAt: any;
  message: string | null;
  image: string | null;
}

export interface chatUpdated_chatUpdated_chatRoom {
  __typename: "ChatRoom";
  id: string;
  recentChat: chatUpdated_chatUpdated_chatRoom_recentChat | null;
}

export interface chatUpdated_chatUpdated {
  __typename: "Chat";
  id: string;
  updatedAt: any;
  isDeleted: boolean;
  message: string | null;
  image: string | null;
  chatRoom: chatUpdated_chatUpdated_chatRoom;
}

export interface chatUpdated {
  chatUpdated: chatUpdated_chatUpdated | null;
}

export interface chatUpdatedVariables {
  userId: string;
  chatRoomId: string;
}
