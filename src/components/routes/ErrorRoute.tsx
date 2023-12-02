import { useRouteError, isRouteErrorResponse } from "react-router"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { StyledLink } from "../modules/StyledLink"
import { Button } from "@mui/material"

const color = red[500]

export default function ErrorRoute() {
  const error: unknown = useRouteError()
  console.log(error)
  return (
    <Box textAlign="center">
      <Typography
        variant="h2"
        sx={{ color }}
      >
        Oops! We got a problem! An unexpected error has occured.
      </Typography>
      <Typography variant="h5">
        {isRouteErrorResponse(error) ? error.statusText : "Unknown error message"}
      </Typography>
      <StyledLink to="/">
        <Button>Back to homepage</Button>
      </StyledLink>
    </Box>
  )
}
