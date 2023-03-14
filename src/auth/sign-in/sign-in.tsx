import { Auth } from "aws-amplify"
import { useState } from "react";
import { AuthService } from "../auth-service";
import { initAuth } from "../config/auth";

export function SignIn(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	

	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value);
	}

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
	}

	const signIn = async (event: any) => {
		event.preventDefault();
		try{
			const result = await Auth.signIn(email, password);
			console.log(result);
			// initAuth();
			const ses = await Auth.currentSession();
			console.log(ses);
		}catch(error: any){
			console.log(error);
			alert(error.message);
		}
	}

	return (
		<>
			<form onSubmit={signIn}>
				<label>
					email:
					<input type="text" value={email} onChange={handleChangeEmail} />
				</label>
				<label>
					password:
					<input type="password" value={password} onChange={handleChangePassword} />
				</label>
				<input type="submit" value="submit"/>
			</form>
		</>
	)
}