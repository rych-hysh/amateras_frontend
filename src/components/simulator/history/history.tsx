import { CircularProgress, Typography} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

import { historyColumns, historyRows } from "../mockdata"

export function History(props: { historyLoading: any }){
	return (
		<div id="h" className="simulator-inner">
		<Typography className="tableHeader" variant="h4">History</Typography>
		{props.historyLoading ? (<div className="positionsProgress"> <CircularProgress /> </div>) : (
			<div className="tableContainer">
				<DataGrid
					rows={historyRows}
					columns={historyColumns}
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