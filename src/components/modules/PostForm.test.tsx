import { findByText, fireEvent, render, screen, within } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "../../routes"
import PostForm from "./PostForm"

test("user should be able to see content input and submit button", async () => {
  render(<PostForm />)
  var contentInput = await screen.findByPlaceholderText("Post content...")
  var submitBtn = await screen.findByRole("button", {
    name: /submit/i
  })

  expect(contentInput).toBeVisible()
  expect(submitBtn).toBeVisible()
})
/*
test("user should be able to create a new post", async() => {
  const router = createMemoryRouter(routes, {
		initialEntries: ["/"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)
	var modalBtn = await screen.findByRole("button", {
		name: /log/i,
	})
	fireEvent.click(modalBtn)
	var emailInput = await screen.findByPlaceholderText("Enter your email here...")
	var passInput = await screen.findByPlaceholderText("Your password...")

	fireEvent.change(emailInput, { target: { value: import.meta.env.VITE_SUPABASE_TEST_EMAIL } })
	fireEvent.change(passInput, { target: { value: import.meta.env.VITE_SUPABASE_TEST_PASSWORD } })
	fireEvent.click(await screen.findByRole("button", { name: "Login" }))

	expect(await screen.findByText("You logged in successfully.")).toBeInTheDocument()
	expect(await screen.findByRole("link", { name: /feed/i })).toBeInTheDocument()

	// after logging in, modal should close
	expect(emailInput).not.toBeVisible()
	expect(passInput).not.toBeVisible()
})
*/
