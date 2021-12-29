/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: following
// ====================================================

export interface following_following_targetUser {
  __typename: "User";
  id: string;
  isIFollowed: boolean;
}

export interface following_following_user {
  __typename: "User";
  id: string;
  followingCount: number;
}

export interface following_following {
  __typename: "Follow";
  targetUser: following_following_targetUser;
  user: following_following_user;
}

export interface following {
  following: following_following | null;
}

export interface followingVariables {
  userId: string;
}
