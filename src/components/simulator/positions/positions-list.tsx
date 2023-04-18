import { CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

import clsx from 'clsx'

const PositionsColumns: GridColDef[] = [
	{ field: 'askOrBid', headerName: '売買', flex: 1, minWidth: 60, headerAlign: 'center' },
	{ field: 'gotRate', headerName: '取得価格', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{ field: 'lots', headerName: 'ロット数', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{
		field: 'profits',
		headerName: '損益',
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
	{ field: 'algorithmName', headerName: 'アルゴリズム', flex: 1.5, minWidth: 120, headerAlign: 'center' },
	{ field: 'gotDate', headerName: '取得日時', flex: 1.5, minWidth: 120, headerAlign: 'center' },
]

export function PositionsList(props: { positionLoading: any; positions: readonly any[]; }){
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