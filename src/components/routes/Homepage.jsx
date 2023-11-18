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
import { Await, Link, useLoaderData, useOutletContext } from "react-router-dom"
import PostCard from "../modules/PostCard"

export default function Homepage() {
	const data = useLoaderData()

	var guestActions = (
		<Link to="/register">
			<Button size="small">Register</Button>
		</Link>
	)
	var userActions = (
		<Link to="/create">
			<Button size="small">Add your thought!</Button>
		</Link>
	)

	return (
		<Grid container direction="column" p={2} justifyContent="center">
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
			<Grid
				container
				spacing={2}
				p={2}
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Suspense fallback={<CircularProgress />}>
					<Await resolve={data.posts}>
						{(data) => data.map((post, index) => <PostCard key={index} post={post} />)}
					</Await>
				</Suspense>
			</Grid>
		</Grid>
	)
}
