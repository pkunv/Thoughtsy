import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  TextField,
  Divider,
  Modal,
  Box,
  CardHeader
} from "@mui/material"
import Grid from "@mui/material/Grid"
import { useEffect, useRef } from "react"

import { Controller, FormProvider, set, useForm } from "react-hook-form"
import { useFetcher, useNavigate, useSubmit } from "react-router-dom"
import { AppModalsState, SignInFormValues } from "../../types"

const initialFormState = {
  email: "",
  password: "",
  captchaToken: ""
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "35%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  textAlign: "center",
  boxShadow: 24
}

export default function LoginModal({
  modalOpen,
  handleModalToggle
}: {
  modalOpen: AppModalsState
  handleModalToggle: Function
}) {
  const toggleModal = () => {
    handleModalToggle("login")
  }
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialFormState
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch
  } = methods
  const fetcher = useFetcher({ key: "login" })

  const submitForm = (data: SignInFormValues) => {
    fetcher.submit(data, {
      method: "post",
      encType: "application/json",
      action: "/login"
    })
  }

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.data.success) toggleModal()
  }, [fetcher])

  return (
    <FormProvider {...methods}>
      <Modal
        open={modalOpen.login}
        onClose={toggleModal}
      >
        <Card sx={style}>
          <fetcher.Form onSubmit={handleSubmit(submitForm)}>
            <CardContent>
              <CardHeader
                title="Log in"
                titleTypographyProps={{ align: "center", variant: "h4" }}
                sx={{ p: 0 }}
              />
              <Grid
                container
                item
                xs={12}
                spacing={2}
                p={2}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: { value: true, message: "Email address is required." },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "You need to provide proper email address."
                      }
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
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
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
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-end"
              >
                <Divider sx={{ width: "100%", mt: 1, mb: 1 }}></Divider>
                <Button type="submit">Login</Button>
                <Button
                  type="button"
                  onClick={toggleModal}
                >
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
