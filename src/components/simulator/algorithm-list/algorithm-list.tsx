import { Box, Button, List, ListItem, ListItemText, ListSubheader, Typography } from "@mui/material";
import "./algorithm-list.scss"
import { useEffect, useState } from "react";
import { Algorithm } from "../../../intefaces/algorithm"
import { AddAlgorithmDialog } from "../dialogs/add-algorithm-dialog";
import { useAuth } from "../../../auth/use-auth";
export function AlgorithmList() {
	const [algorithm, setAlgorithm] = useState({ id: 0, name: "" } as Algorithm)
	const [algorithmList, setAlgorithmList] = useState([] as Algorithm[]);
	const [addAlgorithmOpen, setAddAlgorithmOpen] = useState(false);
	const { isLoading } = useAuth();
	const init = () => {
		fetch("http://localhost:8080/algorithms/available").then(res => res.json()).then((r: Algorithm[]) => setAlgorithmList(r))
	}
	const addAlgorithm = (algorithmId: number) => {

	}
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	return (
		<Box id="ea" className="simulator-inner" >
			<List
				sx={{ width: "100%", padding: 3 }}
				subheader={
					<ListSubheader component="div" sx={{ bgcolor: '#03A9F4' }}>
						<Typography variant="h6" padding={1}>Enabled Algorytms</Typography>
					</ListSubheader>
				}
			>
				{algorithmList.map((alg) =>
					<ListItem key={alg.id} value={alg.id}>{alg.name} </ListItem>
				)}
			</List>

			<Button id="add-algorithm" variant="contained" onClick={() => setAddAlgorithmOpen(true)}>Add algorithm</Button>
			<AddAlgorithmDialog algorithmList={algorithmList} addAlgorithmOpen={addAlgorithmOpen} setAddAlgorithmOpen={setAddAlgorithmOpen} addAlgorithm={addAlgorithm}/>
		</Box>
	)

}