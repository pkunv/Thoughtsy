import {
  Card,
  Typography,
  CardContent,
  CircularProgress,
  CardActions,
  CardHeader,
  Checkbox,
  Divider
} from "@mui/material"
import Grid from "@mui/material/Grid"
import { Suspense } from "react"
import PostCard from "../modules/PostCard"
import PostForm from "../modules/PostForm"
import { postsLoader, userLoader } from "../../dataActions"
import { useRouteLoaderData, useLoaderData, Await } from "react-router-typesafe"
import { PostInterface } from "../../types"

export default function Homepage() {
  const data = useLoaderData<typeof postsLoader>()
  const { user } = useRouteLoaderData<typeof userLoader>("root")
  return (
    <Grid
      container
      direction="column"
      p={2}
      gap={2}
      columnGap={2}
      justifyContent="center"
      alignItems="center"
      columns={12}
    >
      <Grid
        item
        xs={8}
      >
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3">Welcome to Thoughtsy!</Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2 }}
            >
              With this website you can share your best words of wisdom with other users.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {user ? <PostForm /> : null}

      <Suspense fallback={<CircularProgress />}>
        <Await resolve={data.posts}>
          {(data) =>
            (data as Array<PostInterface>).map((post, index) => (
              <PostCard
                key={index}
                post={post as PostInterface}
              />
            ))
          }
        </Await>
      </Suspense>
    </Grid>
  )
}
