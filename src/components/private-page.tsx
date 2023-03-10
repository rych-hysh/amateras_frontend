import { Auth } from "aws-amplify";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";

interface Props {
	children: React.ReactNode
}
const PrivatePage: React.FC<Props> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const [ loading, setLoading ] = useState(true);
	const navigate = useNavigate();
	// const [ authed, setAuthed ] = useState(false);
	// const [ loading, setLoading ] = useState(true);
	Auth.currentAuthenticatedUser().then(userDate => console.log(userDate)).catch(() => console.log('no'));
	Auth.currentSession().then((res) => console.log(res));
	return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />

	// Auth.currentAuthenticatedUser().then((result) => {
	// 	console.log(result);
	// 	setLoading(false);

	// }).catch((error) => {
	// 	setLoading(false);
	// 	console.log(error);
	// })

	return (
		loading ? <p>nya</p> : isAuthenticated ? <>{children}</> : <Navigate to="/signin" />

	)
}

export default PrivatePage;