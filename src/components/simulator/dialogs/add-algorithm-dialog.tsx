import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Algorithm } from "../../../intefaces/algorithm";

export function AddAlgorithmDialog(props: {
	addAlgorithmOpen: boolean; setAddAlgorithmOpen: (arg0: boolean) => void; addAlgorithm: (id: number) => void;
}) {
	var algorithmList: Algorithm[] = [];
	const [algorithmId, setAlgorithmId] = useState(1);
	const [algorithm, setAlgorithm] = useState({} as Algorithm)
	const handleAlgorithmChange = (event: any) => {
		setAlgorithmId(event.target.value);
	}
	fetch("http://localhost:8080/algorithms/available").then(res => res.json()).then(list => algorithmList = list);
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
					{algorithmList?.map((algorithm) =>
						<MenuItem key={algorithm.id} value={algorithm.id}>{algorithm.name} </MenuItem>
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