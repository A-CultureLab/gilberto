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

export enum PetType {
  cat = "cat",
  dog = "dog",
}

export interface AddressWhereInput {
  AND?: AddressWhereInput[] | null;
  OR?: AddressWhereInput[] | null;
  NOT?: AddressWhereInput[] | null;
  postcode?: StringFilter | null;
  updatedAt?: DateTimeFilter | null;
  addressName?: StringFilter | null;
  buildingName?: StringFilter | null;
  latitude?: FloatFilter | null;
  longitude?: FloatFilter | null;
  users?: UserListRelationFilter | null;
}

export interface BoolFilter {
  equals?: boolean | null;
  not?: NestedBoolFilter | null;
}

export interface CameraRegionInput {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

export interface ChatListRelationFilter {
  every?: ChatWhereInput | null;
  some?: ChatWhereInput | null;
  none?: ChatWhereInput | null;
}

export interface ChatRoomListRelationFilter {
  every?: ChatRoomWhereInput | null;
  some?: ChatRoomWhereInput | null;
  none?: ChatRoomWhereInput | null;
}

export interface ChatRoomWhereInput {
  AND?: ChatRoomWhereInput[] | null;
  OR?: ChatRoomWhereInput[] | null;
  NOT?: ChatRoomWhereInput[] | null;
  id?: IntFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  users?: UserListRelationFilter | null;
  chats?: ChatListRelationFilter | null;
}

export interface ChatWhereInput {
  AND?: ChatWhereInput[] | null;
  OR?: ChatWhereInput[] | null;
  NOT?: ChatWhereInput[] | null;
  id?: IntFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  message?: StringNullableFilter | null;
  image?: StringNullableFilter | null;
  user?: UserWhereInput | null;
  chatRoom?: ChatRoomWhereInput | null;
  notReadUsers?: UserListRelationFilter | null;
  userId?: StringFilter | null;
  chatRoomId?: IntFilter | null;
}

export interface DateTimeFilter {
  equals?: any | null;
  in?: any[] | null;
  notIn?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  gt?: any | null;
  gte?: any | null;
  not?: NestedDateTimeFilter | null;
}

export interface DateTimeNullableFilter {
  equals?: any | null;
  in?: any[] | null;
  notIn?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  gt?: any | null;
  gte?: any | null;
  not?: NestedDateTimeNullableFilter | null;
}

export interface EnumGenderFilter {
  equals?: Gender | null;
  in?: Gender[] | null;
  notIn?: Gender[] | null;
  not?: NestedEnumGenderFilter | null;
}

export interface EnumPetTypeFilter {
  equals?: PetType | null;
  in?: PetType[] | null;
  notIn?: PetType[] | null;
  not?: NestedEnumPetTypeFilter | null;
}

export interface FloatFilter {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: NestedFloatFilter | null;
}

export interface IntFilter {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: NestedIntFilter | null;
}

export interface NestedBoolFilter {
  equals?: boolean | null;
  not?: NestedBoolFilter | null;
}

export interface NestedDateTimeFilter {
  equals?: any | null;
  in?: any[] | null;
  notIn?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  gt?: any | null;
  gte?: any | null;
  not?: NestedDateTimeFilter | null;
}

export interface NestedDateTimeNullableFilter {
  equals?: any | null;
  in?: any[] | null;
  notIn?: any[] | null;
  lt?: any | null;
  lte?: any | null;
  gt?: any | null;
  gte?: any | null;
  not?: NestedDateTimeNullableFilter | null;
}

export interface NestedEnumGenderFilter {
  equals?: Gender | null;
  in?: Gender[] | null;
  notIn?: Gender[] | null;
  not?: NestedEnumGenderFilter | null;
}

export interface NestedEnumPetTypeFilter {
  equals?: PetType | null;
  in?: PetType[] | null;
  notIn?: PetType[] | null;
  not?: NestedEnumPetTypeFilter | null;
}

export interface NestedFloatFilter {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: NestedFloatFilter | null;
}

export interface NestedIntFilter {
  equals?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lt?: number | null;
  lte?: number | null;
  gt?: number | null;
  gte?: number | null;
  not?: NestedIntFilter | null;
}

export interface NestedStringFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: NestedStringFilter | null;
}

export interface NestedStringNullableFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: NestedStringNullableFilter | null;
}

export interface PetListRelationFilter {
  every?: PetWhereInput | null;
  some?: PetWhereInput | null;
  none?: PetWhereInput | null;
}

export interface PetWhereInput {
  AND?: PetWhereInput[] | null;
  OR?: PetWhereInput[] | null;
  NOT?: PetWhereInput[] | null;
  id?: IntFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  orderKey?: IntFilter | null;
  name?: StringFilter | null;
  image?: StringFilter | null;
  type?: EnumPetTypeFilter | null;
  species?: StringFilter | null;
  character?: StringFilter | null;
  gender?: EnumGenderFilter | null;
  birth?: DateTimeFilter | null;
  weight?: FloatFilter | null;
  neutered?: BoolFilter | null;
  vaccinated?: BoolFilter | null;
  user?: UserWhereInput | null;
  userId?: StringFilter | null;
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
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  addressPostcode: string;
  instagramId?: string | null;
  introduce: string;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
}

export interface StringFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: NestedStringFilter | null;
}

export interface StringNullableFilter {
  equals?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | null;
  lte?: string | null;
  gt?: string | null;
  gte?: string | null;
  contains?: string | null;
  startsWith?: string | null;
  endsWith?: string | null;
  not?: NestedStringNullableFilter | null;
}

export interface UpdateUserInput {
  name: string;
  image: string;
  gender: Gender;
  birth: any;
  addressPostcode: string;
  instagramId?: string | null;
  introduce: string;
}

export interface UserListRelationFilter {
  every?: UserWhereInput | null;
  some?: UserWhereInput | null;
  none?: UserWhereInput | null;
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
  id?: StringFilter | null;
  createdAt?: DateTimeFilter | null;
  updatedAt?: DateTimeFilter | null;
  email?: StringFilter | null;
  name?: StringFilter | null;
  image?: StringFilter | null;
  gender?: EnumGenderFilter | null;
  birth?: DateTimeFilter | null;
  instagramId?: StringNullableFilter | null;
  introduce?: StringFilter | null;
  agreementDate?: DateTimeFilter | null;
  marketingPushDate?: DateTimeNullableFilter | null;
  marketingEmailDate?: DateTimeNullableFilter | null;
  withdrawDate?: DateTimeNullableFilter | null;
  withdrawReason?: StringNullableFilter | null;
  addressPostcode?: StringFilter | null;
  address?: AddressWhereInput | null;
  pets?: PetListRelationFilter | null;
  chatRooms?: ChatRoomListRelationFilter | null;
  chats?: ChatListRelationFilter | null;
  notReadChats?: ChatListRelationFilter | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
