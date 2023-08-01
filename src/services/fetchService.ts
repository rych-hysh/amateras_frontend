import { useAuth } from "../auth/use-auth";

export async function request(path: string, token: string | undefined): Promise<any>{
	const baseURI = "http://localhost:8080";
	const url = baseURI + path;
	console.log(path);
	console.log(token);

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
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		console.log(data);
		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}
