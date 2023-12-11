import { Avatar, Card, CardHeader } from "@mui/material"
import { UserProfileInterface } from "../../types"
import { formatDateFromDatetime } from "../utils/formatDateFromDatetime"

const ProfileCard = ({ user }: { user: UserProfileInterface }) => {
  return (
    <Card aria-label="user">
      <CardHeader
        avatar={<Avatar>{user.displayName[0]}</Avatar>}
        title={user.displayName}
        titleTypographyProps={{ variant: "h4" }}
        subheader={`Created at: ${formatDateFromDatetime(
          user.createdAt
        )}, modified at: ${formatDateFromDatetime(user.modifiedAt)}`}
        subheaderTypographyProps={{ variant: "body2" }}
      />
    </Card>
  )
}

export default ProfileCard
