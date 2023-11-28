import { Button, IconButton, Toolbar, Typography, Box, AppBar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { StyledLink } from "./StyledLink"
import { useFetcher } from "react-router-dom"
import { NavItem } from "../../types"

const MainAppBar = ({
  navItems,
  toggleDrawer,
  handleModalToggle
}: {
  navItems: Array<NavItem>
  toggleDrawer: Function
  handleModalToggle: Function
}) => {
  const fetcher = useFetcher()

  return (
    <AppBar
      component="nav"
      position="sticky"
    >
      <Toolbar sx={{ ml: 4, mr: 4 }}>
        <IconButton
          onClick={() => {
            toggleDrawer()
          }}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h3"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Thoughtsy
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) =>
            item.type === "route" ? (
              <StyledLink
                to={item.path}
                key={item.key}
              >
                <Button
                  sx={{ ml: 1, mr: 1 }}
                  color="inherit"
                >
                  {item.name}
                </Button>
              </StyledLink>
            ) : (
              <Button
                onClick={() => {
                  if (item.type === "modal") handleModalToggle(item.key)
                  else if (item.type === "fetcher")
                    fetcher.submit("", { method: "post", action: item.path, fetcherKey: "logout" })
                }}
                key={item.key}
                sx={{ ml: 1, mr: 1 }}
                color="inherit"
              >
                {item.name}
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MainAppBar
