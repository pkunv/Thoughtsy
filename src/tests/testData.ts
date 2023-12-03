import { User } from "@supabase/supabase-js"
import { PostInterface } from "../types"

export let testUser: User = {
  id: "testUuid",
  email: "test@test.com",
  app_metadata: { provider: "test" },
  created_at: "2023-11-16 12:11:23.5638+00",
  user_metadata: { test: "test" },
  aud: "test"
}

export let testToken = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsImtpZCI6IlRVRkQ1N1pjUHJmbXlCN3UiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzAxNjAwNjMzLCJpYXQiOjE3MDE1OTcwMzMsImlzcyI6Imh0dHBzOi8vY2dtaGR5ZWttbGN2c3Fqc3RxdWUuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImZkN2JkZTY1LWMwZjgtNDAxMC04YTZlLWNjMDAwMzU5MTIzMiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzAxNTk3MDMzfV0sInNlc3Npb25faWQiOiJjMTMxNzBlNS0xMTJhLTQ5YTAtYThjZS02MzY1NDc3OGI1MjQifQ.7srGelR2ig30tlc4ajZGc8SUZvf2EHbfvvaceyFimg4",
  token_type: "bearer",
  expires_in: 3600,
  expires_at: 1701600633,
  refresh_token: "8ogXrVXg2-fRqnK1qOzykQ",
  user: {
    id: "fd7bde65-c0f8-4010-8a6e-cc0003591232",
    aud: "authenticated",
    role: "authenticated",
    email: "test@test.com",
    email_confirmed_at: "2023-11-17T07:18:46.166279Z",
    phone: "",
    confirmed_at: "2023-11-17T07:18:46.166279Z",
    last_sign_in_at: "2023-12-03T09:50:33.592096896Z",
    app_metadata: {
      provider: "email",
      providers: ["email"]
    },
    user_metadata: {},
    identities: [
      {
        id: "fd7bde65-c0f8-4010-8a6e-cc0003591232",
        user_id: "fd7bde65-c0f8-4010-8a6e-cc0003591232",
        identity_data: {
          email: "test@test.com",
          email_verified: false,
          phone_verified: false,
          sub: "fd7bde65-c0f8-4010-8a6e-cc0003591232"
        },
        provider: "email",
        last_sign_in_at: "2023-11-17T07:18:46.1642Z",
        created_at: "2023-11-17T07:18:46.16424Z",
        updated_at: "2023-11-17T07:18:46.16424Z"
      }
    ],
    created_at: "2023-11-17T07:18:46.163091Z",
    updated_at: "2023-12-03T09:50:33.59472Z"
  }
}

export let testPosts: Array<PostInterface> = [
  {
    id: 1,
    content: "test post",
    createdAt: "2023-11-16 12:11:23.5638+00",
    modifiedAt: null,
    displayName: "testUser",
    likes: [{ uid: "testUuid", displayName: "testUser" }],
    uid: "testUuid",
    active: true
  },
  {
    id: 2,
    content: "test post 2",
    createdAt: "2023-11-16 12:11:23.5638+00",
    modifiedAt: "2023-12-02 17:33:56.103514+00",
    displayName: "testUser2",
    likes: [{ uid: "testUuid", displayName: "testUser" }],
    uid: "testUuid2",
    active: true
  },
  {
    id: 3,
    content: "test post 3",
    createdAt: "2023-11-16 12:11:23.5638+00",
    modifiedAt: null,
    displayName: "testUser2",
    likes: [{ uid: "testUuid2", displayName: "testUser2" }],
    uid: "testUuid",
    active: false
  }
]
