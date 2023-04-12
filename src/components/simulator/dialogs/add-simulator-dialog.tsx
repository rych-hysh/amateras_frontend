import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from "@mui/material";
import { useState } from "react";

export function AddSimulatorDialog(props: { addSimulatorOpen: boolean; setAddSimulatorOpen: (arg0: boolean) => void; addSimulator: (name: string) => void; }) {
	const [simulatorName, setSimulatorName] = useState("" as string);
	if (simulatorName === undefined) setSimulatorName("");
	const handleChange = (event: any) => {
		setSimulatorName(event.target.value);
	}
	const handleClose = () => {
		if (simulatorName === "") props.setAddSimulatorOpen(true);
		setSimulatorName("");
	}
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
				<Divider />
				<Divider />
				<DialogContentText>
					Choose simulate algorithms;
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setAddSimulatorOpen(false)}>Cancel</Button>
				<Button onClick={() => props.addSimulator(simulatorName)}>Add</Button>
			</DialogActions>
		</Dialog>
	)
}