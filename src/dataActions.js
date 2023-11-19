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

export const loginAction = async ({ params, request }) => {
	var requestData = await request.json()
	const { data, error } = await supabase.auth.signInWithPassword({
		email: requestData.email,
		password: requestData.password,
	})
	var message = !error
		? "You logged in successfully."
		: `There is a problem with logging in: ${error.message}`
	return { success: !error, message }
}
/*
custom fetch handling is needed as supabase do not support async data fetching, only await is supported
*/
export const postsLoader = async () => {
	let searchParams = new URLSearchParams({
		select: `id, content, type, source, created_at,
    ...users (
      display_name
    ),post_likes(count)`
			.replaceAll(/\n/g, "")
			.replaceAll(/\t/g, ""),
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
