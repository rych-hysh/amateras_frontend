import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export function AddSimulatorDialog(props: {
	addSimulatorOpen: boolean; setAddSimulatorOpen: (arg0: boolean) => void; addSimulator: (name: string) => void; 
}) {
	const [simulatorName, setSimulatorName] = useState("" as string);
	// const [algorithm, setAlgorithm] = useState({id: 1, name: ""} as Algorithm); // https://github.com/rych-hysh/amateras_frontend/wiki/Memos#1
	if (simulatorName === undefined) setSimulatorName("");
	const handleChange = (event: any) => {
		setSimulatorName(event.target.value);
		// console.log(algorithm)
	}
	const handleClose = () => {
		if (simulatorName === "") props.setAddSimulatorOpen(true);
		setSimulatorName("");
	}
	// https://github.com/rych-hysh/amateras_frontend/wiki/Memos#1
	// const handleAlgorithmChange = (event: any) => {
	// 	if(props.algorithmList.find(algorithm => algorithm.id === event.target.value) === undefined ) {
	// 		setAlgorithm(props.algorithmList.length > 0 ? props.algorithmList[0] : {id: 0, name: ""} as Algorithm)
	// 	}else{
	// 		setAlgorithm(props.algorithmList.find((algorithm: Algorithm) => algorithm.id === event.target.value) as Algorithm);
	// 	}
	// }
	return (
		<Dialog open={props.addSimulatorOpen} onClose={handleClose}>
			<DialogTitle>Add new simulator.</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please enter new simulator name.
				</DialogContentText>
				<TextField
					autoFocus
					required
					margin="dense"
					id="name"
					label="Simulator name"
					fullWidth
					variant="standard"
					value={simulatorName}
					onChange={handleChange}
				/>
				{/* https://github.com/rych-hysh/amateras_frontend/wiki/Memos#1
				 <DialogContentText>
					Choose simulate algorithms;
				</DialogContentText>
				<Select
							id="algorithm-selector"
							labelId="algorithm"
							value={algorithm.id}
							onChange={handleAlgorithmChange}
						>
							{props.algorithmList.map((algorithm) =>
								<MenuItem key={algorithm.id} value={algorithm.id}>{algorithm.name} </MenuItem>
							)}
						</Select> */}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setAddSimulatorOpen(false)}>Cancel</Button>
				<Button variant="contained" onClick={() => props.addSimulator(simulatorName)}>Add</Button>
			</DialogActions>
		</Dialog>
	)
}