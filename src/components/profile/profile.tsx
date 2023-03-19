import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useAuth } from "../../auth/use-auth"

const Memo = (props: any) => {
	return (
		<>
			{props.text}
		</>
	)
}

export function Profile(){
	const [state, setState] = useState('');
	const auth = useAuth();
	const { sub } = useAuth();
	let t: string = "";
	const h = (e: any) => {
		setState(e.target.value)
	}
	return (
		<>
		profile: {sub}
		<Button onClick={h}>aa</Button>
		<input type="text" value={state} onChange={h}></input>
		<Memo text={state}></Memo>
		</>
	)
}

