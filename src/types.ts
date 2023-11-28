import { Params } from "react-router-dom"

export type PostLoaderParams = {
  params: Params<"postId">
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
  displayName: string
  postLikes: Array<{ count: number }>
}

export interface AppModalsState {
  login: boolean
  register: boolean
  deleteThought: boolean
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
