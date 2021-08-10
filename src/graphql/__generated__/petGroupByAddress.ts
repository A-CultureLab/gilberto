/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CameraRegionInput, PetGroupByAddressGroupBy } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: petGroupByAddress
// ====================================================

export interface petGroupByAddress_petGroupByAddress_petGroup_region {
  __typename: "Region";
  latitude: number;
  longitude: number;
}

export interface petGroupByAddress_petGroupByAddress_petGroup_pets {
  __typename: "Pet";
  id: number;
  image: string;
}

export interface petGroupByAddress_petGroupByAddress_petGroup {
  __typename: "PetGroup";
  id: string;
  groupName: string;
  count: number;
  region: petGroupByAddress_petGroupByAddress_petGroup_region;
  pets: petGroupByAddress_petGroupByAddress_petGroup_pets[];
}

export interface petGroupByAddress_petGroupByAddress {
  __typename: "PetGroupByAddress";
  groupBy: PetGroupByAddressGroupBy;
  petGroup: petGroupByAddress_petGroupByAddress_petGroup[];
}

export interface petGroupByAddress {
  petGroupByAddress: petGroupByAddress_petGroupByAddress;
}

export interface petGroupByAddressVariables {
  cameraRegion: CameraRegionInput;
}
