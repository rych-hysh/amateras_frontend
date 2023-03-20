import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../use-auth";

export function SignIn(){
	const auth = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	

	const handleChangeUsername = (event: any) => {
		setUsername(event.target.value);
	}

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
	}

	const signIn = async (event: any) => {
		event.preventDefault();
		const result = await auth.signIn(username, password);
		if(result.success){
			navigate({pathname: '/charts'});
		}else {
			alert(result.message);
		}

	}

	return (
		<>
			<form onSubmit={signIn}>
				<label>
					username:
					<input type="text" value={username} onChange={handleChangeUsername} />
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