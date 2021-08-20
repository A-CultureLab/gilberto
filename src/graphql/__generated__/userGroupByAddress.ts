/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userGroupByAddress
// ====================================================

export interface userGroupByAddress_userGroupByAddress_pets {
  __typename: "Pet";
  id: string;
  image: string;
}

export interface userGroupByAddress_userGroupByAddress {
  __typename: "User";
  id: string;
  image: string;
  pets: userGroupByAddress_userGroupByAddress_pets[];
}

export interface userGroupByAddress {
  userGroupByAddress: userGroupByAddress_userGroupByAddress[];
}

export interface userGroupByAddressVariables {
  groupByAddress: string;
  take?: number | null;
  skip?: number | null;
}
