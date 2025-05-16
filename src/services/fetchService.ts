import { useAuth } from "../auth/use-auth";
import { useContext } from "react";
const baseURI = process.env.REACT_APP_API_HOST || "http://localhost:8080";

export default function useAuthenticatedFetch(){
	const {getJwtToken} = useAuth();

	/**
	 * 
	 * @param path resource path
	 * @param options http options
	 * @returns 
	 */
	const authedFetch = async (path: string, options: any = {}) => {
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
	const url = baseURI + path;
	const {getJwtToken} = useAuth(); 
	const tokensJ = await getJwtToken();
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

		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}
