import { CircularProgress, Typography} from "@mui/material"
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid"

import Histories from "../../../intefaces/histories"
import clsx from 'clsx'

export const historyColumns: GridColDef[] = [
	{ field: 'algorithmName', headerName: 'アルゴリズム', flex: 1.5, minWidth: 150, headerAlign: 'center' },
	{ field: 'lots', headerName: 'ロット数', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{
		field: 'profits',
		headerName: '決算損益',
		flex: 0.8,
		minWidth: 60,
		headerAlign: 'center',
		type: 'number',
		cellClassName: (params: GridCellParams<any>) => {
			if (params.value == null) return '';
			return clsx({
				negative: params.value < 0,
				positive: params.value > 0
			});
		}
	},
	{ field: 'settledDate', headerName: '決算日時', flex: 1.5, minWidth: 150, headerAlign: 'center' },
]

export function History(props: { historyLoading: any, histories: Histories[] }){
	return (
		<div id="h" className="simulator-inner">
		<Typography className="tableHeader" variant="h4">History</Typography>
		{props.historyLoading ? (<div className="positionsProgress"> <CircularProgress /> </div>) : (
			<div className="tableContainer">
				<DataGrid
					rows={props.histories}
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