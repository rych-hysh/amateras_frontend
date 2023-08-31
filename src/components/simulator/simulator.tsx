import { Alert, Button, CircularProgress, IconButton, MenuItem, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import PrivatePage from "../private-page";
import { useAuth } from "../../auth/use-auth";


import "./simulator.scss"
import { data } from "./mockdata";// @ts-ignore
import { PositionsList } from "./positions/positions-list";// @ts-ignore
import { History } from "./history/history";// @ts-ignore
import { AlgorithmList } from "./algorithm-list/algorithm-list";// @ts-ignore
import { ConfirmPlayDialog } from "./dialogs/confirm-play-dialog";// @ts-ignore
import { ConfirmStopDialog } from "./dialogs/confirm-stop-dialog";// @ts-ignore
import Positions from "../../intefaces/positions";// @ts-ignore
import Simulators from "../../intefaces/simulators";// @ts-ignore
import { EditNameDialog } from "./dialogs/edit-name-dialog";// @ts-ignore
import { AddSimulatorDialog } from "./dialogs/add-simulator-dialog";
import Histories from "../../intefaces/histories";

import useAuthenticatedFetch, {Request} from "../../services/fetchService";

const fundHeader = ["date", "funds"];

export function Simulator() {
	const [simulatorList, setSimulatorList] = useState([] as Simulators[]);
	const [simulator, setSimulator] = useState({} as Simulators | undefined);
	const [positions, setPositions] = useState([] as Positions[]);
	const [histories, setHistories] = useState([] as Histories[]);
	const [simulatorLoading, setSimulatorLoading] = useState(true);
	const [positionLoading, setPositionsLoading] = useState(true);
	const [historyLoading, setHistoryLoading] = useState(true);

	const [confirmPlayOpen, setConfirmPlayOpen] = useState(false);
	const [confirmStopOpen, setConfirmStopOpen] = useState(false);
	const [editNameOpen, setEditNameOpen] = useState(false);
	const [addSimulatorOpen, setAddSimulatorOpen] = useState(false);
	const [nameNullAlertOpen, setNameNullAlertOpen] = useState(false);
	const [nameChangedAlertOpen, setNameChangedAlertOpen] = useState(false);
	const { sub, isLoading } = useAuth();
	const { authedFetch } = useAuthenticatedFetch();

	const init = (simulatorId: number | null = null, getLast: boolean = false) => {
		if (isLoading) return;
		/*
			memo:
				localのSpringBootに接続する場合は
					url = "http://localhost:8080/" ...
				amazon ec2のSpringBootに接続する場合はフロントエンドのプロキシを利用して
					url = "http://44.202.140.11/amateras/"
		*/
		setSimulatorLoading(true);
		authedFetch("/simulators/" + sub).then((res: Simulators[]) => {
			if (res.length === 0) {
				console.log('invaild uuid');
				return;
			};
			if (!simulatorId) simulatorId = res[0].id;
			setSimulatorList(res);
			setSimulator(simulatorList.find(simulator => simulator.id === simulatorId));
			setSimulatorLoading(false);
		});

		if(simulator!.id == undefined)return;
		setPositionsLoading(true);
		authedFetch('/positions/' + simulator!.id + "/unsettled").then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
		setHistoryLoading(true);
		authedFetch('/positions/' + simulator!.id + "/settled").then((res: Histories[]) => {
			setHistories(res);
			setHistoryLoading(false);
		})
	}

	const handleSimulatorChange = (event: SelectChangeEvent) => {
		setSimulator(simulatorList.find(simulator => simulator.id === parseInt(event.target.value)));
		
	}

	const checkRunnning = () => {
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
		authedFetch("/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(new_simulator) })//.then(() => init(simulator.id));
		setConfirmPlayOpen(false);
		setConfirmStopOpen(false);
	}

	const editSimulatorName = (name: string) => {
		if(name === undefined || name === ""){
			setEditNameOpen(false);
			setNameNullAlertOpen(true);
			return 
		}
		if (simulator === undefined) return;
		updateSimulator({id: simulator.id, isRunning: simulator.isRunning, simulatorName: name, userUuid: sub});
		setEditNameOpen(false);
	}	
	const addSimulator = (name: string) => {
		if(name === undefined || name === ""){
			setAddSimulatorOpen(false);
			setNameNullAlertOpen(true);
			return 
		}
		if(simulator === undefined) return;
		const PLACE_HOLDER_NUM = 0;
		updateSimulator({id: PLACE_HOLDER_NUM, isRunning: false, simulatorName: name, userUuid: sub}, true);
		//addAlgorithmToSimulator()
		setAddSimulatorOpen(false);
	}
	const nameNullAlert = (
		<Snackbar open={nameNullAlertOpen} onClose={() => setNameNullAlertOpen(false)}>
			<Alert severity="error">
				Please enter simulator name!
			</Alert>
		</Snackbar>
	);

	const updateSimulator = (_new: Simulators, isAdd: boolean = false) => {
		let new_simulatorList = simulatorList;
		let body: any = _new;
		if(isAdd){
			body.id = null;
		}else{
			let old_simulatorIndex = new_simulatorList.findIndex(sim => sim.id === _new.id);
			if( old_simulatorIndex === undefined ) return; //TODO: error handling
			new_simulatorList.splice(old_simulatorIndex, 1, _new);
		}
		setSimulatorLoading(true);
		authedFetch("/simulators/update", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(_new) }).then((res) => {
			setSimulatorLoading(false);
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
		authedFetch('/positions/' + simulator!.id + "/unsettled").then((res: Positions[]) => {
			setPositions(res);
			setPositionsLoading(false);
		})
		setHistoryLoading(true);
		authedFetch('/positions/' + simulator!.id + "/settled").then((res: Histories[]) => {
			setHistories(res);
			setHistoryLoading(false);
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
					<Button id="edit-name" variant="outlined" onClick={() => setEditNameOpen(true)}>edit name</Button>
					<EditNameDialog originalName={simulator?.simulatorName} editNameOpen={editNameOpen} setEditNameOpen={setEditNameOpen} editSimulatorName={editSimulatorName} />
					<Button id="add-new-sim" variant="contained" onClick={() => setAddSimulatorOpen(true)}>Add new simulator</Button>
					<AddSimulatorDialog addSimulatorOpen={addSimulatorOpen} setAddSimulatorOpen={setAddSimulatorOpen} addSimulator={addSimulator} />
					{nameNullAlert}
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
				<AlgorithmList simulatorId={simulator?.id}/>
				<PositionsList positionLoading={positionLoading} positions={positions} />
				<History historyLoading={historyLoading} histories={histories}/>
			</div>
		</PrivatePage>
	)
}