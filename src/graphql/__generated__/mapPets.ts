/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CameraRegionInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: mapPets
// ====================================================

export interface mapPets_mapPets_address {
  __typename: "Address";
  latitude: number;
  longitude: number;
  postcode: string;
}

export interface mapPets_mapPets_pets {
  __typename: "Pet";
  id: number;
  image: string;
}

export interface mapPets_mapPets {
  __typename: "PetGroupByAddress";
  address: mapPets_mapPets_address;
  count: number;
  pets: mapPets_mapPets_pets[];
}

export interface mapPets {
  mapPets: mapPets_mapPets[];
}

export interface mapPetsVariables {
  cameraRegion: CameraRegionInput;
}
