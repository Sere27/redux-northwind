import React from "react";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Container } from "reactstrap";
function App() {
	return (
		<Container>
			<Navi></Navi>
			<Dashboard></Dashboard>
		</Container>
	);
}

export default App;
