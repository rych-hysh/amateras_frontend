import { Box } from "@mui/material";
import { useAuth } from "../../auth/use-auth";
import useAuthenticatedFetch  from "../../services/fetchService"


export function Algorythm(){
	const {getJwtToken} = useAuth();
	//getJwtToken().then(token => Request("/rates/all", token).then(res => console.log(res)));
  const { authedFetch } = useAuthenticatedFetch();
	const fet = async () => {
		const data = await authedFetch("/rates/all"); 
		return data;
	} 
	fet().then(r => console.log(r))
	return (
		<Box>
			algorythm works
		</Box>
	)
}