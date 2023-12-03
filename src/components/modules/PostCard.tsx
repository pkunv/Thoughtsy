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
import { ContextType, PostInterface } from "../../types"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useRouteLoaderData } from "react-router-typesafe"
import { userLoader } from "../../loaderFunctions"
import React from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { StyledLink } from "./StyledLink"
import { useFetcher, useOutletContext } from "react-router-dom"

const PostCard = ({ post, settingsMenu }: { post: PostInterface; settingsMenu: boolean }) => {
  const { handleModalToggle, setPostDeleteId } = useOutletContext<ContextType>()

  const { user } = useRouteLoaderData<typeof userLoader>("root")
  const fetcher = useFetcher({ key: "postLikeDelete" })
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const userLiked = post.likes.find((like) => user?.id === like.uid)

  const likeFetcher = () => {
    fetcher.submit(null, {
      method: !userLiked ? "post" : "delete",
      encType: "application/json",
      action: `/posts/${post.id}/like`
    })
  }

  return (
    <>
      <Card
        sx={{ width: 1 }}
        aria-label="post"
      >
        <CardHeader
          avatar={<Avatar>{post.displayName[0]}</Avatar>}
          title={post.displayName}
          subheader={
            post.createdAt.replaceAll("T", " ").substr(0, 16) +
            (post.modifiedAt !== null
              ? ` | Modified: ${post.modifiedAt.replaceAll("T", " ").substr(0, 16)}`
              : "")
          }
          aria-label="post-header"
          action={
            user?.id === post.uid && !settingsMenu ? (
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
            checked={!!userLiked}
            onChange={likeFetcher}
          />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {post.likes.length} like{post.likes.length == 1 ? "" : "s"}
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
          <StyledLink to={`/posts/${post.id}`}>
            <EditIcon fontSize="small" />
            Edit
          </StyledLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleModalToggle("postDelete")
            setPostDeleteId(post.id)
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
export default PostCard
