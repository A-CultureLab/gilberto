/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMediaInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateMedia
// ====================================================

export interface updateMedia_updateMedia_images {
  __typename: "MediaImage";
  id: string;
  url: string;
}

export interface updateMedia_updateMedia_tagedPets {
  __typename: "Pet";
  id: string;
  name: string;
  image: string;
}

export interface updateMedia_updateMedia {
  __typename: "Media";
  id: string;
  content: string;
  images: updateMedia_updateMedia_images[];
  tagedPets: updateMedia_updateMedia_tagedPets[];
}

export interface updateMedia {
  updateMedia: updateMedia_updateMedia;
}

export interface updateMediaVariables {
  id: string;
  input: CreateMediaInput;
}
