import { CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid"
import { Suspense } from "react"
import { Await, useLoaderData } from "react-router-dom"
import PostCard from "../modules/PostCard"

export default function Post() {
	const data = useLoaderData()
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
				<Await resolve={data.post}>{(data) => <PostCard post={data} />}</Await>
			</Suspense>
		</Grid>
	)
}
