import { Card, CardContent, CardActions, Button, Divider, Modal, CardHeader } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useEffect } from "react"

import { useFetcher } from "react-router-dom"
import { AppModalsState } from "../../types"

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

export default function PostDeleteModal({
  modalOpen,
  handleModalToggle,
  postId
}: {
  modalOpen: AppModalsState
  handleModalToggle: Function
  postId: number | null
}) {
  const toggleModal = () => {
    handleModalToggle("postDelete")
  }

  const fetcher = useFetcher({ key: "postDelete" })

  const submit = () => {
    fetcher.submit(
      { id: postId },
      {
        method: "delete",
        encType: "application/json",
        action: `/posts/${postId}`
      }
    )
  }

  useEffect(() => {
    if (fetcher.state === "loading" && fetcher.data.success) toggleModal()
  }, [fetcher])

  return (
    <Modal
      open={modalOpen.postDelete}
      onClose={toggleModal}
    >
      <Card sx={style}>
        <CardContent>
          <CardHeader
            title="Do you want to delete this post?"
            titleTypographyProps={{ align: "center", variant: "h4" }}
            sx={{ p: 0 }}
          />
        </CardContent>
        <CardActions>
          <Grid
            container
            item
            xs={12}
            justifyContent="flex-end"
          >
            <Divider sx={{ width: "100%", mt: 1, mb: 1 }}></Divider>
            <Button
              type="submit"
              color="error"
              onClick={submit}
            >
              Delete
            </Button>
            <Button
              type="button"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  )
}
