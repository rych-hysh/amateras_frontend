import { Amplify, Auth } from "aws-amplify"
import React, { createContext, useContext, useEffect, useState } from "react"

interface Result{
	success: boolean,
	message: string
}

interface UseAuth{
	sub: string,
	username: string,
	isLoading: boolean,
	isAuthenticated: boolean,
	signUp: (nickname: string, email: string, password: string) => Promise<Result>,
	confirmSignUp: (verificationCode: string) => Promise<Result>,
	signIn: (username: string, password: string) => Promise<Result>,
	signOut: () => void
}

interface Props {
	children: React.ReactNode;
}

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ( { children } ) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}> { children } </authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
}

const useProvideAuth = () : UseAuth => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [sub, setSub] = useState('');


	useEffect(()=>{
		setIsLoading(true);
		Auth.currentAuthenticatedUser()
				.then((result) => {
					setSub(result.attributes.sub);
					setUsername(result.username);
					setIsAuthenticated(true);
					setIsLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setSub('')
					setUsername('');
					setIsAuthenticated(false);
					setIsLoading(false);
				})
	})

	const signUp = async (nickname: string, email: string, password: string) => {
		try{
			await Auth.signUp({
				username: nickname,
				password: password,
				attributes: {
					email: email,
					nickname: nickname
				}
			});
			setUsername(username)
			setPassword(password)
			return {success: true, message: "Sign up success."};
		}catch(error: any){
			console.log(error);
			return {success: false, message: "Sign up failed."};
		}
	}

	const confirmSignUp = async (verificationCode: string) => {
		try {
			await Auth.confirmSignUp(username, verificationCode);
			const result = await signIn(username, password);
			setPassword('');
			return result;
		} catch (error) {
			return {
				success: false,
				message: 'authenticate failed',
			};
		}
	};

	const signIn = async (username: string, password: string) => {
		try {
			const result = await Auth.signIn(username, password);
			setUsername(result.username);
			setIsAuthenticated(true);
			return {success: true, message: ''};
		} catch ( error ) {
			return {
				success: false,
				message: 'authenticate failed',
			};
		}
	};

	const signOut = async () => {
		try {
			await Auth.signOut();
			setUsername('');
			setIsAuthenticated(false);
			console.log('signed out')
			return {success: true, message: ''};
		} catch (error) {
			return {
				success: false,
				message: 'authenticate failed',
			};
		}
	};

	return {
		sub,
		isLoading,
		isAuthenticated,
		username,
		signUp,
		confirmSignUp,
		signIn,
		signOut,
	};
}
// export const AuthProvider = (props) => {
// 	const [ authinfo, setAuthinfo ] = useState({
// 		session: "",
// 		username: "",
// 		isLoading: true,
// 		isAuthorized: false
// 	});
// 	return (
// 		<AuthContext.Provider value={{}}>
// 			{}
// 		</AuthContext.Provider>
// 	)
// }

