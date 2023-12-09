import { Card, CardHeader } from "@mui/material"
import { UserInterface } from "../../types"

const ProfileCard = ({ user }: { user: UserInterface }) => {
  return (
    <Card aria-label="user">
      <CardHeader
        avatar={user.displayName[0]}
        title={user.displayName}
        titleTypographyProps={{ variant: "h2" }}
        subheader={user.createdAt}
        subheaderTypographyProps={{ variant: "h3" }}
      />
    </Card>
  )
}

export default ProfileCard
