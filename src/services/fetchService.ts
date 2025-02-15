import { useAuth } from "../auth/use-auth";
import { useContext } from "react";

export default function useAuthenticatedFetch(){
	const {getJwtToken} = useAuth();

	/**
	 * 
	 * @param path resource path
	 * @param options http options
	 * @returns 
	 */
	const authedFetch = async (path: string, options: any = {}) => {
		const baseURI = process.env.API_HOST !== undefined ? process.env.API_HOST : "http://localhost:8080";
    console.log(process.env.API_HOST);
		const url = baseURI + path;
		const token = await getJwtToken();
		const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${token}`);
		options = {...options, headers};

		const response = await fetch(url, options);
		if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { authedFetch };
}
/**
 * @deprecated
 * @param path 
 * @param token 
 * @returns 
 */
export async function Request(path: string, token: string | undefined): Promise<any>{
	const baseURI = "(http://localhost:8080)";
	const url = baseURI + path;
	console.log(path);
	console.log(token);
	const {getJwtToken} = useAuth(); 
	const tokensJ = await getJwtToken();
	console.log(tokensJ)
	console.log("nya")
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`HTTP error. request for ${path} was failed with status: ${response.status}`);
		}

		const data = await response.json();

		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}
