import { PostgrestError, createClient } from "@supabase/supabase-js"
import { ActionFunction } from "react-router-dom"
import { PostInterface, PostLikeActionParams, SignInFormValues, SignUpFormValues } from "./types"
import { supabase } from "./supabase"

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
    actionDescription,
    id
  }: {
    error: PostgrestError | null
    successMessage: string
    actionDescription: string
    id: number | null
  }) => {
    const message = !error
      ? successMessage
      : `There is a problem with your post ${actionDescription}: ${error.message}`
    return { success: !error, message, id }
  }

  var formData = (await request.json()) as PostInterface
  let successMessage,
    actionDescription = ""
  // returning response on every case is required since switch statement limits variable scope
  switch (request.method) {
    case "POST": {
      const { data, error } = await supabase
        .from("posts")
        .insert({ content: formData.content })
        .select("id")
        .single()
      actionDescription = "submition"
      successMessage = "You submitted your post successfully!"
      return actionResponse({ error, successMessage, actionDescription, id: data?.id })
    }
    // i use patch method since we update only one element of data (`posts`.`content`) according to RFC 5789 guidelines
    case "PATCH": {
      const { error } = await supabase
        .from("posts")
        .update({ content: formData.content })
        .eq("id", formData.id)
      actionDescription = "edit"
      successMessage = "You edited your post successfully!"
      return actionResponse({ error, successMessage, actionDescription, id: null })
    }
    case "DELETE": {
      const { error } = await supabase.from("posts").update({ active: 0 }).eq("id", formData.id)
      actionDescription = "deletion"
      successMessage = "You deleted your post successfully!"
      return actionResponse({ error, successMessage, actionDescription, id: null })
    }
  }
}) satisfies ActionFunction

export const postLikeAction = async ({
  request,
  params
}: {
  request: Request
  params: PostLikeActionParams
}) => {
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
      : `There is a problem with your like ${actionDescription}: ${error.message}`
    return { success: !error, message }
  }
  let successMessage,
    actionDescription = ""
  // returning response on every case is required since switch statement limits variable scope
  switch (request.method) {
    case "POST": {
      const { error } = await supabase.from("post_likes").insert({ post_id: params.postId })
      actionDescription = "submition"
      successMessage = "You liked this post!"
      return actionResponse({ error, successMessage, actionDescription })
    }
    case "DELETE": {
      // executing function that handles post like deletion for more safety
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", params.postId)
        .eq("uid", (await supabase.auth.getUser()).data.user?.id)
      actionDescription = "deletion"
      successMessage = "You unliked this post."
      return actionResponse({ error, successMessage, actionDescription })
    }
  }
}
