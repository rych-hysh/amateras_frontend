import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export function EditNameDialog(props: { originalName: string | undefined;editNameOpen: boolean; setEditNameOpen: (arg0: boolean) => void; editSimulatorName: (name: string) => void; }){
	const [simulatorName, setSimulatorName] = useState(props.originalName as string);
	if(simulatorName === undefined) setSimulatorName("");
	const handleChange = (event: any) => {
		setSimulatorName(event.target.value);
	}
	const handleClose = () => {
		if(simulatorName === "") props.setEditNameOpen(true);
		setSimulatorName("");
	}
	return (
		<Dialog open={props.editNameOpen} onClose={handleClose}>
        <DialogTitle>Edit simulator name</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setEditNameOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => props.editSimulatorName(simulatorName)}>Rename</Button>
        </DialogActions>
      </Dialog>
	)
}