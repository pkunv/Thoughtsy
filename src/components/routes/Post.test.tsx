import { findByText, fireEvent, render, screen } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "../../routes"

test("post should be in the document and visible", async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ["/posts/1"],
		initialIndex: 1,
	})

	render(<RouterProvider router={router} />)

	var post = await screen.findByRole("post")
	expect(post).toBeInTheDocument()
	expect(post).toBeVisible()
})
