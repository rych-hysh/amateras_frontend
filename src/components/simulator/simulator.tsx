import { Box, Button, CircularProgress, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import clsx from 'clsx'
import "./simulator.scss"
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";

interface Simulator {
	id: number,
	isRunning: boolean,
	simulatorName: string,
	userUuid: string
}

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

const PositionsColumns: GridColDef[] = [
	{ field: 'aorb', headerName: '売買', flex: 1, minWidth: 60, headerAlign: 'center' },
	{ field: 'atrate', headerName: '約定価格', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{ field: 'lots', headerName: 'ロット数', flex: 1, minWidth: 100, headerAlign: 'center', type: 'number' },
	{
		field: 'plofits',
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
	{ field: 'algorytms', headerName: '使用アルゴリズム', flex: 1.5, minWidth: 150, headerAlign: 'center' },
	{ field: 'atdate', headerName: '取得日時', flex: 1.5, minWidth: 150, headerAlign: 'center' },
]

let positionsRows = [
	{ id: 0, aorb: "ask", atrate: 130, lots: 3, algorytms: "algorytms 1", plofits: "-30", atdate: "1999/10/1 10:00:03" },
	{ id: 1, aorb: "ask", atrate: 120, lots: 2, algorytms: "algorytms 2", plofits: "+20", atdate: "1999/10/3 12:03:21" },
	{ id: 2, aorb: "bid", atrate: 130.5, lots: 2, algorytms: "algorytms 1", plofits: "+30", atdate: "1999/10/4 14:04:08" },
]

const historyColumns: GridColDef[] = [
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

const historyRows = [
	{ id: 0, lots: 3, algorytms: "algorytms 1", plofits: "-30", atdate: "1999/10/1 10:00:03" },
	{ id: 1, lots: 2, algorytms: "algorytms 2", plofits: "+20", atdate: "1999/10/3 12:03:21" },
]

export function Simulator() {
	const [simulatorList, setSimulatorList] = useState([] as Simulator[])
	const [simulatorId, setSimulatorId] = useState('0')
	const [positions, setPositions] = useState(positionsRows);
	const [fetching, setFetching] = useState(true);
	const [positionLoading, setPositionsLoading] = useState(true);
	const [historyLoading, setHistoryLoading] = useState(true);
	const { sub, isLoading } = useAuth();

	const init = () => {
		if(isLoading)return
		let s = "http://localhost:8080/simulators/" + sub;
		fetch(s).then((res) => res.json()).then((res: Simulator[]) => {
			if (res.length == 0) {
				console.log('invaild uuid');
				return;
			};
			console.log(res[0].id.toString());
			setSimulatorList(res);
			setSimulatorId(res[0].id.toString())
			setFetching(false);
		});
		fetch('http://localhost:3030/positions').then((res) => res.json()).then(() => setPositionsLoading(false));
		fetch('http://localhost:3030/history').then((res) => res.json()).then(() => setHistoryLoading(false));
	}

	useEffect(() => {
		init();
	}, [isLoading]);

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulatorId(event.target.value as string);
	}
	return (
		<PrivatePage>
			<div id="simulator-container">
				<div id="simulator-outer">
					<div id="selectSim" className="simulator-inner">
						{fetching ? (<div className="simulatorsProgress"> <CircularProgress /> </div>) :
							<Select
								id="simulator-selector"
								labelId="Simuletor"
								value={simulatorId}
								onChange={handleSimulatorChange}
							>
								{simulatorList.map((simulator) =>
									<MenuItem value={simulator.id}>{simulator.simulatorName}</MenuItem>
								)}
							</Select>
						}

						<div>
							<IconButton>
								<PlayCircle sx={{ fontSize: "60px", color: "#f00" }} />

							</IconButton>
							<IconButton>
								<StopCircle sx={{ fontSize: "60px" }} />

							</IconButton>
						</div>
					</div>
					<div id="PL" className="simulator-inner">
						<Chart
							chartType="SteppedAreaChart"
							width="100%"
							height="100%"
							data={data}
							options={{ isStacked: true }}
						/>
					</div>
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
					<div id="p" className="simulator-inner">
						<Typography className="tableHeader" variant="h4">Positions</Typography>
						{positionLoading ? (<div className="positionsProgress"> <CircularProgress /> </div>) : (
							<div className="tableContainer">
								<DataGrid
									className="positionsTable"
									rows={positions}
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
					<div id="h" className="simulator-inner">
						<Typography className="tableHeader" variant="h4">History</Typography>
						{historyLoading ? (<div className="positionsProgress"> <CircularProgress /> </div>) : (
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
				</div>
			</div>
		</PrivatePage>
	)
}