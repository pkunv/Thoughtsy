import { Stack } from "@mui/material"
import { useRouteLoaderData } from "react-router-typesafe"
import { userLoader } from "../../loaderFunctions"
import ProfileCard from "../modules/ProfileCard"

function Profile() {
  const { user } = useRouteLoaderData<typeof userLoader>("root")

  return (
    <Stack gap={2}>
      <ProfileCard user={user} />
    </Stack>
  )
}

export default Profile
