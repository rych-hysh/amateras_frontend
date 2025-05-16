import { Box, Button, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import "./algorithm-list.scss"
import { useEffect, useState } from "react";
import { Algorithm } from "../../../intefaces/algorithm"
import { AddAlgorithmDialog } from "../dialogs/add-algorithm-dialog";
import { useAuth } from "../../../auth/use-auth";
import useAuthenticatedFetch from "../../../services/fetchService";


export function AlgorithmList(props: { simulatorId: number | undefined }) {
	const [subscribeAlgorithmList, setSubscribeAlgorithmList] = useState([] as Algorithm[]);
	const [addAlgorithmOpen, setAddAlgorithmOpen] = useState(false);
	const { sub, isLoading } = useAuth();
	const {authedFetch} = useAuthenticatedFetch();
	const init = () => {
		if (props.simulatorId! === undefined) {
			return;
		} else {
			authedFetch("/algorithms/" + props.simulatorId).then((r: Algorithm[]) => {
				setSubscribeAlgorithmList(r);
			})
		}

	}
	const addAlgorithm = (algorithmId: number) => {
		setAddAlgorithmOpen(false)
		const header = { "Accept": "application/json", "Content-Type": "application/json" };
		if (props.simulatorId === undefined) return;
		var newAlgorithm = {
			algorithmId: algorithmId,
			isSubscribed: true,
			simulatorId: props.simulatorId,
			userUuid: sub
		}
		console.log(JSON.stringify(newAlgorithm));
		authedFetch("/algorithms/add", { method: "POST", headers: header, body: JSON.stringify(newAlgorithm) })//.then(() => init(simulator.id));
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.simulatorId]);

	return (
		<Box id="ea" className="simulator-inner" >
			<List
				sx={{ width: "100%", padding: 3 }}
				subheader={
					<ListSubheader component="div">
						<Typography variant="h4" padding={1}>Algorytms</Typography>
					</ListSubheader>
				}
			>
				{subscribeAlgorithmList.map((alg: Algorithm) =>
					<ListItem key={`${alg.id}`} value={`alg.id`}>
						<ListItemText>{`${alg.name}`}</ListItemText>
					</ListItem>
				)}
			</List>
			<Button id="add-algorithm" variant="contained" onClick={() => setAddAlgorithmOpen(true)}>Add algorithm</Button>
			<AddAlgorithmDialog addAlgorithmOpen={addAlgorithmOpen} setAddAlgorithmOpen={setAddAlgorithmOpen} addAlgorithm={addAlgorithm} />
		</Box>
	)

}