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

export interface AddressCreateNestedOneWithoutUserInput {
  create?: AddressCreateWithoutUserInput | null;
  connectOrCreate?: AddressCreateOrConnectWithoutUserInput | null;
  connect?: AddressWhereUniqueInput | null;
}

export interface AddressCreateOrConnectWithoutUserInput {
  where: AddressWhereUniqueInput;
  create: AddressCreateWithoutUserInput;
}

export interface AddressCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  area1: Area1CreateNestedOneWithoutAddressesInput;
  area2: Area2CreateNestedOneWithoutAddressesInput;
  area3: Area3CreateNestedOneWithoutAddressesInput;
  land: LandCreateNestedOneWithoutAddressesInput;
}

export interface AddressWhereUniqueInput {
  id?: string | null;
}

export interface Area1CreateNestedOneWithoutAddressesInput {
  create?: Area1CreateWithoutAddressesInput | null;
  connectOrCreate?: Area1CreateOrConnectWithoutAddressesInput | null;
  connect?: Area1WhereUniqueInput | null;
}

export interface Area1CreateOrConnectWithoutAddressesInput {
  where: Area1WhereUniqueInput;
  create: Area1CreateWithoutAddressesInput;
}

export interface Area1CreateWithoutAddressesInput {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Area1WhereUniqueInput {
  id?: string | null;
}

export interface Area2CreateNestedOneWithoutAddressesInput {
  create?: Area2CreateWithoutAddressesInput | null;
  connectOrCreate?: Area2CreateOrConnectWithoutAddressesInput | null;
  connect?: Area2WhereUniqueInput | null;
}

export interface Area2CreateOrConnectWithoutAddressesInput {
  where: Area2WhereUniqueInput;
  create: Area2CreateWithoutAddressesInput;
}

export interface Area2CreateWithoutAddressesInput {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Area2WhereUniqueInput {
  id?: string | null;
}

export interface Area3CreateNestedOneWithoutAddressesInput {
  create?: Area3CreateWithoutAddressesInput | null;
  connectOrCreate?: Area3CreateOrConnectWithoutAddressesInput | null;
  connect?: Area3WhereUniqueInput | null;
}

export interface Area3CreateOrConnectWithoutAddressesInput {
  where: Area3WhereUniqueInput;
  create: Area3CreateWithoutAddressesInput;
}

export interface Area3CreateWithoutAddressesInput {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Area3WhereUniqueInput {
  id?: string | null;
}

export interface CameraRegionInput {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ChatCreateManyChatRoomInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  userId: string;
}

export interface ChatCreateManyChatRoomInputEnvelope {
  data?: ChatCreateManyChatRoomInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ChatCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  chatRoomId: string;
}

export interface ChatCreateManyUserInputEnvelope {
  data?: ChatCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ChatCreateNestedManyWithoutChatRoomInput {
  create?: ChatCreateWithoutChatRoomInput[] | null;
  connectOrCreate?: ChatCreateOrConnectWithoutChatRoomInput[] | null;
  createMany?: ChatCreateManyChatRoomInputEnvelope | null;
  connect?: ChatWhereUniqueInput[] | null;
}

export interface ChatCreateNestedManyWithoutNotReadUserChatRoomInfosInput {
  create?: ChatCreateWithoutNotReadUserChatRoomInfosInput[] | null;
  connectOrCreate?: ChatCreateOrConnectWithoutNotReadUserChatRoomInfosInput[] | null;
  connect?: ChatWhereUniqueInput[] | null;
}

export interface ChatCreateNestedManyWithoutUserInput {
  create?: ChatCreateWithoutUserInput[] | null;
  connectOrCreate?: ChatCreateOrConnectWithoutUserInput[] | null;
  createMany?: ChatCreateManyUserInputEnvelope | null;
  connect?: ChatWhereUniqueInput[] | null;
}

export interface ChatCreateNestedOneWithoutReportsInput {
  create?: ChatCreateWithoutReportsInput | null;
  connectOrCreate?: ChatCreateOrConnectWithoutReportsInput | null;
  connect?: ChatWhereUniqueInput | null;
}

export interface ChatCreateOrConnectWithoutChatRoomInput {
  where: ChatWhereUniqueInput;
  create: ChatCreateWithoutChatRoomInput;
}

export interface ChatCreateOrConnectWithoutNotReadUserChatRoomInfosInput {
  where: ChatWhereUniqueInput;
  create: ChatCreateWithoutNotReadUserChatRoomInfosInput;
}

export interface ChatCreateOrConnectWithoutReportsInput {
  where: ChatWhereUniqueInput;
  create: ChatCreateWithoutReportsInput;
}

export interface ChatCreateOrConnectWithoutUserInput {
  where: ChatWhereUniqueInput;
  create: ChatCreateWithoutUserInput;
}

export interface ChatCreateWithoutChatRoomInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  user: UserCreateNestedOneWithoutChatsInput;
  notReadUserChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutNotReadChatsInput | null;
  reports?: ReportCreateNestedManyWithoutChatInput | null;
}

export interface ChatCreateWithoutNotReadUserChatRoomInfosInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  user: UserCreateNestedOneWithoutChatsInput;
  chatRoom: ChatRoomCreateNestedOneWithoutChatsInput;
  reports?: ReportCreateNestedManyWithoutChatInput | null;
}

export interface ChatCreateWithoutReportsInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  user: UserCreateNestedOneWithoutChatsInput;
  chatRoom: ChatRoomCreateNestedOneWithoutChatsInput;
  notReadUserChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutNotReadChatsInput | null;
}

export interface ChatCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  message?: string | null;
  image?: string | null;
  isDeleted?: boolean | null;
  chatRoom: ChatRoomCreateNestedOneWithoutChatsInput;
  notReadUserChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutNotReadChatsInput | null;
  reports?: ReportCreateNestedManyWithoutChatInput | null;
}

export interface ChatRoomCreateNestedOneWithoutChatsInput {
  create?: ChatRoomCreateWithoutChatsInput | null;
  connectOrCreate?: ChatRoomCreateOrConnectWithoutChatsInput | null;
  connect?: ChatRoomWhereUniqueInput | null;
}

export interface ChatRoomCreateNestedOneWithoutReportsInput {
  create?: ChatRoomCreateWithoutReportsInput | null;
  connectOrCreate?: ChatRoomCreateOrConnectWithoutReportsInput | null;
  connect?: ChatRoomWhereUniqueInput | null;
}

export interface ChatRoomCreateNestedOneWithoutUserChatRoomInfosInput {
  create?: ChatRoomCreateWithoutUserChatRoomInfosInput | null;
  connectOrCreate?: ChatRoomCreateOrConnectWithoutUserChatRoomInfosInput | null;
  connect?: ChatRoomWhereUniqueInput | null;
}

export interface ChatRoomCreateOrConnectWithoutChatsInput {
  where: ChatRoomWhereUniqueInput;
  create: ChatRoomCreateWithoutChatsInput;
}

export interface ChatRoomCreateOrConnectWithoutReportsInput {
  where: ChatRoomWhereUniqueInput;
  create: ChatRoomCreateWithoutReportsInput;
}

export interface ChatRoomCreateOrConnectWithoutUserChatRoomInfosInput {
  where: ChatRoomWhereUniqueInput;
  create: ChatRoomCreateWithoutUserChatRoomInfosInput;
}

export interface ChatRoomCreateWithoutChatsInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  recentChatCreatedAt?: any | null;
  type: ChatRoomType;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutChatRoomInput | null;
  reports?: ReportCreateNestedManyWithoutChatRoomInput | null;
}

export interface ChatRoomCreateWithoutReportsInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  recentChatCreatedAt?: any | null;
  type: ChatRoomType;
  chats?: ChatCreateNestedManyWithoutChatRoomInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutChatRoomInput | null;
}

export interface ChatRoomCreateWithoutUserChatRoomInfosInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  recentChatCreatedAt?: any | null;
  type: ChatRoomType;
  chats?: ChatCreateNestedManyWithoutChatRoomInput | null;
  reports?: ReportCreateNestedManyWithoutChatRoomInput | null;
}

export interface ChatRoomWhereUniqueInput {
  id?: string | null;
}

export interface ChatWhereUniqueInput {
  id?: string | null;
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

export interface LandCreateNestedOneWithoutAddressesInput {
  create?: LandCreateWithoutAddressesInput | null;
  connectOrCreate?: LandCreateOrConnectWithoutAddressesInput | null;
  connect?: LandWhereUniqueInput | null;
}

export interface LandCreateOrConnectWithoutAddressesInput {
  where: LandWhereUniqueInput;
  create: LandCreateWithoutAddressesInput;
}

export interface LandCreateWithoutAddressesInput {
  id: string;
  addressName: string;
  buildingName: string;
  latitude: number;
  longitude: number;
}

export interface LandWhereUniqueInput {
  id?: string | null;
}

export interface MediaCommentCreateManyMediaInput {
  id?: string | null;
  createdAt: any;
  content: string;
  userId: string;
}

export interface MediaCommentCreateManyMediaInputEnvelope {
  data?: MediaCommentCreateManyMediaInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaCommentCreateManyUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  mediaId: string;
}

export interface MediaCommentCreateManyUserInputEnvelope {
  data?: MediaCommentCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaCommentCreateNestedManyWithoutMediaInput {
  create?: MediaCommentCreateWithoutMediaInput[] | null;
  connectOrCreate?: MediaCommentCreateOrConnectWithoutMediaInput[] | null;
  createMany?: MediaCommentCreateManyMediaInputEnvelope | null;
  connect?: MediaCommentWhereUniqueInput[] | null;
}

export interface MediaCommentCreateNestedManyWithoutUserInput {
  create?: MediaCommentCreateWithoutUserInput[] | null;
  connectOrCreate?: MediaCommentCreateOrConnectWithoutUserInput[] | null;
  createMany?: MediaCommentCreateManyUserInputEnvelope | null;
  connect?: MediaCommentWhereUniqueInput[] | null;
}

export interface MediaCommentCreateNestedOneWithoutMediaReplyCommentInput {
  create?: MediaCommentCreateWithoutMediaReplyCommentInput | null;
  connectOrCreate?: MediaCommentCreateOrConnectWithoutMediaReplyCommentInput | null;
  connect?: MediaCommentWhereUniqueInput | null;
}

export interface MediaCommentCreateOrConnectWithoutMediaInput {
  where: MediaCommentWhereUniqueInput;
  create: MediaCommentCreateWithoutMediaInput;
}

export interface MediaCommentCreateOrConnectWithoutMediaReplyCommentInput {
  where: MediaCommentWhereUniqueInput;
  create: MediaCommentCreateWithoutMediaReplyCommentInput;
}

export interface MediaCommentCreateOrConnectWithoutUserInput {
  where: MediaCommentWhereUniqueInput;
  create: MediaCommentCreateWithoutUserInput;
}

export interface MediaCommentCreateWithoutMediaInput {
  id?: string | null;
  createdAt: any;
  content: string;
  user: UserCreateNestedOneWithoutMediaCommentsInput;
  mediaReplyComment?: MediaReplyCommentCreateNestedManyWithoutMediaCommentInput | null;
}

export interface MediaCommentCreateWithoutMediaReplyCommentInput {
  id?: string | null;
  createdAt: any;
  content: string;
  user: UserCreateNestedOneWithoutMediaCommentsInput;
  media: MediaCreateNestedOneWithoutMediaCommentInput;
}

export interface MediaCommentCreateWithoutUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  media: MediaCreateNestedOneWithoutMediaCommentInput;
  mediaReplyComment?: MediaReplyCommentCreateNestedManyWithoutMediaCommentInput | null;
}

export interface MediaCommentWhereUniqueInput {
  id?: string | null;
}

export interface MediaCreateManyUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  isInstagram?: boolean | null;
}

export interface MediaCreateManyUserInputEnvelope {
  data?: MediaCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaCreateNestedManyWithoutLikedUsersInput {
  create?: MediaCreateWithoutLikedUsersInput[] | null;
  connectOrCreate?: MediaCreateOrConnectWithoutLikedUsersInput[] | null;
  connect?: MediaWhereUniqueInput[] | null;
}

export interface MediaCreateNestedManyWithoutTagedPetsInput {
  create?: MediaCreateWithoutTagedPetsInput[] | null;
  connectOrCreate?: MediaCreateOrConnectWithoutTagedPetsInput[] | null;
  connect?: MediaWhereUniqueInput[] | null;
}

export interface MediaCreateNestedManyWithoutUserInput {
  create?: MediaCreateWithoutUserInput[] | null;
  connectOrCreate?: MediaCreateOrConnectWithoutUserInput[] | null;
  createMany?: MediaCreateManyUserInputEnvelope | null;
  connect?: MediaWhereUniqueInput[] | null;
}

export interface MediaCreateNestedOneWithoutMediaCommentInput {
  create?: MediaCreateWithoutMediaCommentInput | null;
  connectOrCreate?: MediaCreateOrConnectWithoutMediaCommentInput | null;
  connect?: MediaWhereUniqueInput | null;
}

export interface MediaCreateOrConnectWithoutLikedUsersInput {
  where: MediaWhereUniqueInput;
  create: MediaCreateWithoutLikedUsersInput;
}

export interface MediaCreateOrConnectWithoutMediaCommentInput {
  where: MediaWhereUniqueInput;
  create: MediaCreateWithoutMediaCommentInput;
}

export interface MediaCreateOrConnectWithoutTagedPetsInput {
  where: MediaWhereUniqueInput;
  create: MediaCreateWithoutTagedPetsInput;
}

export interface MediaCreateOrConnectWithoutUserInput {
  where: MediaWhereUniqueInput;
  create: MediaCreateWithoutUserInput;
}

export interface MediaCreateWithoutLikedUsersInput {
  id?: string | null;
  createdAt: any;
  content: string;
  isInstagram?: boolean | null;
  images?: MediaImageCreateNestedManyWithoutMediaInput | null;
  user?: UserCreateNestedOneWithoutMediasInput | null;
  tagedPets?: PetCreateNestedManyWithoutTagedMediasInput | null;
  mediaComment?: MediaCommentCreateNestedManyWithoutMediaInput | null;
}

export interface MediaCreateWithoutMediaCommentInput {
  id?: string | null;
  createdAt: any;
  content: string;
  isInstagram?: boolean | null;
  images?: MediaImageCreateNestedManyWithoutMediaInput | null;
  user?: UserCreateNestedOneWithoutMediasInput | null;
  tagedPets?: PetCreateNestedManyWithoutTagedMediasInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedMediasInput | null;
}

export interface MediaCreateWithoutTagedPetsInput {
  id?: string | null;
  createdAt: any;
  content: string;
  isInstagram?: boolean | null;
  images?: MediaImageCreateNestedManyWithoutMediaInput | null;
  user?: UserCreateNestedOneWithoutMediasInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedMediasInput | null;
  mediaComment?: MediaCommentCreateNestedManyWithoutMediaInput | null;
}

export interface MediaCreateWithoutUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  isInstagram?: boolean | null;
  images?: MediaImageCreateNestedManyWithoutMediaInput | null;
  tagedPets?: PetCreateNestedManyWithoutTagedMediasInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedMediasInput | null;
  mediaComment?: MediaCommentCreateNestedManyWithoutMediaInput | null;
}

export interface MediaImageCreateManyMediaInput {
  id?: string | null;
  createdAt?: any | null;
  orderKey: number;
  url: string;
}

export interface MediaImageCreateManyMediaInputEnvelope {
  data?: MediaImageCreateManyMediaInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaImageCreateNestedManyWithoutMediaInput {
  create?: MediaImageCreateWithoutMediaInput[] | null;
  connectOrCreate?: MediaImageCreateOrConnectWithoutMediaInput[] | null;
  createMany?: MediaImageCreateManyMediaInputEnvelope | null;
  connect?: MediaImageWhereUniqueInput[] | null;
}

export interface MediaImageCreateOrConnectWithoutMediaInput {
  where: MediaImageWhereUniqueInput;
  create: MediaImageCreateWithoutMediaInput;
}

export interface MediaImageCreateWithoutMediaInput {
  id?: string | null;
  createdAt?: any | null;
  orderKey: number;
  url: string;
}

export interface MediaImageWhereUniqueInput {
  id?: string | null;
}

export interface MediaReplyCommentCreateManyMediaCommentInput {
  id?: string | null;
  createdAt: any;
  content: string;
  userId: string;
  targetUserId?: string | null;
}

export interface MediaReplyCommentCreateManyMediaCommentInputEnvelope {
  data?: MediaReplyCommentCreateManyMediaCommentInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaReplyCommentCreateManyTargetUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  userId: string;
  mediaCommentId: string;
}

export interface MediaReplyCommentCreateManyTargetUserInputEnvelope {
  data?: MediaReplyCommentCreateManyTargetUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaReplyCommentCreateManyUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  targetUserId?: string | null;
  mediaCommentId: string;
}

export interface MediaReplyCommentCreateManyUserInputEnvelope {
  data?: MediaReplyCommentCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface MediaReplyCommentCreateNestedManyWithoutMediaCommentInput {
  create?: MediaReplyCommentCreateWithoutMediaCommentInput[] | null;
  connectOrCreate?: MediaReplyCommentCreateOrConnectWithoutMediaCommentInput[] | null;
  createMany?: MediaReplyCommentCreateManyMediaCommentInputEnvelope | null;
  connect?: MediaReplyCommentWhereUniqueInput[] | null;
}

export interface MediaReplyCommentCreateNestedManyWithoutTargetUserInput {
  create?: MediaReplyCommentCreateWithoutTargetUserInput[] | null;
  connectOrCreate?: MediaReplyCommentCreateOrConnectWithoutTargetUserInput[] | null;
  createMany?: MediaReplyCommentCreateManyTargetUserInputEnvelope | null;
  connect?: MediaReplyCommentWhereUniqueInput[] | null;
}

export interface MediaReplyCommentCreateNestedManyWithoutUserInput {
  create?: MediaReplyCommentCreateWithoutUserInput[] | null;
  connectOrCreate?: MediaReplyCommentCreateOrConnectWithoutUserInput[] | null;
  createMany?: MediaReplyCommentCreateManyUserInputEnvelope | null;
  connect?: MediaReplyCommentWhereUniqueInput[] | null;
}

export interface MediaReplyCommentCreateOrConnectWithoutMediaCommentInput {
  where: MediaReplyCommentWhereUniqueInput;
  create: MediaReplyCommentCreateWithoutMediaCommentInput;
}

export interface MediaReplyCommentCreateOrConnectWithoutTargetUserInput {
  where: MediaReplyCommentWhereUniqueInput;
  create: MediaReplyCommentCreateWithoutTargetUserInput;
}

export interface MediaReplyCommentCreateOrConnectWithoutUserInput {
  where: MediaReplyCommentWhereUniqueInput;
  create: MediaReplyCommentCreateWithoutUserInput;
}

export interface MediaReplyCommentCreateWithoutMediaCommentInput {
  id?: string | null;
  createdAt: any;
  content: string;
  user: UserCreateNestedOneWithoutMediaReplyCommentsInput;
  targetUser?: UserCreateNestedOneWithoutMediaReplyTargetedCommentsInput | null;
}

export interface MediaReplyCommentCreateWithoutTargetUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  user: UserCreateNestedOneWithoutMediaReplyCommentsInput;
  mediaComment: MediaCommentCreateNestedOneWithoutMediaReplyCommentInput;
}

export interface MediaReplyCommentCreateWithoutUserInput {
  id?: string | null;
  createdAt: any;
  content: string;
  targetUser?: UserCreateNestedOneWithoutMediaReplyTargetedCommentsInput | null;
  mediaComment: MediaCommentCreateNestedOneWithoutMediaReplyCommentInput;
}

export interface MediaReplyCommentWhereUniqueInput {
  id?: string | null;
}

export interface MediaWhereUniqueInput {
  id?: string | null;
}

export interface PetCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  orderKey: number;
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

export interface PetCreateManyUserInputEnvelope {
  data?: PetCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PetCreateNestedManyWithoutTagedMediasInput {
  create?: PetCreateWithoutTagedMediasInput[] | null;
  connectOrCreate?: PetCreateOrConnectWithoutTagedMediasInput[] | null;
  connect?: PetWhereUniqueInput[] | null;
}

export interface PetCreateNestedManyWithoutUserInput {
  create?: PetCreateWithoutUserInput[] | null;
  connectOrCreate?: PetCreateOrConnectWithoutUserInput[] | null;
  createMany?: PetCreateManyUserInputEnvelope | null;
  connect?: PetWhereUniqueInput[] | null;
}

export interface PetCreateOrConnectWithoutTagedMediasInput {
  where: PetWhereUniqueInput;
  create: PetCreateWithoutTagedMediasInput;
}

export interface PetCreateOrConnectWithoutUserInput {
  where: PetWhereUniqueInput;
  create: PetCreateWithoutUserInput;
}

export interface PetCreateWithoutTagedMediasInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  orderKey: number;
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
  user: UserCreateNestedOneWithoutPetsInput;
}

export interface PetCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  orderKey: number;
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
  tagedMedias?: MediaCreateNestedManyWithoutTagedPetsInput | null;
}

export interface PetWhereUniqueInput {
  id?: string | null;
}

export interface PetsAdressFilterInput {
  area1Id?: string | null;
  area2Id?: string | null;
  area3Id?: string | null;
  landId?: string | null;
}

export interface PostCommentCreateInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  user: UserCreateNestedOneWithoutPostCommentsInput;
  post: PostCreateNestedOneWithoutCommentsInput;
  replyComments?: PostReplyCommentCreateNestedManyWithoutPostCommentInput | null;
}

export interface PostCommentCreateManyPostInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  userId: string;
}

export interface PostCommentCreateManyPostInputEnvelope {
  data?: PostCommentCreateManyPostInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostCommentCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  postId: string;
}

export interface PostCommentCreateManyUserInputEnvelope {
  data?: PostCommentCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostCommentCreateNestedManyWithoutPostInput {
  create?: PostCommentCreateWithoutPostInput[] | null;
  connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput[] | null;
  createMany?: PostCommentCreateManyPostInputEnvelope | null;
  connect?: PostCommentWhereUniqueInput[] | null;
}

export interface PostCommentCreateNestedManyWithoutUserInput {
  create?: PostCommentCreateWithoutUserInput[] | null;
  connectOrCreate?: PostCommentCreateOrConnectWithoutUserInput[] | null;
  createMany?: PostCommentCreateManyUserInputEnvelope | null;
  connect?: PostCommentWhereUniqueInput[] | null;
}

export interface PostCommentCreateNestedOneWithoutReplyCommentsInput {
  create?: PostCommentCreateWithoutReplyCommentsInput | null;
  connectOrCreate?: PostCommentCreateOrConnectWithoutReplyCommentsInput | null;
  connect?: PostCommentWhereUniqueInput | null;
}

export interface PostCommentCreateOrConnectWithoutPostInput {
  where: PostCommentWhereUniqueInput;
  create: PostCommentCreateWithoutPostInput;
}

export interface PostCommentCreateOrConnectWithoutReplyCommentsInput {
  where: PostCommentWhereUniqueInput;
  create: PostCommentCreateWithoutReplyCommentsInput;
}

export interface PostCommentCreateOrConnectWithoutUserInput {
  where: PostCommentWhereUniqueInput;
  create: PostCommentCreateWithoutUserInput;
}

export interface PostCommentCreateWithoutPostInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  user: UserCreateNestedOneWithoutPostCommentsInput;
  replyComments?: PostReplyCommentCreateNestedManyWithoutPostCommentInput | null;
}

export interface PostCommentCreateWithoutReplyCommentsInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  user: UserCreateNestedOneWithoutPostCommentsInput;
  post: PostCreateNestedOneWithoutCommentsInput;
}

export interface PostCommentCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  post: PostCreateNestedOneWithoutCommentsInput;
  replyComments?: PostReplyCommentCreateNestedManyWithoutPostCommentInput | null;
}

export interface PostCommentWhereUniqueInput {
  id?: string | null;
}

export interface PostCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  type: PostType;
  content: string;
}

export interface PostCreateManyUserInputEnvelope {
  data?: PostCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostCreateNestedManyWithoutLikedUsersInput {
  create?: PostCreateWithoutLikedUsersInput[] | null;
  connectOrCreate?: PostCreateOrConnectWithoutLikedUsersInput[] | null;
  connect?: PostWhereUniqueInput[] | null;
}

export interface PostCreateNestedManyWithoutNotificatedUsersInput {
  create?: PostCreateWithoutNotificatedUsersInput[] | null;
  connectOrCreate?: PostCreateOrConnectWithoutNotificatedUsersInput[] | null;
  connect?: PostWhereUniqueInput[] | null;
}

export interface PostCreateNestedManyWithoutUserInput {
  create?: PostCreateWithoutUserInput[] | null;
  connectOrCreate?: PostCreateOrConnectWithoutUserInput[] | null;
  createMany?: PostCreateManyUserInputEnvelope | null;
  connect?: PostWhereUniqueInput[] | null;
}

export interface PostCreateNestedOneWithoutCommentsInput {
  create?: PostCreateWithoutCommentsInput | null;
  connectOrCreate?: PostCreateOrConnectWithoutCommentsInput | null;
  connect?: PostWhereUniqueInput | null;
}

export interface PostCreateOrConnectWithoutCommentsInput {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutCommentsInput;
}

export interface PostCreateOrConnectWithoutLikedUsersInput {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutLikedUsersInput;
}

export interface PostCreateOrConnectWithoutNotificatedUsersInput {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutNotificatedUsersInput;
}

export interface PostCreateOrConnectWithoutUserInput {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutUserInput;
}

export interface PostCreateWithoutCommentsInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  type: PostType;
  content: string;
  user: UserCreateNestedOneWithoutPostsInput;
  images?: PostImageCreateNestedManyWithoutPostInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedPostsInput | null;
  notificatedUsers?: UserCreateNestedManyWithoutNotificatedPostsInput | null;
}

export interface PostCreateWithoutLikedUsersInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  type: PostType;
  content: string;
  user: UserCreateNestedOneWithoutPostsInput;
  images?: PostImageCreateNestedManyWithoutPostInput | null;
  notificatedUsers?: UserCreateNestedManyWithoutNotificatedPostsInput | null;
  comments?: PostCommentCreateNestedManyWithoutPostInput | null;
}

export interface PostCreateWithoutNotificatedUsersInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  type: PostType;
  content: string;
  user: UserCreateNestedOneWithoutPostsInput;
  images?: PostImageCreateNestedManyWithoutPostInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedPostsInput | null;
  comments?: PostCommentCreateNestedManyWithoutPostInput | null;
}

export interface PostCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  type: PostType;
  content: string;
  images?: PostImageCreateNestedManyWithoutPostInput | null;
  likedUsers?: UserCreateNestedManyWithoutLikedPostsInput | null;
  notificatedUsers?: UserCreateNestedManyWithoutNotificatedPostsInput | null;
  comments?: PostCommentCreateNestedManyWithoutPostInput | null;
}

export interface PostImageCreateManyPostInput {
  id?: string | null;
  createdAt?: any | null;
  url: string;
}

export interface PostImageCreateManyPostInputEnvelope {
  data?: PostImageCreateManyPostInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostImageCreateNestedManyWithoutPostInput {
  create?: PostImageCreateWithoutPostInput[] | null;
  connectOrCreate?: PostImageCreateOrConnectWithoutPostInput[] | null;
  createMany?: PostImageCreateManyPostInputEnvelope | null;
  connect?: PostImageWhereUniqueInput[] | null;
}

export interface PostImageCreateOrConnectWithoutPostInput {
  where: PostImageWhereUniqueInput;
  create: PostImageCreateWithoutPostInput;
}

export interface PostImageCreateWithoutPostInput {
  id?: string | null;
  createdAt?: any | null;
  url: string;
}

export interface PostImageWhereUniqueInput {
  id?: string | null;
}

export interface PostReplyCommentCreateInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  user: UserCreateNestedOneWithoutPostReplyCommentInput;
  postComment: PostCommentCreateNestedOneWithoutReplyCommentsInput;
}

export interface PostReplyCommentCreateManyPostCommentInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  userId: string;
}

export interface PostReplyCommentCreateManyPostCommentInputEnvelope {
  data?: PostReplyCommentCreateManyPostCommentInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostReplyCommentCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  postCommentId: string;
}

export interface PostReplyCommentCreateManyUserInputEnvelope {
  data?: PostReplyCommentCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostReplyCommentCreateNestedManyWithoutPostCommentInput {
  create?: PostReplyCommentCreateWithoutPostCommentInput[] | null;
  connectOrCreate?: PostReplyCommentCreateOrConnectWithoutPostCommentInput[] | null;
  createMany?: PostReplyCommentCreateManyPostCommentInputEnvelope | null;
  connect?: PostReplyCommentWhereUniqueInput[] | null;
}

export interface PostReplyCommentCreateNestedManyWithoutUserInput {
  create?: PostReplyCommentCreateWithoutUserInput[] | null;
  connectOrCreate?: PostReplyCommentCreateOrConnectWithoutUserInput[] | null;
  createMany?: PostReplyCommentCreateManyUserInputEnvelope | null;
  connect?: PostReplyCommentWhereUniqueInput[] | null;
}

export interface PostReplyCommentCreateOrConnectWithoutPostCommentInput {
  where: PostReplyCommentWhereUniqueInput;
  create: PostReplyCommentCreateWithoutPostCommentInput;
}

export interface PostReplyCommentCreateOrConnectWithoutUserInput {
  where: PostReplyCommentWhereUniqueInput;
  create: PostReplyCommentCreateWithoutUserInput;
}

export interface PostReplyCommentCreateWithoutPostCommentInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  user: UserCreateNestedOneWithoutPostReplyCommentInput;
}

export interface PostReplyCommentCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  content: string;
  image?: string | null;
  postComment: PostCommentCreateNestedOneWithoutReplyCommentsInput;
}

export interface PostReplyCommentWhereUniqueInput {
  id?: string | null;
}

export interface PostWhereUniqueInput {
  id?: string | null;
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

export interface ReportCreateManyChatInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporterId: string;
  userId?: string | null;
  chatRoomId?: string | null;
}

export interface ReportCreateManyChatInputEnvelope {
  data?: ReportCreateManyChatInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ReportCreateManyChatRoomInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporterId: string;
  userId?: string | null;
  chatId?: string | null;
}

export interface ReportCreateManyChatRoomInputEnvelope {
  data?: ReportCreateManyChatRoomInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ReportCreateManyReporterInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  userId?: string | null;
  chatId?: string | null;
  chatRoomId?: string | null;
}

export interface ReportCreateManyReporterInputEnvelope {
  data?: ReportCreateManyReporterInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ReportCreateManyUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporterId: string;
  chatId?: string | null;
  chatRoomId?: string | null;
}

export interface ReportCreateManyUserInputEnvelope {
  data?: ReportCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface ReportCreateNestedManyWithoutChatInput {
  create?: ReportCreateWithoutChatInput[] | null;
  connectOrCreate?: ReportCreateOrConnectWithoutChatInput[] | null;
  createMany?: ReportCreateManyChatInputEnvelope | null;
  connect?: ReportWhereUniqueInput[] | null;
}

export interface ReportCreateNestedManyWithoutChatRoomInput {
  create?: ReportCreateWithoutChatRoomInput[] | null;
  connectOrCreate?: ReportCreateOrConnectWithoutChatRoomInput[] | null;
  createMany?: ReportCreateManyChatRoomInputEnvelope | null;
  connect?: ReportWhereUniqueInput[] | null;
}

export interface ReportCreateNestedManyWithoutReporterInput {
  create?: ReportCreateWithoutReporterInput[] | null;
  connectOrCreate?: ReportCreateOrConnectWithoutReporterInput[] | null;
  createMany?: ReportCreateManyReporterInputEnvelope | null;
  connect?: ReportWhereUniqueInput[] | null;
}

export interface ReportCreateNestedManyWithoutUserInput {
  create?: ReportCreateWithoutUserInput[] | null;
  connectOrCreate?: ReportCreateOrConnectWithoutUserInput[] | null;
  createMany?: ReportCreateManyUserInputEnvelope | null;
  connect?: ReportWhereUniqueInput[] | null;
}

export interface ReportCreateOrConnectWithoutChatInput {
  where: ReportWhereUniqueInput;
  create: ReportCreateWithoutChatInput;
}

export interface ReportCreateOrConnectWithoutChatRoomInput {
  where: ReportWhereUniqueInput;
  create: ReportCreateWithoutChatRoomInput;
}

export interface ReportCreateOrConnectWithoutReporterInput {
  where: ReportWhereUniqueInput;
  create: ReportCreateWithoutReporterInput;
}

export interface ReportCreateOrConnectWithoutUserInput {
  where: ReportWhereUniqueInput;
  create: ReportCreateWithoutUserInput;
}

export interface ReportCreateWithoutChatInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporter: UserCreateNestedOneWithoutMyReportsInput;
  user?: UserCreateNestedOneWithoutReportsInput | null;
  chatRoom?: ChatRoomCreateNestedOneWithoutReportsInput | null;
}

export interface ReportCreateWithoutChatRoomInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporter: UserCreateNestedOneWithoutMyReportsInput;
  user?: UserCreateNestedOneWithoutReportsInput | null;
  chat?: ChatCreateNestedOneWithoutReportsInput | null;
}

export interface ReportCreateWithoutReporterInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  user?: UserCreateNestedOneWithoutReportsInput | null;
  chat?: ChatCreateNestedOneWithoutReportsInput | null;
  chatRoom?: ChatRoomCreateNestedOneWithoutReportsInput | null;
}

export interface ReportCreateWithoutUserInput {
  id?: string | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  reason: string;
  reporter: UserCreateNestedOneWithoutMyReportsInput;
  chat?: ChatCreateNestedOneWithoutReportsInput | null;
  chatRoom?: ChatRoomCreateNestedOneWithoutReportsInput | null;
}

export interface ReportWhereUniqueInput {
  id?: string | null;
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
  instagramId?: string | null;
  introduce: string;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
}

export interface UpdatePostInput {
  id: string;
  content: string;
  type: PostType;
  images: string[];
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
  instagramId?: string | null;
}

export interface UserChatRoomInfoCreateManyChatRoomInput {
  id: string;
  updatedAt?: any | null;
  joinedAt?: any | null;
  bookmarked?: boolean | null;
  notificated?: boolean | null;
  blocked?: boolean | null;
  userId: string;
}

export interface UserChatRoomInfoCreateManyChatRoomInputEnvelope {
  data?: UserChatRoomInfoCreateManyChatRoomInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface UserChatRoomInfoCreateManyUserInput {
  id: string;
  updatedAt?: any | null;
  joinedAt?: any | null;
  bookmarked?: boolean | null;
  notificated?: boolean | null;
  blocked?: boolean | null;
  chatRoomId: string;
}

export interface UserChatRoomInfoCreateManyUserInputEnvelope {
  data?: UserChatRoomInfoCreateManyUserInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface UserChatRoomInfoCreateNestedManyWithoutChatRoomInput {
  create?: UserChatRoomInfoCreateWithoutChatRoomInput[] | null;
  connectOrCreate?: UserChatRoomInfoCreateOrConnectWithoutChatRoomInput[] | null;
  createMany?: UserChatRoomInfoCreateManyChatRoomInputEnvelope | null;
  connect?: UserChatRoomInfoWhereUniqueInput[] | null;
}

export interface UserChatRoomInfoCreateNestedManyWithoutNotReadChatsInput {
  create?: UserChatRoomInfoCreateWithoutNotReadChatsInput[] | null;
  connectOrCreate?: UserChatRoomInfoCreateOrConnectWithoutNotReadChatsInput[] | null;
  connect?: UserChatRoomInfoWhereUniqueInput[] | null;
}

export interface UserChatRoomInfoCreateNestedManyWithoutUserInput {
  create?: UserChatRoomInfoCreateWithoutUserInput[] | null;
  connectOrCreate?: UserChatRoomInfoCreateOrConnectWithoutUserInput[] | null;
  createMany?: UserChatRoomInfoCreateManyUserInputEnvelope | null;
  connect?: UserChatRoomInfoWhereUniqueInput[] | null;
}

export interface UserChatRoomInfoCreateOrConnectWithoutChatRoomInput {
  where: UserChatRoomInfoWhereUniqueInput;
  create: UserChatRoomInfoCreateWithoutChatRoomInput;
}

export interface UserChatRoomInfoCreateOrConnectWithoutNotReadChatsInput {
  where: UserChatRoomInfoWhereUniqueInput;
  create: UserChatRoomInfoCreateWithoutNotReadChatsInput;
}

export interface UserChatRoomInfoCreateOrConnectWithoutUserInput {
  where: UserChatRoomInfoWhereUniqueInput;
  create: UserChatRoomInfoCreateWithoutUserInput;
}

export interface UserChatRoomInfoCreateWithoutChatRoomInput {
  id: string;
  updatedAt?: any | null;
  joinedAt?: any | null;
  bookmarked?: boolean | null;
  notificated?: boolean | null;
  blocked?: boolean | null;
  user: UserCreateNestedOneWithoutUserChatRoomInfosInput;
  notReadChats?: ChatCreateNestedManyWithoutNotReadUserChatRoomInfosInput | null;
}

export interface UserChatRoomInfoCreateWithoutNotReadChatsInput {
  id: string;
  updatedAt?: any | null;
  joinedAt?: any | null;
  bookmarked?: boolean | null;
  notificated?: boolean | null;
  blocked?: boolean | null;
  user: UserCreateNestedOneWithoutUserChatRoomInfosInput;
  chatRoom: ChatRoomCreateNestedOneWithoutUserChatRoomInfosInput;
}

export interface UserChatRoomInfoCreateWithoutUserInput {
  id: string;
  updatedAt?: any | null;
  joinedAt?: any | null;
  bookmarked?: boolean | null;
  notificated?: boolean | null;
  blocked?: boolean | null;
  chatRoom: ChatRoomCreateNestedOneWithoutUserChatRoomInfosInput;
  notReadChats?: ChatCreateNestedManyWithoutNotReadUserChatRoomInfosInput | null;
}

export interface UserChatRoomInfoWhereUniqueInput {
  id?: string | null;
}

export interface UserCreateNestedManyWithoutFollowersInput {
  create?: UserCreateWithoutFollowersInput[] | null;
  connectOrCreate?: UserCreateOrConnectWithoutFollowersInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateNestedManyWithoutFollowingsInput {
  create?: UserCreateWithoutFollowingsInput[] | null;
  connectOrCreate?: UserCreateOrConnectWithoutFollowingsInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateNestedManyWithoutLikedMediasInput {
  create?: UserCreateWithoutLikedMediasInput[] | null;
  connectOrCreate?: UserCreateOrConnectWithoutLikedMediasInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateNestedManyWithoutLikedPostsInput {
  create?: UserCreateWithoutLikedPostsInput[] | null;
  connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateNestedManyWithoutNotificatedPostsInput {
  create?: UserCreateWithoutNotificatedPostsInput[] | null;
  connectOrCreate?: UserCreateOrConnectWithoutNotificatedPostsInput[] | null;
  connect?: UserWhereUniqueInput[] | null;
}

export interface UserCreateNestedOneWithoutChatsInput {
  create?: UserCreateWithoutChatsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutChatsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutMediaCommentsInput {
  create?: UserCreateWithoutMediaCommentsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutMediaCommentsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutMediaReplyCommentsInput {
  create?: UserCreateWithoutMediaReplyCommentsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutMediaReplyCommentsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutMediaReplyTargetedCommentsInput {
  create?: UserCreateWithoutMediaReplyTargetedCommentsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutMediaReplyTargetedCommentsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutMediasInput {
  create?: UserCreateWithoutMediasInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutMediasInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutMyReportsInput {
  create?: UserCreateWithoutMyReportsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutMyReportsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutPetsInput {
  create?: UserCreateWithoutPetsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutPetsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutPostCommentsInput {
  create?: UserCreateWithoutPostCommentsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutPostCommentsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutPostReplyCommentInput {
  create?: UserCreateWithoutPostReplyCommentInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutPostReplyCommentInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutReportsInput {
  create?: UserCreateWithoutReportsInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutReportsInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateNestedOneWithoutUserChatRoomInfosInput {
  create?: UserCreateWithoutUserChatRoomInfosInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutUserChatRoomInfosInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateOrConnectWithoutChatsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutChatsInput;
}

export interface UserCreateOrConnectWithoutFollowersInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutFollowersInput;
}

export interface UserCreateOrConnectWithoutFollowingsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutFollowingsInput;
}

export interface UserCreateOrConnectWithoutLikedMediasInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutLikedMediasInput;
}

export interface UserCreateOrConnectWithoutLikedPostsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutLikedPostsInput;
}

export interface UserCreateOrConnectWithoutMediaCommentsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMediaCommentsInput;
}

export interface UserCreateOrConnectWithoutMediaReplyCommentsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMediaReplyCommentsInput;
}

export interface UserCreateOrConnectWithoutMediaReplyTargetedCommentsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMediaReplyTargetedCommentsInput;
}

export interface UserCreateOrConnectWithoutMediasInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMediasInput;
}

export interface UserCreateOrConnectWithoutMyReportsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutMyReportsInput;
}

export interface UserCreateOrConnectWithoutNotificatedPostsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutNotificatedPostsInput;
}

export interface UserCreateOrConnectWithoutPetsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPetsInput;
}

export interface UserCreateOrConnectWithoutPostCommentsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPostCommentsInput;
}

export interface UserCreateOrConnectWithoutPostReplyCommentInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPostReplyCommentInput;
}

export interface UserCreateOrConnectWithoutPostsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPostsInput;
}

export interface UserCreateOrConnectWithoutReportsInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutReportsInput;
}

export interface UserCreateOrConnectWithoutUserChatRoomInfosInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutUserChatRoomInfosInput;
}

export interface UserCreateWithoutChatsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutFollowersInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutFollowingsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutLikedMediasInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutLikedPostsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutMediaCommentsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutMediaReplyCommentsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutMediaReplyTargetedCommentsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
}

export interface UserCreateWithoutMediasInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutMyReportsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutNotificatedPostsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutPetsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutPostCommentsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutPostReplyCommentInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutPostsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutReportsInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  userChatRoomInfos?: UserChatRoomInfoCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserCreateWithoutUserChatRoomInfosInput {
  createdAt?: any | null;
  updatedAt?: any | null;
  id?: string | null;
  snsLoginId: string;
  email: string;
  image: string;
  uniqueKey: string;
  name: string;
  gender: Gender;
  birth: any;
  inflow: string;
  introduce: string;
  instagramId?: string | null;
  agreementDate: any;
  marketingPushDate?: any | null;
  marketingEmailDate?: any | null;
  fcmToken?: string | null;
  withdrawDate?: any | null;
  withdrawReason?: string | null;
  address: AddressCreateNestedOneWithoutUserInput;
  pets?: PetCreateNestedManyWithoutUserInput | null;
  chats?: ChatCreateNestedManyWithoutUserInput | null;
  reports?: ReportCreateNestedManyWithoutUserInput | null;
  myReports?: ReportCreateNestedManyWithoutReporterInput | null;
  posts?: PostCreateNestedManyWithoutUserInput | null;
  notificatedPosts?: PostCreateNestedManyWithoutNotificatedUsersInput | null;
  likedPosts?: PostCreateNestedManyWithoutLikedUsersInput | null;
  postComments?: PostCommentCreateNestedManyWithoutUserInput | null;
  postReplyComment?: PostReplyCommentCreateNestedManyWithoutUserInput | null;
  medias?: MediaCreateNestedManyWithoutUserInput | null;
  likedMedias?: MediaCreateNestedManyWithoutLikedUsersInput | null;
  followers?: UserCreateNestedManyWithoutFollowingsInput | null;
  followings?: UserCreateNestedManyWithoutFollowersInput | null;
  mediaComments?: MediaCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyComments?: MediaReplyCommentCreateNestedManyWithoutUserInput | null;
  mediaReplyTargetedComments?: MediaReplyCommentCreateNestedManyWithoutTargetUserInput | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  snsLoginId?: string | null;
  email?: string | null;
  uniqueKey?: string | null;
  addressId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
