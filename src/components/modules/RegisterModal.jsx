import {
	Card,
	Typography,
	CardContent,
	CardActions,
	Button,
	TextField,
	Divider,
	Modal,
	CardHeader,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import { useEffect } from "react"

import { Controller, FormProvider, useForm } from "react-hook-form"
import { useFetcher } from "react-router-dom"

const initialFormState = {
	email: "",
	display_name: "",
	password: "",
	repassword: "",
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "35%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	textAlign: "center",
	boxShadow: 24,
}

export default function RegisterModal({ modalOpen, handleModalToggle }) {
	const toggleModal = () => {
		handleModalToggle("register")
	}
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
	const fetcher = useFetcher({ key: "register" })

	const submitForm = (data) => {
		fetcher.submit(data, {
			method: "post",
			encType: "application/json",
			action: "/register",
		})
	}

	useEffect(() => {
		if (fetcher.state === "loading" && fetcher.data.success) toggleModal()
	}, [fetcher])

	return (
		<FormProvider
			{...{
				control,
				setValue,
				watch,
				formState: { errors },
			}}
		>
			<Modal open={modalOpen.register} onClose={toggleModal}>
				<Card sx={style}>
					<fetcher.Form onSubmit={handleSubmit(submitForm)}>
						<CardContent>
							<CardHeader
								title="Register"
								titleTypographyProps={{ align: "center", variant: "h4" }}
								sx={{ p: 0 }}
							/>
							<Grid container item xs={12} spacing={2} p={2}>
								<Grid item xs={12}>
									<Controller
										name="email"
										control={control}
										rules={{
											required: { value: true, message: "Email address is required." },
											pattern: {
												value:
													/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: "You need to provide proper email address.",
											},
										}}
										render={({ field }) => (
											<TextField
												{...field}
												label="Email Address"
												placeholder="Enter your email here..."
												name="email"
												autoComplete="email"
												fullWidth
												autoFocus
												error={errors?.email}
												helperText={errors?.email?.message}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="display_name"
										control={control}
										rules={{
											required: { value: true, message: "Display name is required." },
										}}
										render={({ field }) => (
											<TextField
												{...field}
												label="Display name"
												placeholder="Enter your display name here..."
												name="display_name"
												autoComplete="display_name"
												fullWidth
												autoFocus
												error={errors?.display_name}
												helperText={errors?.display_name?.message}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="password"
										control={control}
										rules={{ required: { value: true, message: "Password is required." } }}
										render={({ field }) => (
											<TextField
												{...field}
												label="Password"
												placeholder="Your password..."
												name="password"
												autoComplete="password"
												type="password"
												fullWidth
												error={errors?.password}
												helperText={errors?.password?.message}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Controller
										name="repassword"
										control={control}
										rules={{
											required: { value: true, message: "Password is required." },
											validate: (value, formValues) =>
												value === formValues.password || "Passwords need to be the same.", // validate re-entered password
										}}
										render={({ field }) => (
											<TextField
												{...field}
												label="Re-enter your password"
												placeholder="Your password again..."
												name="repassword"
												autoComplete="repassword"
												type="password"
												fullWidth
												error={errors?.repassword}
												helperText={errors?.repassword?.message}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions>
							<Grid container item xs={12} justifyContent="flex-end">
								<Divider sx={{ width: "100%", mt: 1, mb: 1 }}></Divider>
								<Button type="submit">Register</Button>
								<Button type="button" onClick={toggleModal}>
									Close
								</Button>
							</Grid>
						</CardActions>
					</fetcher.Form>
				</Card>
			</Modal>
		</FormProvider>
	)
}
