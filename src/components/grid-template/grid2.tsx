// eslint-disable-next-line
import { styled, Paper } from "@mui/material";
import "./grid.scss";

// const Item = styled(Paper)(({ theme }) => ({
// 	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	textAlign: 'center',
// 	color: theme.palette.text.secondary,
// }));

export function GridTest2() {
	return (
		<>
			<div className="container">
				<div className="outer">
					<div id="content" className="inner">
						contents
					</div>
					<div id="A" className="inner">A</div>
					<div id="B" className="inner">B</div>
					<div id="C" className="inner">C</div>
				</div>
			</div>
		</>
	)
}