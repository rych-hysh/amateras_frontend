import { Box } from "@mui/material";
import { useAuth } from "../../auth/use-auth";
import { request } from "../../services/fetchService"

export function Algorythm(){
	const {getJwtToken} = useAuth();
	getJwtToken().then(token => request("/rates/all", token).then(res => console.log(res)))
	return (
		<Box>
			algorythm works
		</Box>
	)
}