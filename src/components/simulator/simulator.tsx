import { Button, CircularProgress, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";


import "./simulator.scss"
import { data, mockSimulator } from "./mockdata";
import { PositionsList } from "./positions/positions-list";
import { History } from "./history/history";
import { AlgorithmList } from "./algorithm-list/algorithm-list";
import { ConfirmPlayDialog } from "./dialogs/confirm-play-dialog";
import { ConfirmStopDialog } from "./dialogs/confirm-stop-dialog";
// @ts-ignore
import Positions from "../../intefaces/positions";
import Simulators from "../../intefaces/simulators";
import { isRouteErrorResponse } from "react-router";

export function Simulator() {
	const [simulatorList, setSimulatorList] = useState([] as Simulators[]);
	const [simulator, setSimulator] = useState(mockSimulator as Simulators | undefined);
	const [positions, setPositions] = useState([] as Positions[]);
	const [simulatorLoading, setSimulatorLoading] = useState(true);
	const [positionLoading, setPositionsLoading] = useState(true);
	const [historyLoading, setHistoryLoading] = useState(true);

	const [confirmPlayOpen, setConfirmPlayOpen] = useState(false);
	const [confirmStopOpen, setConfirmStopOpen] = useState(false);
	const [editNameOpen, setEditNameOpen] = useState(false);
	const [addSimulatorOpen, setAddSimulatorOpen] = useState(false);
	const { sub, isLoading } = useAuth();

	const init = (simulatorId: number | null = null, getLast: boolean = false) => {
		if (isLoading) return;
		let url = "http://localhost:8080/simulators/" + sub;
		setSimulatorLoading(true);
		fetch(url).then((res) => res.json()).then((res: Simulators[]) => {
			if (res.length === 0) {
				console.log('invaild uuid');
				return;
			};
			if (!simulatorId) simulatorId = res[0].id;
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
		return simulator?.isRunning;
	}

	const handleSimulatorUpdate = (isRunning: boolean) => {
		if (simulator === undefined) return;
		updateSimulator({id: simulator?.id, isRunning: isRunning, simulatorName: simulator?.simulatorName, userUuid: sub});
		setConfirmPlayOpen(false);
		setConfirmStopOpen(false);
	}

	const editSimulatorName = (name: string) => {
		if (simulator === undefined) return;
		updateSimulator({id: simulator.id, isRunning: simulator.isRunning, simulatorName: name, userUuid: sub});
		setEditNameOpen(false);
	}

	const addSimulator = (name: string) => {
		if(simulator === undefined) return;
		const PLACE_HOLDER_NUM = 0;
		updateSimulator({id: PLACE_HOLDER_NUM, isRunning: true, simulatorName: name, userUuid: sub}, true);
	}

	const updateSimulator = (_new: Simulators, isAdd: boolean = false) => {
		let new_simulatorList = simulatorList;
		let body: any = _new;
		if(isAdd){
			body.id = null;
		}else{
			let old_simulator = new_simulatorList.find(sim => sim.id === _new.id);
			if( old_simulator === undefined ) return; //TODO: error handling
			old_simulator = _new;
		}
		fetch("http://localhost:8080/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(_new) }).then(() => {
			setSimulator(_new);
			setSimulatorList(new_simulatorList);
		}).then(() =>{
			if(isAdd){
				init(null, true);
			}
		});
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		if (simulator === undefined) {
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
			<div id="simulator-outer">
				<div id="selectSim" className="simulator-inner">
					<span id="simulator-label">Simulator : </span>
					{simulatorLoading ? (<div className="simulatorsProgress"> <CircularProgress /> </div>) :
						<Select
							id="simulator-selector"
							labelId="Simuletor"
							value={simulator !== undefined ? simulator?.id.toString() : ""}
							onChange={handleSimulatorChange}
						>
							{simulatorList.map((sim) =>
								<MenuItem key={sim.id} value={sim.id}>{sim.simulatorName} </MenuItem>
							)}
						</Select>
					}

					<div>
						{!checkRunnning() ?
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
					<Button id="edit-name" variant="outlined">edit name</Button>
					<Button id="add-new-sim" variant="contained">Add new simulator</Button>
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
		</PrivatePage>
	)
}