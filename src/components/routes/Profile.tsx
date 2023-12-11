import { CircularProgress, Stack } from "@mui/material"
import { Suspense } from "react"
import { Await, useLoaderData, useRouteLoaderData } from "react-router-typesafe"
import { userLoader, userProfileLoader } from "../../loaderFunctions"
import { UserProfileInterface } from "../../types"
import ProfileCard from "../modules/ProfileCard"

function Profile() {
  const { user } = useRouteLoaderData<typeof userLoader>("root")
  const data = useLoaderData<typeof userProfileLoader>()

  return (
    <Stack gap={2}>
      <Suspense fallback={<CircularProgress />}>
        <Await resolve={data.userProfile}>
          {(data) => {
            let userProfile = data as UserProfileInterface
            return <ProfileCard user={userProfile} />
          }}
        </Await>
      </Suspense>
    </Stack>
  )
}

export default Profile
