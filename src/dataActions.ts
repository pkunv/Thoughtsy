import type { Params } from "react-router-dom"
import { PostgrestError, User, createClient } from "@supabase/supabase-js"
import { LoaderFunction, ActionFunction } from "react-router-dom"
import {
  BadRequest,
  PostInterface,
  PostLoaderParams,
  SignInFormValues,
  SignUpFormValues
} from "./types"
import { makeLoader } from "react-router-typesafe"
import { defer } from "react-router-typesafe"

const supabase = createClient(import.meta.env.VITE_SUPABASE_SITE, import.meta.env.VITE_SUPABASE_KEY)

export const userLoader = (async () => {
  return { ...(await supabase.auth.getUser()).data }
}) satisfies LoaderFunction

export const logoutAction = (async () => {
  const { error } = await supabase.auth.signOut()
  var message = !error
    ? "You logged out successfully."
    : `There is a problem with logging out: ${error.message}`
  return { success: !error, message }
}) satisfies ActionFunction

export const registerAction = (async ({ request }: { request: Request }) => {
  let requestData = (await request.json()) as SignUpFormValues
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: requestData.email,
    password: requestData.password
  })
  const { error: updatingError } = await supabase
    .from("users")
    .update({ display_name: requestData.displayName })
    .eq("uid", data.user?.id)

  var message =
    !signUpError && !updatingError
      ? "You signed up successfully, we sent you an e-mail, please verify your account to login."
      : `There is a problem with signing up: ${
          signUpError?.message ?? updatingError?.message ?? ""
        }`
  return { success: !signUpError && !updatingError, message }
}) satisfies ActionFunction

export const loginAction = (async ({ request }: { request: Request }) => {
  var formData = (await request.json()) as SignInFormValues
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })
  var message = !error
    ? "You logged in successfully."
    : `There is a problem with logging in: ${error.message}`
  return { success: !error, message }
}) satisfies ActionFunction

export const postAction = (async ({ request }: { request: Request }) => {
  const actionResponse = ({
    error,
    successMessage,
    actionDescription
  }: {
    error: PostgrestError | null
    successMessage: string
    actionDescription: string
  }) => {
    const message = !error
      ? successMessage
      : `There is a problem with your post ${actionDescription}: ${error.message}`
    return { success: !error, message }
  }

  var formData = (await request.json()) as PostInterface
  let successMessage,
    actionDescription = ""
  // returning response on every case is required since switch statement limits variable scope
  switch (request.method) {
    case "POST": {
      const { error } = await supabase.from("posts").insert({ content: formData.content })
      actionDescription = "submition"
      successMessage = "You submitted your post successfully!"
      return actionResponse({ error, successMessage, actionDescription })
    }
    // i use patch method since we update only one element of data (`posts`.`content`) according to RFC 5789 guidelines
    case "PATCH": {
      const { error } = await supabase.from("posts").update({ content: formData.content })
      actionDescription = "edit"
      successMessage = "You edited your post successfully!"
      return actionResponse({ error, successMessage, actionDescription })
    }
    case "DELETE": {
      const { error } = await supabase.from("posts").update({ active: 0 }).eq("id", formData.id)
      actionDescription = "deletion"
      successMessage = "You deleted your post successfully!"
      return actionResponse({ error, successMessage, actionDescription })
    }
  }
}) satisfies ActionFunction

/*
custom fetch handling is needed as supabase do not support async data fetching, only await is supported in API
for query building reference see: https://github.com/supabase/postgrest-js/tree/f91aa2944f52da3aefc77a6712990731fff16252/src
*/
export const postsLoader = (async () => {
  let searchParams = new URLSearchParams({
    select: `id, content, type, source, createdAt:created_at,
    ...users (
      displayName:display_name
    ),postLikes:post_likes(count)`
      .replaceAll(/\n/g, "")
      .replaceAll(/\t/g, ""),
    active: `eq.1` // we want only active posts in feed, although accessing deleted posts should be enabled as in Twitter for example
  })

  type UserResponse =
    | (Omit<Response, "json"> & {
        status: 200
        json: () => Array<PostInterface> | PromiseLike<Array<PostInterface>>
      })
    | (Omit<Response, "json"> & {
        status: 400 | 404
        json: () => BadRequest | PromiseLike<BadRequest>
      })

  const marshalResponse = (res: UserResponse) => {
    if (res.status === 200) return res.json()
    if (res.status === 400 || res.status === 404) return res.json()
    //return Error('Unhandled code')
  }

  const responseHandler = (response: Response) => {
    const res = response as UserResponse
    return marshalResponse(res)
  }

  return defer({
    posts: fetch(`${import.meta.env.VITE_SUPABASE_SITE}/rest/v1/posts?${searchParams}`, {
      method: "GET",
      headers: {
        Apikey: import.meta.env.VITE_SUPABASE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`
      }
    }).then((res) => responseHandler(res))
  })
}) satisfies LoaderFunction

export const postLoader = (async ({ params }: PostLoaderParams) => {
  let searchParams = new URLSearchParams({
    select: `id, content, type, source, createdAt:created_at,
    ...users (
      displayName:display_name
    ),postLikes:post_likes(count)`
      .replaceAll(/\n/g, "")
      .replaceAll(/\t/g, ""),
    id: `eq.${params.postId}`
  })

  type UserResponse =
    | (Omit<Response, "json"> & {
        status: 200
        json: () => PostInterface | PromiseLike<PostInterface>
      })
    | (Omit<Response, "json"> & {
        status: 400 | 404
        json: () => BadRequest | PromiseLike<BadRequest>
      })

  const marshalResponse = (res: UserResponse) => {
    if (res.status === 200) return res.json()
    if (res.status === 400 || res.status === 404) return res.json()
    //return Error('Unhandled code')
  }

  const responseHandler = (response: Response) => {
    const res = response as UserResponse
    return marshalResponse(res)
  }

  return defer({
    post: fetch(`${import.meta.env.VITE_SUPABASE_SITE}/rest/v1/posts?${searchParams}`, {
      method: "GET",
      headers: {
        Apikey: import.meta.env.VITE_SUPABASE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
        Accept: "application/vnd.pgrst.object+json" // .single() equivalent
      }
    }).then((res) => responseHandler(res))
  })
}) satisfies LoaderFunction
