import { CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid"
import { Suspense } from "react"
import PostCard from "../modules/PostCard"
import { useLoaderData, Await } from "react-router-typesafe"
import { postLoader } from "../../dataActions"
import { PostInterface } from "../../types"

export default function Post() {
  const data = useLoaderData<typeof postLoader>()
  return (
    <Grid
      container
      spacing={2}
      p={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Suspense fallback={<CircularProgress />}>
        <Await resolve={data.post}>{(data) => <PostCard post={data as PostInterface} />}</Await>
      </Suspense>
    </Grid>
  )
}
