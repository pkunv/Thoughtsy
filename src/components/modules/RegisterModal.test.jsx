import { findByText, fireEvent, render, screen, within } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "../../routes"

test("user should be able to click on modal and exit it then", async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ["/"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)
	var modalBtn = await screen.findByRole("button", {
		name: /register/i,
	})

	fireEvent.click(modalBtn)

	var displayNameInput = await screen.findByPlaceholderText("Enter your display name here...")
	var emailInput = await screen.findByPlaceholderText("Enter your email here...")
	var passInput = await screen.findByPlaceholderText("Your password...")

	expect(displayNameInput).toBeVisible()
	expect(emailInput).toBeVisible()
	expect(passInput).toBeVisible()

	// leaving modal
	fireEvent.click(modalBtn)

	// should not be visible after leaving modal
	expect(emailInput).not.toBeVisible()
	expect(passInput).not.toBeVisible()
})

const signUpTest = async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ["/"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)
	var modalBtn = await screen.findByRole("button", {
		name: /register/i,
	})
	fireEvent.click(modalBtn)

	var emailInput = await screen.findByPlaceholderText("Enter your email here...")
	var displayNameInput = await screen.findByPlaceholderText("Enter your display name here...")
	var passInput = await screen.findByPlaceholderText("Your password...")
	var rePassInput = await screen.findByPlaceholderText("Your password again...")

	fireEvent.change(emailInput, { target: { value: import.meta.env.VITE_SUPABASE_SIGNUP_EMAIL } })
	fireEvent.change(displayNameInput, {
		target: { value: import.meta.env.VITE_SUPABASE_SIGNUP_DISPLAY_NAME },
	})
	fireEvent.change(passInput, { target: { value: import.meta.env.VITE_SUPABASE_SIGNUP_PASSWORD } })
	fireEvent.change(rePassInput, {
		target: { value: import.meta.env.VITE_SUPABASE_SIGNUP_PASSWORD },
	})
	fireEvent.click(await screen.findByRole("button", { name: "Register" }))

	expect(
		await screen.findByText(
			"You signed up successfully, we sent you an e-mail, please verify your account to login."
		)
	).toBeInTheDocument()
}
// although we are not testing signing up, vitest should notify us about skipped test hence the skip subfunction on a condition
if (import.meta.env.VITE_TEST_SIGN_UP === 1) {
	describe("Sign up test", () => {
		test("user should be able to sign up", signUpTest)
	})
} else {
	describe("Sign up test", () => {
		test.skip("user should be able to sign up", signUpTest)
	})
}
