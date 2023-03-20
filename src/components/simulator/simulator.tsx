import { Box, CircularProgress, IconButton, List, ListItem, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import clsx from 'clsx'
import "./simulator.scss"
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";

interface Simulators {
	id: number,
	isRunning: boolean,
	simulatorName: string,
	userUuid: string
}

interface Positions {
	id: number,
	askOrBid: string,
	atRate: number,
	lots: number,
	algorithmName: string,
	profits: number,
	atDate: String,
	pair: String,
	isSettled: boolean
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
	const [simulatorList, setSimulatorList] = useState([] as Simulators[])
	const [simulatorId, setSimulatorId] = useState('0')
	const [positions, setPositions] = useState([] as Positions[]);
	const [fetching, setFetching] = useState(true);
	const [positionLoading, setPositionsLoading] = useState(true);
	const [historyLoading, setHistoryLoading] = useState(true);
	const { sub, isLoading } = useAuth();

	const init = () => {
		if (isLoading) return
		let s = "http://localhost:8080/simulators/" + sub;
		fetch(s).then((res) => res.json()).then((res: Simulators[]) => {
			if (res.length === 0) {
				console.log('invaild uuid');
				return;
			};
			setSimulatorList(res);
			setSimulatorId(res[0].id.toString())
			setFetching(false);
		});
		fetch('http://localhost:3030/positions').then((res) => res.json()).then(() => setPositionsLoading(false));
		fetch('http://localhost:3030/history').then((res) => res.json()).then(() => setHistoryLoading(false));
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		setPositionsLoading(true);
		fetch('http://localhost:8080/positions/' + simulatorId).then((res) => res.json()).then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
	}, [simulatorId])

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulatorId(event.target.value as string);
	}
	const checkRunnning = () =>{
		if(fetching)return false;
		return !simulatorList.filter((simulator) => simulator.id === parseInt(simulatorId))[0].isRunning;
	}
	const handlePlay = () => {
		let simulator: Simulators = {} as Simulators;
		simulator.id = parseInt(simulatorId);
		simulator.isRunning = true;
		simulator.simulatorName = simulatorList.filter((simulator) => simulator.id === parseInt(simulatorId))[0].simulatorName;
		simulator.userUuid = sub;
		fetch("http://localhost:8080/simulators/update", {method: "POST", headers: {"Accept": "application/json", "Content-Type": "application/json"}, body: JSON.stringify(simulator)}).then(() => init());
	}
	const handleStop = () => {
		let simulator: Simulators = {} as Simulators;
		simulator.id = parseInt(simulatorId);
		simulator.isRunning = false;
		simulator.simulatorName = simulatorList.filter((simulator) => simulator.id === parseInt(simulatorId))[0].simulatorName;
		simulator.userUuid = sub;
		fetch("http://localhost:8080/simulators/update", {method: "POST", headers: {"Accept": "application/json", "Content-Type": "application/json"}, body: JSON.stringify(simulator)}).then(() => init());
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
									<MenuItem key={simulator.id} value={simulator.id}>{simulator.simulatorName}</MenuItem>
								)}
							</Select>
						}

						<div>
							{ checkRunnning() ?
								<IconButton onClick={handlePlay}>
									<PlayCircle sx={{ fontSize: "60px", color: "#f00" }} />

								</IconButton> :
								<IconButton onClick={handleStop}>
									<StopCircle sx={{ fontSize: "60px" }} />

								</IconButton>
							}


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