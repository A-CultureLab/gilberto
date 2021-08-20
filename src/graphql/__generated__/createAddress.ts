/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAddress
// ====================================================

export interface createAddress_createAddress_land {
  __typename: "Land";
  id: string;
  fullName: string;
}

export interface createAddress_createAddress {
  __typename: "Address";
  id: string;
  land: createAddress_createAddress_land;
}

export interface createAddress {
  createAddress: createAddress_createAddress | null;
}

export interface createAddressVariables {
  latitude: number;
  longitude: number;
}
