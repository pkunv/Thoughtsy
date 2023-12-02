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
import { PostFormValues, PostInterface } from "../../types"
import { useFetcher, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const initialFormState = {
  content: ""
}

const PostForm = ({ post }: { post: PostInterface | null | undefined }) => {
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
  const editing = !!post
  const fetcher = useFetcher({ key: !editing ? "postCreate" : "postUpdate" })

  const navigate = useNavigate()

  const submitForm: SubmitHandler<PostFormValues> = (data) => {
    fetcher.submit(data, {
      method: editing ? "patch" : "post",
      encType: "application/json",
      action: editing ? `/posts/${post.id}` : "/posts/new"
    })
  }

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.data?.success && !editing) {
      methods.reset()
      navigate(`/posts/${fetcher.data?.id}`)
    }
  }, [fetcher])

  useEffect(() => {
    if (editing) reset({ ...post })
  }, [methods.reset])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid item>
          <Card>
            <CardHeader
              title={editing ? "Edit this post" : "Create a new post"}
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
