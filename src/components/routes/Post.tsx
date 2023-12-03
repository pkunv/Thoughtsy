import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { Suspense } from "react"
import PostCard from "../modules/PostCard"
import { useLoaderData, Await, useRouteLoaderData } from "react-router-typesafe"
import { PostInterface } from "../../types"
import PostForm from "../modules/PostForm"
import { useOutletContext } from "react-router-dom"
import { ContextType } from "../../types"
import { postLoader, userLoader } from "../../loaderFunctions"

export default function Post() {
  const { handleModalToggle, setPostDeleteId } = useOutletContext<ContextType>()

  const data = useLoaderData<typeof postLoader>()
  const { user } = useRouteLoaderData<typeof userLoader>("root")
  const deletedPostInformation = (
    <Typography textAlign="center">This post has been deleted.</Typography>
  )

  return (
    <Suspense fallback={<CircularProgress />}>
      <Await resolve={data.post}>
        {(data) => {
          let post = data as PostInterface
          return user?.id === post.uid ? (
            <Stack gap={2}>
              <PostCard
                post={post}
                settingsMenu={true}
              />

              {post.active ? (
                <>
                  <PostForm post={post} />
                  <Box textAlign="center">
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        handleModalToggle("postDelete")
                        setPostDeleteId(post.id)
                      }}
                    >
                      Delete this post
                    </Button>
                  </Box>
                </>
              ) : (
                deletedPostInformation
              )}
            </Stack>
          ) : (
            <>
              <PostCard
                post={post}
                settingsMenu={false}
              />
              {post.active ? null : deletedPostInformation}
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}
