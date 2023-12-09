import { Button, Grid } from "@mui/material"
import { useNavigate } from "react-router"
import { StyledLink } from "./StyledLink"

function FastNavButtons() {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      p={1}
    >
      <Grid item>
        <StyledLink to="/">
          <Button
            variant="contained"
            size="large"
          >
            Homepage
          </Button>
        </StyledLink>
      </Grid>
      <Grid item>
        <StyledLink to={".."}>
          <Button
            variant="contained"
            size="large"
          >
            🔙 Go back
          </Button>
        </StyledLink>
      </Grid>
    </Grid>
  )
}

export default FastNavButtons
