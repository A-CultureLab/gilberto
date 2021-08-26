/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ChatRoomType {
  group = "group",
  private = "private",
}

export enum Gender {
  female = "female",
  male = "male",
}

export enum PetGroupByAddressGroupBy {
  area1 = "area1",
  area2 = "area2",
  area3 = "area3",
  land = "land",
}

export enum PetType {
  cat = "cat",
  dog = "dog",
}

export interface CameraRegionInput {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface CreateChatInput {
  chatRoomId: string;
  message?: string | null;
  image?: string | null;
}

export interface RegistPetInput {
  name: string;
  image: string;
  type: PetType;
  species: string;
  character: string;
  gender: Gender;
  birth: any;
  weight: number;
  neutered: boolean;
  vaccinated: boolean;
}

export interface SignupInput {
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  addressId: string;
  instagramId?: string | null;
  introduce: string;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
}

export interface UpdateUserInput {
  image: string;
  addressId: string;
  instagramId?: string | null;
  introduce: string;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  email?: string | null;
  uniqueKey?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
