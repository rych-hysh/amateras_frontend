import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";


import "./simulator.scss"
import "./mockdata"
import { data } from "./mockdata";
import { Positions } from "./positions/positions";
import { History } from "./history/history";
import { AlgorithmList } from "./algorithm-list/algorithm-list";

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

export function Simulator() {
	const [simulatorList, setSimulatorList] = useState([] as Simulators[]);
	const [simulator, setSimulator] = useState({
		id: -1,
		simulatorName: '',
		isRunning: false,
		userUuid: ''
	} as Simulators | undefined);
	const [positions, setPositions] = useState([] as Positions[]);
	const [simulatorLoading, setSimulatorLoading] = useState(true);
	const [positionLoading, setPositionsLoading] = useState(true);
	const [historyLoading, setHistoryLoading] = useState(true);

	const [confirmPlayOpen, setConfirmPlayOpen] = useState(false);
	const [confirmStopOpen, setConfirmStopOpen] = useState(false);
	const { sub, isLoading } = useAuth();

	const init = () => {
		if (isLoading) return
		let s = "http://localhost:8080/simulators/" + sub;
		setSimulatorLoading(true);
		fetch(s).then((res) => res.json()).then((res: Simulators[]) => {
			if (res.length === 0) {
				console.log('invaild uuid');
				return;
			};
			setSimulatorList(res);
			setSimulator(res[0]);
			setSimulatorLoading(false);
		});
		setPositionsLoading(true);
		fetch('http://localhost:3030/positions').then((res) => res.json()).then(() => setPositionsLoading(false));
		setHistoryLoading(true);
		fetch('http://localhost:3030/history').then((res) => res.json()).then(() => setHistoryLoading(false));
	}

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulator(simulatorList.find(simulator => simulator.id === parseInt(event.target.value)));
	}
  
  const checkRunnning = () => {
		if (simulatorLoading) return false;
		return !simulator?.isRunning;
	}
  
	const handlePlay = () => {
		if(simulator === undefined ) return;
		let new_simulator: Simulators = {} as Simulators;
		new_simulator.id = simulator.id;
		new_simulator.isRunning = true;
		new_simulator.simulatorName = simulator.simulatorName;
		new_simulator.userUuid = sub;
		setSimulatorLoading(true);
		fetch("http://localhost:8080/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(new_simulator) }).then(() => init());
		setConfirmPlayOpen(false);
	}
  
	const handleStop = () => {
		if(simulator === undefined ) return;
		let new_simulator: Simulators = {} as Simulators;
		new_simulator.id = simulator.id;
		new_simulator.isRunning = false;
		new_simulator.simulatorName = simulator.simulatorName;
		new_simulator.userUuid = sub;
		fetch("http://localhost:8080/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(new_simulator) }).then(() => init());
		setConfirmStopOpen(false);
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		setPositionsLoading(true);
		fetch('http://localhost:8080/positions/' + simulator!.id).then((res) => res.json()).then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
	}, [simulator])


	return (
		<PrivatePage>
			<div id="simulator-container">
				<div id="simulator-outer">
					<div id="selectSim" className="simulator-inner">
						{simulatorLoading ? (<div className="simulatorsProgress"> <CircularProgress /> </div>) :
							<Select
								id="simulator-selector"
								labelId="Simuletor"
								value={simulator!.id.toString()}
								onChange={handleSimulatorChange}
							>
								{simulatorList.map((simulator) =>
									<MenuItem key={simulator.id} value={simulator.id}>{simulator.simulatorName}</MenuItem>
								)}
							</Select>
						}

						<div>
							{checkRunnning() ?
								<IconButton onClick={() => setConfirmPlayOpen(true)}>
									<PlayCircle sx={{ fontSize: "60px", color: "#f00" }} />

								</IconButton> :
								<IconButton onClick={() => setConfirmStopOpen(true)}>
									<StopCircle sx={{ fontSize: "60px" }} />

								</IconButton>
							}


						</div>
						<Dialog
							open={confirmPlayOpen}
							onClose={() => setConfirmPlayOpen(false)}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								{"Start simulator?"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Dou you want to start {simulator?.simulatorName} ?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setConfirmPlayOpen(false)}>Cancel</Button>
								<Button onClick={handlePlay} autoFocus>
									Start
								</Button>
							</DialogActions>
						</Dialog>
						<Dialog
							open={confirmStopOpen}
							onClose={() => setConfirmStopOpen(false)}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								{"Stop simulator?"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Dou you want to stop {simulator?.simulatorName} ?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setConfirmStopOpen(false)}>Cancel</Button>
								<Button onClick={handleStop} autoFocus>
									Stop
								</Button>
							</DialogActions>
						</Dialog>
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