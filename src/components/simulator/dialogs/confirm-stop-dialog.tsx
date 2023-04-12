import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MouseEventHandler } from "react";

export function ConfirmStopDialog(props: { confirmStopOpen: boolean; setConfirmStopOpen: (arg0: boolean) => void; simulator: { simulatorName: string | undefined; }; handleStop: MouseEventHandler<HTMLButtonElement> | undefined; }){
	return (
		<Dialog
		open={props.confirmStopOpen}
		onClose={() => props.setConfirmStopOpen(false)}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">
			{"Stop simulator?"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Dou you want to stop {props.simulator !== undefined ? props.simulator.simulatorName : ""} ?
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.setConfirmStopOpen(false)}>Cancel</Button>
			<Button variant="contained" onClick={props.handleStop} autoFocus>
				Stop
			</Button>
		</DialogActions>
	</Dialog>
	)
}