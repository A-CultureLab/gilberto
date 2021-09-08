/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createReport
// ====================================================

export interface createReport_createReport {
  __typename: "Report";
  id: string;
}

export interface createReport {
  createReport: createReport_createReport;
}

export interface createReportVariables {
  reason: string;
  userId?: string | null;
  chatId?: string | null;
  chatRoomId?: string | null;
}
