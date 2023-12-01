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
  Menu,
  MenuItem,
  Typography
} from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import { PostInterface } from "../../types"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useRouteLoaderData } from "react-router-typesafe"
import { userLoader } from "../../dataActions"
import React from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const PostCard = ({ post }: { post: PostInterface }) => {
  const { user } = useRouteLoaderData<typeof userLoader>("root")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card sx={{ width: 1 }}>
        <CardHeader
          avatar={<Avatar>{post.displayName[0]}</Avatar>}
          title={post.displayName}
          subheader={post.createdAt.replaceAll("T", " ").substr(0, 16)}
          aria-label="post"
          action={
            user?.id === post.uid ? (
              <IconButton
                aria-label="post-settings"
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "post-settings" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon />
              </IconButton>
            ) : null
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
      <Menu
        anchorEl={anchorEl}
        id="post-settings"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <EditIcon fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon fontSize="small" /> Delete
        </MenuItem>
      </Menu>
    </>
  )
}
export default PostCard
