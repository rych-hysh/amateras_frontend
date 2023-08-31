import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Algorithm } from "../../../intefaces/algorithm";
import useAuthenticatedFetch from "../../../services/fetchService";

export function AddAlgorithmDialog(props: {
	addAlgorithmOpen: boolean; setAddAlgorithmOpen: (arg0: boolean) => void; addAlgorithm: (id: number) => void;
}) {
	const [algorithmId, setAlgorithmId] = useState(1);
	const [availableAlgorithmList, setAvailableAlgorithmList] = useState([] as Algorithm[])
	const { authedFetch } = useAuthenticatedFetch();
	const handleAlgorithmChange = (event: any) => {
		setAlgorithmId(event.target.value);
	}
	const init = () => {
		authedFetch("/algorithms/available").then(list => {
		setAvailableAlgorithmList(list);
	})}
	useEffect(() => {
		init()
	}, [])
	return (
		<Dialog open={props.addAlgorithmOpen}>
			<DialogTitle>Add new algorithm.</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please select algorithm to use.
				</DialogContentText>
				<Divider />
				<Select
					id="algorithm-selector"
					labelId="algorithm"
					value={algorithmId}
					fullWidth
					onChange={handleAlgorithmChange}
				>
					{availableAlgorithmList.map((alg) =>
						<MenuItem key={alg.id} value={alg.id}>{alg.name} </MenuItem>
					)}
				</Select>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setAddAlgorithmOpen(false)}>Cancel</Button>
				<Button variant="contained" onClick={() => props.addAlgorithm(algorithmId)}>Add</Button>
			</DialogActions>
		</Dialog>
	)
}