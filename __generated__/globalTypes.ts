/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Gender {
  female = "female",
  male = "male",
}

export interface SignupInput {
  email: string;
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  addressId: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  instagramId?: string | null;
  introduce: string;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
