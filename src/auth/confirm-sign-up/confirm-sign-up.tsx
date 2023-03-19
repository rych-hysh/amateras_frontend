import { Auth } from "aws-amplify";
import { useState } from "react";

export function ConfirmSignUp() {
	const [nickname, setNickname] = useState("");
	const [code, setCode] = useState("");

	const handleChangeNickname = (event: any) => {
		setNickname(event.target.value);
	}

	const handleChangeCode = (event: any) => {
		setCode(event.target.value);
	}

	const confirmSignUp = async (event: any) => {
		event.preventDefault();
		try{
			const result = await Auth.confirmSignUp(nickname, code);
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
					nickname:
					<input type="text" value={nickname} onChange={handleChangeNickname} />
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