import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
	Divider,
	CircularProgress,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import { Suspense } from "react"
import { Await, Link, useLoaderData, useOutletContext, useRouteLoaderData } from "react-router-dom"
import PostCard from "../modules/PostCard"
import PostForm from "../modules/PostForm"

export default function Homepage() {
	const data = useLoaderData()
	const { user } = useRouteLoaderData("root")
	return (
		<Grid container direction="column" p={2} xs={6} gap={2} justifyContent="center">
			<Grid item xs={8}>
				<Card>
					<CardContent sx={{ textAlign: "center" }}>
						<Typography variant="h3">Welcome to Thoughtsy!</Typography>
						<Typography variant="body2" sx={{ mt: 2 }}>
							With this website you can share your best words of wisdom with other users.
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			{user ? <PostForm /> : null}
			<Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
				<Suspense fallback={<CircularProgress />}>
					<Await resolve={data.posts}>
						{(data) => data.map((post, index) => <PostCard key={index} post={post} />)}
					</Await>
				</Suspense>
			</Grid>
		</Grid>
	)
}
