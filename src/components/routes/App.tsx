import { useEffect, useState } from "react"
import { Box, Container, CssBaseline, IconButton } from "@mui/material"
import {
  Outlet,
  To,
  useFetchers,
  useNavigate,
  useNavigation,
  useResolvedPath
} from "react-router-dom"
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack"
import MainAppBar from "../modules/MainAppBar"
import MainDrawer from "../modules/MainDrawer"
import Footer from "../modules/Footer"
import LoginModal from "../modules/LoginModal"
import CloseIcon from "@mui/icons-material/Close"
import { navItemsGuest, navItemsUser } from "../../navItems"
import RegisterModal from "../modules/RegisterModal"

import { AppModalsState, NavItem } from "../../types"
import type { ContextType } from "../../types"
import { useLoaderData } from "react-router-typesafe"
import { userLoader } from "../../dataActions"

import DeletePostModal from "../modules/PostDeleteModal"

const App = () => {
  const { user } = useLoaderData<typeof userLoader>()
  let fetchers = useFetchers()
  // useResolvedPath accepts empty "To" parameter as current location
  // @ts-ignore
  const resolvedPath = useResolvedPath()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [postDeleteId, setPostDeleteId] = useState(null)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const [modalOpen, setModalOpen] = useState<AppModalsState>({
    login: false,
    register: false,
    postDelete: false
  })
  const handleModalToggle = (key: string) => {
    let modalRoute = navItems.find((navItem) => navItem.key === key) as NavItem

    if (!modalOpen[key as keyof AppModalsState])
      // ts ignore is required as compiler does not recognize Window object
      // @ts-ignore
      window.history.replaceState(null, modalRoute?.name, modalRoute?.path)
    else if (resolvedPath.pathname === "/") navigate("/") // navigate to homepage if pathname is root
    setModalOpen({
      ...modalOpen,
      [key]: !modalOpen[key as keyof AppModalsState]
    })
  }
  // action snackbar fetchers
  useEffect(() => {
    var userFetchers = fetchers.filter((fetcher) => {
      return fetcher.key == "login" || "logout"
    })
    userFetchers.forEach((userFetcher) => {
      if (userFetcher?.state == "loading") {
        enqueueSnackbar(userFetcher?.data?.message, {
          variant: userFetcher?.data?.success ? "success" : "error",
          preventDuplicate: true,
          autoHideDuration: userFetcher?.data?.success ? 2000 : 5000
        })
      }
    })
  }, [fetchers])

  // nav items usestate according to user state
  useEffect(() => {
    setNavItems(user ? navItemsUser : navItemsGuest)
  }, [user])

  // modal routes initialization
  useEffect(() => {
    let modalNavItem = navItems.find(
      (navItem) => navItem.path === resolvedPath.pathname && navItem.type === "modal"
    )
    if (modalNavItem) handleModalToggle(modalNavItem.key)
  }, [resolvedPath])

  const [navItems, setNavItems] = useState(user ? navItemsUser : navItemsGuest)

  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      alignItems="center"
    >
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1500}
        action={(snackbarId) => (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        )}
      ></SnackbarProvider>
      <LoginModal
        modalOpen={modalOpen}
        handleModalToggle={handleModalToggle}
      />
      <RegisterModal
        modalOpen={modalOpen}
        handleModalToggle={handleModalToggle}
      />
      <DeletePostModal
        modalOpen={modalOpen}
        handleModalToggle={handleModalToggle}
        postId={postDeleteId}
      />
      <MainDrawer
        navItems={navItems}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        handleModalToggle={handleModalToggle}
      />
      <MainAppBar
        navItems={navItems}
        toggleDrawer={toggleDrawer}
        handleModalToggle={handleModalToggle}
      />
      <Container
        maxWidth="sm"
        sx={{ p: 2 }}
      >
        <Outlet context={{ setPostDeleteId, handleModalToggle } satisfies ContextType} />
      </Container>
      <Footer />
    </Box>
  )
}

export default App
