/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignupInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_pets {
  __typename: "Pet";
  id: number;
  image: string;
}

export interface signup_signup {
  __typename: "User";
  id: string;
  image: string;
  pets: signup_signup_pets[];
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  data: SignupInput;
}
