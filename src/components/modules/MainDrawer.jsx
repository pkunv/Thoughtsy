import {
	Divider,
	Drawer,
	Typography,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material"

const MainDrawer = ({ navItems, drawerOpen, toggleDrawer, handleModalToggle }) => {
	return (
		<Drawer
			variant="temporary"
			open={drawerOpen}
			onClose={toggleDrawer}
			ModalProps={{ keepMounted: true }}
			sx={{ display: { xs: "block", sm: "none" } }}
		>
			<Box onClick={toggleDrawer}>
				<Typography variant="h3">Thoughtsy</Typography>
				<Divider />
				<List>
					{navItems.map((item) =>
						item.type === "route" ? (
							<ListItem key={item.key} disablePadding>
								<ListItemButton>
									<ListItemText primary={item.name} />
								</ListItemButton>
							</ListItem>
						) : (
							<ListItem key={item.key} disablePadding role="modal-btn">
								<ListItemButton
									onClick={() => {
										handleModalToggle(item.key)
									}}
								>
									<ListItemText primary={item.name} />
								</ListItemButton>
							</ListItem>
						)
					)}
				</List>
			</Box>
		</Drawer>
	)
}

export default MainDrawer
