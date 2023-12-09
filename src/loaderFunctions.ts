import { LoaderFunction } from "react-router-dom"
import { defer } from "react-router-typesafe"
import { supabase } from "./supabase"
import { BadRequest, PostInterface, PostLoaderParams, UserProfileLoaderParams } from "./types"

export const userLoader = (async () => {
  return { ...(await supabase.auth.getUser()).data }
}) satisfies LoaderFunction

export const userProfileLoader = (async ({ params }: UserProfileLoaderParams) => {
  let searchParams = new URLSearchParams({
    select:
      `uid, displayName:display_name, createdAt:created_atcontent, type, source, createdAt:created_at, uid, active, modifiedAt:modified_at,
    ...users (
      count
    ),likes:post_likes(uid, ...users(displayName:display_name))`
        .replaceAll(/\n/g, "")
        .replaceAll(/\t/g, ""),
    id: `eq.${params.userId}`
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
    post: fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts?${searchParams}`, {
      method: "GET",
      headers: {
        Apikey: import.meta.env.VITE_SUPABASE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
        Accept: "application/vnd.pgrst.object+json" // .single() equivalent
      }
    }).then((res) => responseHandler(res))
  })
}) satisfies LoaderFunction

/*
custom fetch handling is needed as supabase do not support async data fetching, only await is supported in their API
for query building reference see: https://github.com/supabase/postgrest-js/tree/f91aa2944f52da3aefc77a6712990731fff16252/src
*/
export const postsLoader = (async () => {
  let searchParams = new URLSearchParams({
    select: `id, content, type, source, createdAt:created_at, uid, active, modifiedAt:modified_at,
    ...users (
      displayName:display_name
    ),likes:post_likes(uid, ...users(displayName:display_name))`
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
    posts: fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts?${searchParams}`, {
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
    select: `id, content, type, source, createdAt:created_at, uid, active, modifiedAt:modified_at,
    ...users (
      displayName:display_name
    ),likes:post_likes(uid, ...users(displayName:display_name))`
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
    post: fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts?${searchParams}`, {
      method: "GET",
      headers: {
        Apikey: import.meta.env.VITE_SUPABASE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
        Accept: "application/vnd.pgrst.object+json" // .single() equivalent
      }
    }).then((res) => responseHandler(res))
  })
}) satisfies LoaderFunction
