import { Box, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";

export function AlgorithmList() {
	return (
		<Box id="ea" className="simulator-inner" >
			<List
				sx={{ width: "100%", bgcolor: "#CCC", padding: 3 }}
				subheader={
					<ListSubheader component="div" sx={{ bgcolor: '#03A9F4' }}>
						<Typography variant="h6" padding={1}>Enabled Algorytms</Typography>
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemText primary="Algorytm 1" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Algorytm 2" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Algorytm 3" />
				</ListItem>
				<ListItem >b</ListItem>
			</List>
		</Box>
	)

}