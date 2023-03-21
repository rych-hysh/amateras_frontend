import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { MouseEventHandler } from "react";

export function ConfirmPlayDialog(props: { confirmPlayOpen: boolean; setConfirmPlayOpen: (arg0: boolean) => void; simulator: { simulatorName: string | undefined; }; handlePlay: MouseEventHandler<HTMLButtonElement> | undefined; }){
	return (
		<Dialog
		open={props.confirmPlayOpen}
		onClose={() => props.setConfirmPlayOpen(false)}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">
			{"Start simulator?"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Dou you want to start {props.simulator !== undefined ? props.simulator.simulatorName : ""} ?
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.setConfirmPlayOpen(false)}>Cancel</Button>
			<Button onClick={props.handlePlay} autoFocus>
				Start
			</Button>
		</DialogActions>
	</Dialog>
	)
}