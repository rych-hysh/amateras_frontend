import { Auth } from "aws-amplify";
import { useState } from "react";

export function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");

	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value);
	}

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
	}

	const handleChangeNickname = (event: any) => {
		setNickname(event.target.value);
	}

	const signUp = async (event: any) => {
		event.preventDefault();
		try{
			const result = await Auth.signUp({
				username: nickname,
				password: password,
				attributes: {
					email: email,
					nickname: nickname
				}
			});
			console.log(result);
		}catch(error: any){
			console.log(error);
			alert(error.message);
		}
	}

	return (
		<>
			<form onSubmit={signUp}>
				<label>
					email:
					<input type="text" value={email} onChange={handleChangeEmail} />
				</label>
				<label>
					nickname:
					<input type="text" value={nickname} onChange={handleChangeNickname} />
				</label>
				<label>
					password:
					<input type="password" value={password} onChange={handleChangePassword} />
				</label>
				<input type="submit" value="submit" />
			</form>
		</>
	);
}