/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: coordToRegion
// ====================================================

export interface coordToRegion_coordsToRegion {
  __typename: "Region";
  id: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export interface coordToRegion {
  coordsToRegion: coordToRegion_coordsToRegion | null;
}

export interface coordToRegionVariables {
  latitude: number;
  longitude: number;
}
