import { Amplify } from "aws-amplify";

export const initAuth = () => {
	Amplify.configure({
		aws_cognito_region: process.env.REACT_APP_AUTH_REGION,
		aws_user_pools_id: process.env.REACT_APP_AUTH_USER_POOL_ID,
		aws_user_pools_web_client_id: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID
	});
};