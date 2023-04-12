import { Box, Button, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import "./algorithm-list.scss"
import { useEffect, useState } from "react";
import { Algorithm } from "../../../intefaces/algorithm"
import { AddAlgorithmDialog } from "../dialogs/add-algorithm-dialog";
import { useAuth } from "../../../auth/use-auth";
import { PropaneSharp } from "@mui/icons-material";
export function AlgorithmList(props: {simulatorId: number | undefined}) {
	const [algorithm, setAlgorithm] = useState({ id: 0, name: "" } as Algorithm)
	const [algorithmList, setAlgorithmList] = useState([] as Algorithm[]);
	const [addAlgorithmOpen, setAddAlgorithmOpen] = useState(false);
	const { sub, isLoading } = useAuth();
	const init = () => {
		fetch("http://localhost:8080/algorithms/available").then(res => res.json()).then((r: Algorithm[]) => setAlgorithmList(r))
	}
	const addAlgorithm = (algorithmId: number) => {
		setAddAlgorithmOpen(false)
		const header = { "Accept": "application/json", "Content-Type": "application/json" };
		if(props.simulatorId === undefined)return;
		var newAlgorithm = {
			algorithmId: algorithmId,
			isSubscribed: true,
			simulatorId: props.simulatorId,
			userUuid: sub
		}
		console.log(JSON.stringify(newAlgorithm));
		fetch("http://localhost:8080/algorithms/add", { method: "POST", headers: header, body: JSON.stringify(newAlgorithm) })//.then(() => init(simulator.id));
	}
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	return (
		<Box id="ea" className="simulator-inner" >
			<List
				sx={{ width: "100%", padding: 3 }}
				subheader={
					<ListSubheader component="div">
						{/* <Typography className="tableHeader" variant="h4">Positions</Typography> */}
						<Typography variant="h4" padding={1}>Algorytms</Typography>
					</ListSubheader>
				}
			>
				{algorithmList.map((alg) =>
					<ListItem key={alg.id} value={alg.id}>{alg.name} </ListItem>
				)}
			</List>

			<Button id="add-algorithm" variant="contained" onClick={() => setAddAlgorithmOpen(true)}>Add algorithm</Button>
			<AddAlgorithmDialog algorithmList={algorithmList} addAlgorithmOpen={addAlgorithmOpen} setAddAlgorithmOpen={setAddAlgorithmOpen} addAlgorithm={addAlgorithm}/>
		</Box>
	)

}