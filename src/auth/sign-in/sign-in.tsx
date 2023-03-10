import { Auth } from "aws-amplify"
import { useState } from "react";
import { AuthService } from "../auth-service";

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