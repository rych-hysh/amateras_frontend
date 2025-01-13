import { Box } from "@mui/material";
import useAuthenticatedFetch  from "../../services/fetchService"


export function Algorythm(){
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