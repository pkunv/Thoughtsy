import { expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers"
import { setupServer } from "msw/node"
import { HttpResponse, http } from "msw"
import { testPosts, testToken } from "./testData"

expect.extend(matchers)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const server = setupServer(
  http.all(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, ({ request, params, cookies }) => {
    switch (request.method) {
      case "POST":
        console.log(request.formData())
        return new Response(JSON.stringify(testToken), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      /*
      case "SETTINGS":
        return new Response(null,{status: 200, headers: {"Access-Control-Allow-Headers": "apikey,authorization,content-type,x-client-info"}}) // headers are not neccesary
      */
      default:
        return new Response(null, { status: 501 })
    }
  }),
  http.all(`${SUPABASE_URL}/rest/v1/posts`, ({ request, params, cookies }) => {
    switch (request.method) {
      case "GET":
        const urlParams = new URLSearchParams(request.url)

        // single post api call
        if (urlParams.get("id")) {
          let postId = parseInt(urlParams.get("id")!.split(".")[1] as string)
          return HttpResponse.json({
            ...testPosts.find((post) => post.id === postId)
          })
        }

        // multiple posts api call
        if (urlParams.get("active"))
          return HttpResponse.json(testPosts.filter((post) => post.active))
      default:
        return HttpResponse.error()
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
afterEach(cleanup)

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url)
})
