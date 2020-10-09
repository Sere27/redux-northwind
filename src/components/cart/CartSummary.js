import alertify from "alertifyjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavItem,
	NavLink,
	Badge,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class CartSummary extends Component {
	removeFromCart(product) {
		this.props.actions.removeFromCart(product);
		alertify.error(product.productName + " removed from cart");
	}
	renderEmpty() {
		return (
			<NavItem>
				<NavLink>Empty Cart</NavLink>
			</NavItem>
		);
	}

	renderSummary() {
		return (
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					Cart
				</DropdownToggle>
				<DropdownMenu right>
					{this.props.cart.map((cartItem) => (
						//span arasında ki boşluk
						<DropdownItem key={cartItem.product.id}>
							<Badge
								color="danger"
								onClick={() => this.removeFromCart(cartItem.product)}
							>
								x
							</Badge>
							<span>&nbsp;&nbsp;</span>
							{cartItem.product.productName}
							<span>&nbsp;&nbsp;</span>
							<Badge color="success">{cartItem.quantity}</Badge>
						</DropdownItem>
					))}

					<DropdownItem divider />
					<DropdownItem>
						<Link to={"/cart"}>Go To Cart</Link>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		);
	}

	render() {
		return (
			<div>
				{this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cartReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);

//bir state e bağlanmak için map state
// bir aksiyon a bağlanmak için dispatch
