import { CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { PositionsColumns } from "../mockdata"

export function Positions(props: { positionLoading: any; positions: readonly any[]; }){

	return (
		<div id="p" className="simulator-inner">
		<Typography className="tableHeader" variant="h4">Positions</Typography>
		{props.positionLoading ? (<div className="positionsProgress"> <CircularProgress /> </div>) : (
			<div className="tableContainer">
				<DataGrid
					className="positionsTable"
					rows={props.positions}
					columns={PositionsColumns}
					autoPageSize
				// initialState={{
				// 	pagination: {paginationModel: {pageSize: 5}}
				// }}
				// pageSize={5}
				// rowsPerPageOptions={[3, 5, 10]}
				/>
			</div>
		)}
	</div>
	)
}