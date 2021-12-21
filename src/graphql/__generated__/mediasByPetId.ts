/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: mediasByPetId
// ====================================================

export interface mediasByPetId_mediasByPetId {
  __typename: "Media";
  id: string;
  isInstagram: boolean;
  thumnail: string;
}

export interface mediasByPetId {
  mediasByPetId: mediasByPetId_mediasByPetId[];
}

export interface mediasByPetIdVariables {
  petId: string;
  take?: number | null;
  skip?: number | null;
}
