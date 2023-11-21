import { useEffect, useState } from "react"
import { Box, CssBaseline, IconButton } from "@mui/material"
import {
	Outlet,
	redirect,
	useFetcher,
	useFetchers,
	useLoaderData,
	useNavigate,
	useNavigation,
	useRevalidator,
	useSubmit,
} from "react-router-dom"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import MainAppBar from "../modules/MainAppBar"
import MainDrawer from "../modules/MainDrawer"
import Footer from "../modules/Footer"
import LoginModal from "../modules/LoginModal"
import CloseIcon from "@mui/icons-material/Close"
import { navItemsGuest, navItemsUser } from "../../navItems"
import RegisterModal from "../modules/RegisterModal"

const App = () => {
	const { user } = useLoaderData()
	let fetchers = useFetchers()

	const [drawerOpen, setDrawerOpen] = useState(false)
	const drawerToggle = () => setDrawerOpen(!drawerOpen)
	const [modalOpen, setModalOpen] = useState({
		login: false,
		register: false,
		deleteThought: false,
	})
	const handleModalToggle = (key) => {
		setModalOpen({
			...modalOpen,
			[key]: !modalOpen[key],
		})
	}
	useEffect(() => {
		var userFetchers = fetchers.filter((fetcher) => {
			return fetcher.key == "login" || "logout"
		})
		userFetchers.forEach((userFetcher) => {
			if (userFetcher?.state == "loading") {
				enqueueSnackbar(userFetcher?.data?.message, {
					variant: userFetcher?.data?.success ? "success" : "error",
					preventDuplicate: true,
				})
			}
		})
	}, [fetchers])
	useEffect(() => {
		var userFetchers = fetchers.filter((fetcher) => {
			return fetcher.key == "register"
		})
		userFetchers.forEach((userFetcher) => {
			if (userFetcher?.state == "loading") {
				enqueueSnackbar(userFetcher?.data?.message, {
					variant: userFetcher?.data?.success ? "success" : "error",
					preventDuplicate: true,
				})
			}
		})
	}, [fetchers])
	useEffect(() => {
		setNavItems(user ? navItemsUser : navItemsGuest)
	}, [user])

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
			<LoginModal modalOpen={modalOpen} handleModalToggle={handleModalToggle} />
			<RegisterModal modalOpen={modalOpen} handleModalToggle={handleModalToggle} />
			<MainDrawer
				navItems={navItems}
				drawerToggle={drawerToggle}
				drawerOpen={drawerOpen}
				handleModalToggle={handleModalToggle}
			/>
			<MainAppBar
				navItems={navItems}
				drawerToggle={drawerToggle}
				handleModalToggle={handleModalToggle}
			/>
			<Outlet />
			<Footer />
		</Box>
	)
}

export default App
