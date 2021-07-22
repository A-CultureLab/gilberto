/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: coordToRegion
// ====================================================

export interface coordToRegion_coordsToRegion {
  __typename: "Address";
  postcode: string;
  addressName: string;
  buildingName: string;
}

export interface coordToRegion {
  coordsToRegion: coordToRegion_coordsToRegion | null;
}

export interface coordToRegionVariables {
  latitude: number;
  longitude: number;
}
