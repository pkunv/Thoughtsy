import CloseIcon from "@mui/icons-material/Close"
import { Box, Container, CssBaseline, IconButton } from "@mui/material"
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Outlet, useFetchers, useLocation, useNavigate, useResolvedPath } from "react-router-dom"
import { useLoaderData } from "react-router-typesafe"
import { userLoader } from "../../loaderFunctions"
import { routesInfo } from "../../routesInfo"
import type { ContextType } from "../../types"
import { AccessabilityTypes, AppModalsState, NavItem } from "../../types"
import { useDocumentTitle } from "../hooks/useDocumentTitle"
import FastNavButtons from "../modules/FastNavButtons"
import Footer from "../modules/Footer"
import LoginModal from "../modules/LoginModal"
import MainAppBar from "../modules/MainAppBar"
import MainDrawer from "../modules/MainDrawer"
import DeletePostModal from "../modules/PostDeleteModal"
import RegisterModal from "../modules/RegisterModal"

const App = () => {
  const { user } = useLoaderData<typeof userLoader>()
  let fetchers = useFetchers()
  let documentTitle = useDocumentTitle()

  // useResolvedPath accepts empty "To" parameter as current location
  // @ts-ignore
  const resolvedPath = useResolvedPath()
  const navigate = useNavigate()
  let location = useLocation()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [postDeleteId, setPostDeleteId] = useState(null)

  // initializing nav items
  const accessabilityType = user ? AccessabilityTypes.User : AccessabilityTypes.Public
  const [navItems, setNavItems] = useState(
    routesInfo.filter((route) => route.accessableFor.includes(accessabilityType) && route.navItem)
  )

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

  // user interactions snackbar fetchers
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
    setNavItems(
      routesInfo.filter((route) => route.accessableFor.includes(accessabilityType) && route.navItem)
    )
  }, [user])

  // modal routes initialization
  useEffect(() => {
    let modalNavItem = navItems.find(
      (navItem) => navItem.path === resolvedPath.pathname && navItem.type === "modal"
    )
    if (modalNavItem) handleModalToggle(modalNavItem.key)
  }, [resolvedPath])

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
        {location?.pathname !== "/" ? <FastNavButtons /> : null}
        <Outlet context={{ setPostDeleteId, handleModalToggle } satisfies ContextType} />
      </Container>
      <Footer />
    </Box>
  )
}

export default App
