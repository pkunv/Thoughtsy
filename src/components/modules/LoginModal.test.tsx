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
		name: /log/i,
	})

	fireEvent.click(modalBtn)

	var emailInput = await screen.findByPlaceholderText("Enter your email here...")
	var passInput = await screen.findByPlaceholderText("Your password...")

	expect(emailInput).toBeVisible()
	expect(passInput).toBeVisible()

	// leaving modal
	fireEvent.click(modalBtn)

	// should not be visible after leaving modal
	expect(emailInput).not.toBeVisible()
	expect(passInput).not.toBeVisible()
})

test("user should not be able to submit on invalid inputs and see errors", async () => {
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

	fireEvent.change(emailInput, { target: { value: "" } })
	fireEvent.change(passInput, { target: { value: "" } })
	fireEvent.click(await screen.findByRole("button", { name: "Login" }))

	expect(await screen.findByText("Email address is required.")).toBeInTheDocument()
	expect(await screen.findByText("Password is required.")).toBeInTheDocument()

	fireEvent.change(emailInput, { target: { value: "invalid" } })
	fireEvent.click(await screen.findByRole("button", { name: "Login" }))

	expect(await screen.findByText("You need to provide proper email address.")).toBeInTheDocument()
})

test("user should be able to log in successfully", async () => {
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
