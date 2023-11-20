import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Divider,
	Grid,
	Typography,
} from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"

const PostCard = ({ post }) => {
	console.log(post)
	return (
		<Grid item key={post.id} role="post" xs={12}>
			<Card>
				<Box sx={{ display: "flex", m: 1, alignItems: "center" }}>
					<Avatar>{post.display_name[0]}</Avatar>
					<Typography color="text.secondary" p={2}>
						{post.display_name} | {post.created_at.replaceAll("T", " ").substr(0, 16)}
					</Typography>
				</Box>
				<CardContent>
					<Typography variant="subtitle1">{post.content}</Typography>
				</CardContent>
				<Divider />
				<CardActions>
					<Checkbox icon={<ThumbUpOffAltIcon />} checkedIcon={<ThumbUpAltIcon />} />
					<Typography variant="body2" color="text.secondary">
						{post.post_likes[0].count} likes
					</Typography>
				</CardActions>
			</Card>
		</Grid>
	)
}
export default PostCard
