import { Auth } from "aws-amplify";
import { useState } from "react";

export function ConfirmSignUp() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");

	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value);
	}

	const handleChangeCode = (event: any) => {
		setCode(event.target.value);
	}

	const confirmSignUp = async (event: any) => {
		event.preventDefault();
		try{
			const result = await Auth.confirmSignUp(email, code);
			console.log(result);
			const ses = await Auth.currentSession();
			console.log(ses);
		}catch(error: any){
			console.log(error);
			alert(error.message);
		}
	}

	return (
		<>
			<form onSubmit={confirmSignUp}>
				<label>
					email:
					<input type="text" value={email} onChange={handleChangeEmail} />
				</label>
				<label>
					code:
					<input type="code" value={code} onChange={handleChangeCode} />
				</label>
				<input type="submit" value="submit" />
			</form>
		</>
	);
}