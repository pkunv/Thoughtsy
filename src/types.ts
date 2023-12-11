import { Params } from "react-router-dom"

export type PostLoaderParams = {
  params: Params<"postId">
}

export type UserProfileLoaderParams = {
  params: Params<"userId">
}

export type PostLikeActionParams = Params<"postId">

export type ContextType = {
  setPostDeleteId: Function
  handleModalToggle: Function
}

export interface SignUpFormValues {
  email: string
  password: string
  repassword: string
  displayName: string
}

export interface SignInFormValues {
  email: string
  password: string
}

export interface UserInterface {
  uid: string
  displayName: string
  email: string
  postCount: number | null | undefined
  createdAt: string
  modifiedAt: string
  active: boolean
}

export interface PostInterface {
  id: number
  content: string
  createdAt: string
  modifiedAt: string | null
  displayName: string
  likes: Array<{ uid: string; displayName: string }>
  uid: string
  active: boolean
}

export interface AppModalsState {
  login: boolean
  register: boolean
  postDelete: boolean
}

export interface NavItem {
  type: string
  path: string
  name: string
  key: string
}

export interface PostFormValues {
  content: string
}

export type BadRequest = {
  code: number
  message: string
}

export enum AccessabilityTypes {
  Public = "public",
  User = "user"
}

export interface RouteInfo {
  key: string
  name: string
  navItem: boolean
  path: string
  accessableFor: Array<AccessabilityTypes>
  type: "modal" | "route" | "fetcher"
}
