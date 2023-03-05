import { Box, Grid, styled, Paper } from "@mui/material";
import "./grid.scss";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export function GridTest() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container sx={{ height: "35vh" }} justifyContent="space-between">
				<Grid item xs={8} sx={{ backgroundColor: "green" }} className="b">
					<div className="n">
						item
					</div>
				</Grid>
				<Grid item xs={4} sx={{ backgroundColor: "red" }} className="b">
					xs=4
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{ height: "60vh" }} justifyContent="space-between">
				<Grid item xs={4} sx={{ backgroundColor: "yellow" }} className="b">
					<Item>xs=4</Item>
				</Grid>
				<Grid item xs={8} sx={{ backgroundColor: "blue" }} className="b">
					<div className="n">
						item
					</div>
				</Grid>
			</Grid>
		</Box>
	)
}