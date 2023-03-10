import { Amplify, Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import AwsConfig from '../aws-config/auth';

Amplify.configure({ Auth: AwsConfig });

interface UseAuth {
	isLoading: boolean;
	isAuthenticated: boolean;
	username: string;
	signUp: (username: string, password: string) => Promise<Result>;
	confirmSignUp: (verificationCode: string) => Promise<Result>;
	signIn: (username: string, password: string) => Promise<Result>;
	signOut: () => void;
}

interface Result {
	success: boolean;
	message: string;
}

const authContext = createContext({} as UseAuth);

interface Props {
	children : React.ReactNode;
}

export const ProvideAuth: React.FC<Props> = ( { children } ) => {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
}

const useProvideAuth = (): UseAuth => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then((result) => {
				setInterval(() => console.log(result.username + isAuthenticated.toString), 3000);
				setUsername(result.username);
				setIsAuthenticated(true);
				setIsLoading(false);
			})
			.catch((err)=>{
				console.log(err);
				setUsername('');
				// setIsAuthenticated(false);
				setIsLoading(false);
			});
	}, []);

	const signUp = async (username: string, password: string) => {
		try {
			await Auth.signUp({username, password });
			setUsername(username);
			setPassword(password);
			return { success: true, message: ''};
		}	catch (error) {
			return {
				success: false,
				message: 'authenticate failed',
			};
		}
	};

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
			setInterval(()=>console.log(isAuthenticated), 3000)
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
		isLoading,
		isAuthenticated,
		username,
		signUp,
		confirmSignUp,
		signIn,
		signOut,
	};
}