import { defer, json, redirect, useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(import.meta.env.VITE_SUPABASE_SITE, import.meta.env.VITE_SUPABASE_KEY)

export const userLoader = async () => {
	return json({ ...(await supabase.auth.getUser()).data })
}

export const logoutAction = async ({ params, request }) => {
	const { error } = await supabase.auth.signOut()
	var message = !error
		? "You logged out successfully."
		: `There is a problem with logging out: ${error.message}`
	return { success: !error, message }
}

export const registerAction = async ({ params, request }) => {
	var requestData = await request.json()
	const { data, error: signUpError } = await supabase.auth.signUp({
		email: requestData.email,
		password: requestData.password,
	})
	const { error: updatingError } = await supabase
		.from("users")
		.update({ display_name: requestData.display_name })
		.eq("uid", data.user.id)

	var message =
		!signUpError && !updatingError
			? "You signed up successfully, we sent you an e-mail, please verify your account to login."
			: `There is a problem with signing up: ${signUpError.message ?? updatingError.message ?? ""}`
	return { success: !signUpError && !updatingError, message }
}

export const loginAction = async ({ params, request }) => {
	var formData = await request.json()
	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	})
	var message = !error
		? "You logged in successfully."
		: `There is a problem with logging in: ${error.message}`
	return { success: !error, message }
}

export const postAction = async ({ request, params }) => {
	const response = ({ error, successMessage, actionDescription }) => {
		message = !error
			? successMessage
			: `There is a problem with your post ${actionDescription}: ${error.message}`
		return { success: !error, message }
	}

	var formData = await request.json()
	let successMessage,
		actionDescription = ""
	// returning response on every case is required since switch statement limits variable scope
	switch (request.method) {
		case "POST": {
			const { error } = await supabase.from("posts").insert({ content: formData.content })
			actionDescription = "submition"
			successMessage = "You submitted your post successfully!"
			return response({ error, successMessage, actionDescription })
		}
		// i use patch method since we update only one element of data (`posts`.`content`) according to RFC 5789 guidelines
		case "PATCH": {
			const { error } = await supabase.from("posts").update({ content: formData.content })
			actionDescription = "edit"
			successMessage = "You edited your post successfully!"
			return response({ error, successMessage, actionDescription })
		}
		case "DELETE": {
			const { error } = await supabase.from("posts").update({ active: 0 }).eq("id", formData.id)
			actionDescription = "deletion"
			successMessage = "You deleted your post successfully!"
			return response({ error, successMessage, actionDescription })
		}
	}
}

/*
custom fetch handling is needed as supabase do not support async data fetching, only await is supported in API
*/
export const postsLoader = async () => {
	let searchParams = new URLSearchParams({
		select: `id, content, type, source, created_at,
    ...users (
      display_name
    ),post_likes(count)`
			.replaceAll(/\n/g, "")
			.replaceAll(/\t/g, ""),
		active: `eq.1`, // we want only active posts in feed, although accessing deleted posts should be enabled as in Twitter for example
	})

	return defer({
		posts: fetch(`${import.meta.env.VITE_SUPABASE_SITE}/rest/v1/posts?${searchParams}`, {
			method: "GET",
			headers: {
				Apikey: import.meta.env.VITE_SUPABASE_KEY,
				Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
			},
		}).then((res) => {
			return res.json()
		}),
	})
}

export const postLoader = async ({ params, request }) => {
	let searchParams = new URLSearchParams({
		select: `id, content, type, source, created_at,
    ...users (
      display_name
    ),post_likes(count)`
			.replaceAll(/\n/g, "")
			.replaceAll(/\t/g, ""),
		id: `eq.${params.postId}`,
	})

	return defer({
		post: fetch(`${import.meta.env.VITE_SUPABASE_SITE}/rest/v1/posts?${searchParams}`, {
			method: "GET",
			headers: {
				Apikey: import.meta.env.VITE_SUPABASE_KEY,
				Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
			},
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				return data[0]
			}),
	})
}
