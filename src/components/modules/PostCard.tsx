import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import { PostInterface } from "../../types"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const PostCard = ({ post }: { post: PostInterface }) => {
  return (
    <Grid
      item
      key={post.id}
      role="post"
      xs={12}
    >
      <Card sx={{ width: 1 }}>
        <CardHeader
          avatar={<Avatar>{post.displayName[0]}</Avatar>}
          title={post.displayName}
          subheader={post.createdAt.replaceAll("T", " ").substr(0, 16)}
          aria-label="post"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="subtitle1">{post.content}</Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Checkbox
            icon={<ThumbUpOffAltIcon />}
            checkedIcon={<ThumbUpAltIcon />}
          />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {post.postLikes[0].count} likes
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default PostCard
