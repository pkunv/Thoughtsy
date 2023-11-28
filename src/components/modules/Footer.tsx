import { Grid, Paper } from "@mui/material"

const Footer = () => {
	return (
		<Grid container xs={12} sx={{ marginTop: "auto" }}>
			<Grid item xs={12}>
				<Paper sx={{ textAlign: "center" }}>Made with ❤️ by Kunv | {new Date().getFullYear()}</Paper>
			</Grid>
		</Grid>
	)
}

export default Footer
