import { fireEvent, render, screen } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "../../routes"

const router = createMemoryRouter(routes, {
  initialEntries: ["/posts/new"],
  initialIndex: 1
})

test("user should be able to see content input and submit button", async () => {
  render(<RouterProvider router={router} />)
  var contentInput = await screen.findByPlaceholderText("Post content...")
  var submitBtn = await screen.findByRole("button", {
    name: /submit/i
  })

  expect(contentInput).toBeVisible()
  expect(submitBtn).toBeVisible()
})

test("user should see error text that post content length must be at least 3 chars long", async () => {
  render(<RouterProvider router={router} />)
  var contentInput = await screen.findByPlaceholderText("Post content...")

  fireEvent.change(contentInput, { target: { value: "ab" } })

  expect(await screen.findByText(/at least 3 characters long/i)).toBeVisible()
})
