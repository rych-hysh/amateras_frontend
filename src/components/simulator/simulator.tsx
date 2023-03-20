import { Box, Button, CircularProgress, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";

import "./simulator.scss"
import "./mockdata"
import { data, historyColumns, historyRows, PositionsColumns } from "./mockdata";
import { Positions } from "./positions/positions";
import { History } from "./history/history";
import { AlgorithmList } from "./algorithm-list/algorithm-list";

interface Simulator {
	id: number,
	isRunning: boolean,
	simulatorName: string,
	userUuid: string
}

interface Positions{
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

export function Simulator() {
	const [simulatorList, setSimulatorList] = useState([] as Simulator[])
	const [simulatorId, setSimulatorId] = useState('0')
	const [positions, setPositions] = useState([] as Positions[]);
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
			setSimulatorList(res);
			setSimulatorId(res[0].id.toString())
			setFetching(false);
		});
		fetch('http://localhost:3030/positions').then((res) => res.json()).then(() => setPositionsLoading(false));
		fetch('http://localhost:3030/history').then((res) => res.json()).then(() => setHistoryLoading(false));
	}

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulatorId(event.target.value as string);
	}

	useEffect(() => {
		init();
	}, [isLoading]);

	useEffect(()=>{
		setPositionsLoading(true);
		fetch('http://localhost:8080/positions/' + simulatorId).then((res) => res.json()).then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
	}, [simulatorId])

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
					<AlgorithmList />
					<Positions positionLoading={positionLoading} positions={positions} />
					<History historyLoading={historyLoading} />
				</div>
			</div>
		</PrivatePage>
	)
}