import React from "react";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
function App() {
	return (
		<Container>
			<Navi></Navi>
			<Switch>
				<Route path="/" exact component={Dashboard}></Route>
				<Route path="/product" exact component={Dashboard}></Route>
				<Route
					path="/saveproduct/:productId"
					component={AddOrUpdateProduct}
				></Route>
				<Route path="/cart" exact component={CartDetail}></Route>
			</Switch>
		</Container>
	);
}

export default App;
// cart ve dashboard arası geçişleri switch ile ypaıyoruz
