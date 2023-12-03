import { Params } from "react-router-dom"

export type PostLoaderParams = {
  params: Params<"postId">
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
