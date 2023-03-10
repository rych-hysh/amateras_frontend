import { Auth } from "aws-amplify"

interface Session{
	session: string,
	username: string,
	isLoading: boolean,
	isAuthorized: boolean
}

export class AuthService{
	currentSession: Session = {
		session : '',
		username : '',
		isLoading : false,
		isAuthorized : true
	};

	signIn(email: string, password: string){
		this.currentSession.isLoading = true;
		Auth.signIn(email, password).then(()=>{
			this.currentSession.isLoading = false;
			this.currentSession.isAuthorized = true;
		})
	}

}