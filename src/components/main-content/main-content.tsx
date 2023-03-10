import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Charts } from '../charts/charts';
import { Simulator } from '../simulator/simulator';
import { Algorythm } from '../algorythm/algorythm';
import { Notification } from '../notification/notification';
import { Setting } from '../settings/settings';
import { GridTest } from '../grid-template/grid';
import { GridTest2 } from '../grid-template/grid2';
import { Landing } from "../landing/landing";
import { SignIn } from "../../auth/sign-in/sign-in";

export function MainContent() {
	return (
		<>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path='/charts' element={<Charts />} />
					<Route path='/simulator' element={<Simulator />} />
					<Route path='/algorythm' element={<Algorythm />} />
					<Route path='/notification' element={<Notification />} />
					<Route path='/settings' element={<Setting />} />
					<Route path='/grid' element={<GridTest />} />
					<Route path='/grid2' element={<GridTest2 />} />
					<Route path="/signin" element={<SignIn />} />
				</Routes>
		</>
	);
}