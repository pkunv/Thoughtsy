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
  Typography
} from "@mui/material"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { PostFormValues } from "../../types"
import { useFetcher } from "react-router-dom"

const initialFormState = {
  content: ""
}

const PostForm = () => {
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
  const fetcher = useFetcher({ key: "post" })

  const submitForm: SubmitHandler<PostFormValues> = (data) => {
    fetcher.submit(data, {
      method: "post",
      encType: "application/json",
      action: "/posts/new"
    })
  }

  return (
    <FormProvider {...methods}>
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
                minLength: { value: 3, message: "Post should be at least 3 characters long." }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Post content..."
                  helperText={errors?.content?.message}
                  error={!!errors?.content}
                  fullWidth
                  sx={{ p: 2 }}
                />
              )}
            />

            <CardActions>
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-end"
              >
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
