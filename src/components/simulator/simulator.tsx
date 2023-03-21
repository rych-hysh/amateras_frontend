import { CircularProgress, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";


import "./simulator.scss"
import "./mockdata"
import { data } from "./mockdata";
import { PositionsList } from "./positions/positions-list";
import { History } from "./history/history";
import { AlgorithmList } from "./algorithm-list/algorithm-list";
import { ConfirmPlayDialog } from "./dialogs/confirm-play-dialog";
import { ConfirmStopDialog } from "./dialogs/confirm-stop-dialog";

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

	const init = (simulatorId: number | null = null) => {
		if (isLoading) return;
		let url = "http://localhost:8080/simulators/" + sub;
		setSimulatorLoading(true);
		fetch(url).then((res) => res.json()).then((res: Simulators[]) => {
			if (res.length === 0) {
				console.log('invaild uuid');
				return;
			};
			if(!simulatorId) simulatorId = res[0].id;
			setSimulatorList(res);
			setSimulator(simulatorList.find(simulator => simulator.id === simulatorId));
			setSimulatorLoading(false);
		});
		setPositionsLoading(true);
		fetch('http://localhost:8080/positions/' + simulator!.id).then((res) => res.json()).then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
		setHistoryLoading(true);
		fetch('http://localhost:3030/history').then((res) => res.json()).then(() => setHistoryLoading(false));
	}

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulator(simulatorList.find(simulator => simulator.id === parseInt(event.target.value)));
	}
  
  const checkRunnning = () => {
		console.log(simulator)
		console.log("simulator")
		return simulator?.isRunning;
	}

	const handleSimulatorUpdate = (isRunning: boolean) => {
		if(simulator === undefined ) return;
		let new_simulator: Simulators = {} as Simulators;
		new_simulator.id = simulator.id;
		new_simulator.isRunning = isRunning;
		new_simulator.simulatorName = simulator.simulatorName;
		new_simulator.userUuid = sub;
		let new_simulatorList = simulatorList;
		let old_simulator = new_simulatorList.find(simulator => simulator.id === new_simulator.id);
		if( old_simulator === undefined) return;
		old_simulator.isRunning = isRunning;
		setSimulator(new_simulator);
		setSimulatorList(new_simulatorList);
		fetch("http://localhost:8080/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(new_simulator) })//.then(() => init(simulator.id));
		setConfirmPlayOpen(false);
		setConfirmStopOpen(false);
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		if(simulator === undefined) {
			setSimulator(simulatorList[0])
			return
		};
		setPositionsLoading(true);
		fetch('http://localhost:8080/positions/' + simulator!.id).then((res) => res.json()).then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
								value={simulator !== undefined ? simulator?.id.toString(): ""}
								onChange={handleSimulatorChange}
							>
								{simulatorList.map((simulator) =>
									<MenuItem key={simulator.id} value={simulator.id}>{simulator.simulatorName}</MenuItem>
								)}
							</Select>
						}

						<div>
							{ !checkRunnning() ?
								<IconButton onClick={() => setConfirmPlayOpen(true)}>
									<PlayCircle sx={{ fontSize: "60px", color: "#f00" }} />

								</IconButton> :
								<IconButton onClick={() => setConfirmStopOpen(true)}>
									<StopCircle sx={{ fontSize: "60px" }} />

								</IconButton>
							}


						</div>
						<ConfirmPlayDialog confirmPlayOpen={confirmPlayOpen} setConfirmPlayOpen={setConfirmPlayOpen} simulator={simulator!} handlePlay={handleSimulatorUpdate.bind(null, true)} />
						<ConfirmStopDialog confirmStopOpen={confirmStopOpen} setConfirmStopOpen={setConfirmStopOpen} simulator={simulator!} handleStop={handleSimulatorUpdate.bind(null, false)} />

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
					<PositionsList positionLoading={positionLoading} positions={positions} />
					<History historyLoading={historyLoading} />
				</div>
			</div>
		</PrivatePage>
	)
}