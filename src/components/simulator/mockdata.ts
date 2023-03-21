import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import clsx from 'clsx'

export const data = [
	["algorythm", "origin", "alg1", "alg2"],
	["Copper", 100, -8.94, 8], // RGB value
	["Silver", 100, -10.49, 8], // English color name
	["Gold", 100, -19.3, 10],
	["Platinum", 100, -21.45, 10], // CSS-style declaration
	["Platinum", 100, -21.5, 10],
	["Platinum", 100, 21.8, 10],
	["Platinum", 100, 22, 10],
	["Platinum", 100, 25, 10],
	["Platinum", 100, 21, 10],
	["Platinum", 100, 21.5, 10],
	["Platinum", 100, 23, 10],
	["Platinum", 100, 25, 12],
	["Platinum", 100, 29, 12],
	["Platinum", 100, 27, 12],
	["Platinum", 100, 25, 14],
	["Platinum", 100, 25, 14],
	["Platinum", 100, 27, 14],
	["Platinum", 100, 29, 20],
	["Platinum", 100, 25, 20],
	["Platinum", 100, 27, 20],
	["Platinum", 100, 25, 21],
	["Platinum", 100, 31, 21],
	["Platinum", 100, 25, 19],
	["Platinum", 100, 29, 19],
	["Platinum", 100, 25, 14],
	["Platinum", 100, 27, 14],
	["Platinum", 100, 31, 30],
	["Platinum", 100, 25, 30],
	["Platinum", 100, 29, 24],
	["Platinum", 100, 25, 24],
	["Platinum", 100, 31, 28],
	["Platinum", 100, 25, 28],
];

export const PositionsColumns: GridColDef[] = [
	{ field: 'askOrBid', headerName: '売買', flex: 1, minWidth: 60, headerAlign: 'center' },
	{ field: 'atRate', headerName: '約定価格', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
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
	{ field: 'algorithmName', headerName: '使用アルゴリズム', flex: 1.5, minWidth: 150, headerAlign: 'center' },
	{ field: 'atDate', headerName: '取得日時', flex: 1.5, minWidth: 150, headerAlign: 'center' },
]

export const positionsRows = [
	{ id: 0, aorb: "ask", atrate: 130, lots: 3, algorytms: "algorytms 1", plofits: "-30", atdate: "1999/10/1 10:00:03" },
	{ id: 1, aorb: "ask", atrate: 120, lots: 2, algorytms: "algorytms 2", plofits: "+20", atdate: "1999/10/3 12:03:21" },
	{ id: 2, aorb: "bid", atrate: 130.5, lots: 2, algorytms: "algorytms 1", plofits: "+30", atdate: "1999/10/4 14:04:08" },
]

export const historyColumns: GridColDef[] = [
	{ field: 'algorytms', headerName: '使用アルゴリズム', flex: 1.5, minWidth: 150, headerAlign: 'center' },
	{ field: 'lots', headerName: 'ロット数', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{
		field: 'plofits',
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
	{ field: 'atdate', headerName: '取得日時', flex: 1.5, minWidth: 150, headerAlign: 'center' },
]

export const historyRows = [
	{ id: 0, lots: 3, algorytms: "algorytms 1", plofits: "-30", atdate: "1999/10/1 10:00:03" },
	{ id: 1, lots: 2, algorytms: "algorytms 2", plofits: "+20", atdate: "1999/10/3 12:03:21" },
]