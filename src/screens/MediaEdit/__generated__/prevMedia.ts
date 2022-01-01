/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prevMedia
// ====================================================

export interface prevMedia_media_tagedPets {
  __typename: "Pet";
  id: string;
  name: string;
  image: string;
}

export interface prevMedia_media_images {
  __typename: "MediaImage";
  id: string;
  url: string;
}

export interface prevMedia_media {
  __typename: "Media";
  id: string;
  content: string;
  tagedPets: prevMedia_media_tagedPets[];
  images: prevMedia_media_images[];
}

export interface prevMedia {
  media: prevMedia_media;
}

export interface prevMediaVariables {
  id: string;
}
