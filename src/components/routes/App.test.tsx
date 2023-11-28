import { findByText, fireEvent, render, screen } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "../../routes"

test("app should render posts", async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ["/"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)

	var rows = await screen.findAllByRole("post")
	expect(rows.length > 0).toBeTruthy()
})

/*
test("should be able to click on modal", async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ["/"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)

	var modals = await screen.findAllByRole("modal-btn")
	var success = 1
	modals.forEach((modal) => {
		fireEvent(modal, new MouseEvent("click", { bubbles: true, cancelable: true }))
		var modal = screen.findAllByRole(//)
		expect(modal).not.toBeVisible()
	})
})
*/
