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

export enum PostType {
  free = "free",
  walk = "walk",
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

export interface CreatePostInput {
  content: string;
  type: PostType;
  images: string[];
}

export interface PostsAdressFilterInput {
  area1Id?: string | null;
  area2Id?: string | null;
  area3Id?: string | null;
  landId?: string | null;
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
  inflow: string;
  introduce: string;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
}

export interface UpdateUserChatRoomInfoInput {
  id: string;
  notificated?: boolean | null;
  bookmarked?: boolean | null;
  blocked?: boolean | null;
}

export interface UpdateUserInput {
  image: string;
  addressId: string;
  introduce: string;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  snsLoginId?: string | null;
  email?: string | null;
  uniqueKey?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
