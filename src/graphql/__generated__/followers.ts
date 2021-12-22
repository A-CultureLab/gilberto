/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: followers
// ====================================================

export interface followers_followers_user {
  __typename: "User";
  id: string;
  name: string;
  image: string;
  isIFollowed: boolean;
}

export interface followers_followers {
  __typename: "Follow";
  id: string;
  createdAt: any;
  user: followers_followers_user;
}

export interface followers {
  followers: followers_followers[];
}

export interface followersVariables {
  userId: string;
  take?: number | null;
  skip?: number | null;
}
