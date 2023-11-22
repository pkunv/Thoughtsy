import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import { Controller, FormProvider, useForm } from "react-hook-form"

const initialFormState = {
	content: "",
}

const PostForm = ({ post }) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm({
		mode: "onChange",
		defaultValues: initialFormState,
	})

	const submitForm = (data) => {
		fetcher.submit(data, {
			method: "put",
			encType: "application/json",
			action: "/posts",
		})
	}

	return (
		<FormProvider
			{...{
				control,
				setValue,
				watch,
				formState: { errors },
			}}
		>
			<form onSubmit={handleSubmit(submitForm)}>
				<Grid item>
					<Card>
						<CardHeader
							title="Create a new post"
							titleTypographyProps={{ align: "center", variant: "h5" }}
							sx={{ p: 2 }}
						/>
						<Controller
							name="content"
							control={control}
							rules={{
								required: { value: true, message: "This field is required." },
								minLength: { value: 3, message: "Post should be at least 3 characters long." },
							}}
							render={({ field }) => (
								<TextField
									{...field}
									variant="standard"
									placeholder="Post content..."
									helperText={errors?.content?.message}
									error={errors?.name}
									fullWidth
									sx={{ p: 2 }}
								/>
							)}
						/>

						<CardActions>
							<Grid container item xs={12} justifyContent="flex-end">
								<Divider sx={{ width: "100%", mt: 1, mb: 1 }}></Divider>
								<Button type="submit">Submit</Button>
							</Grid>
						</CardActions>
					</Card>
				</Grid>
			</form>
		</FormProvider>
	)
}
export default PostForm
