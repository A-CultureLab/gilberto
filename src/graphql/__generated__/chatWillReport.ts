/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chatWillReport
// ====================================================

export interface chatWillReport_chat {
  __typename: "Chat";
  id: string;
  message: string | null;
  image: string | null;
}

export interface chatWillReport {
  chat: chatWillReport_chat;
}

export interface chatWillReportVariables {
  id: string;
}
