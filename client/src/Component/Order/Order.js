import React, { Component, Fragment } from "react";
import OrderForm from "./OrderForm";
import OrderMenu from "./OrderMenu";
import Payments from "./Payments";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { requestOrder } from "../../Action";
class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			nameValue: "",
			phoneValue: "",
			orderMenuConfirmed: false,
			orderConfirmed: false,
			orderUserConfirmed: false,
			items: [],
			total: this.props.total || 40000,
			user: {}
		};
		this.setUser = this.setUser.bind(this);
		this.orderFromMenuCompleted = this.orderFromMenuCompleted.bind(this);
	}
	setUser(user) {
		user.total = this.state.total;
		this.setState({ user, orderUserConfirmed: true });
	}
	orderFromMenuCompleted(total, items) {
		console.log(total);
		this.setState({ orderMenuConfirmed: true, total, items });
	}
	componentWillReceiveProps(props) {
		console.log(props);
		if (
			typeof props.orders !== "undefined" &&
			props.orders !== null &&
			typeof props.orders.orderId !== "undefined"
		) {
			this.setState({});
		} else this.setState({ displayServerError: true });
		if (props.auth) {
			let emailValue = props.auth.email || "";
			let nameValue = props.auth.name || "";
			let phoneValue = props.auth.phone || "";
			this.setState({ emailValue, nameValue, phoneValue });
		}
		if (props.transaction) {
			if (props.transaction.success) {
				this.props.requestOrder(this.state.user);
				this.setState({ orderConfirmed: true });
			}
		}
	}
	render() {
		if (!this.state.orderMenuConfirmed) {
			return <OrderMenu orderMenuConfix={this.orderFromMenuCompleted} />;
		}
		if (this.state.orderConfirmed) {
			return (
				<Redirect
					push
					to={{
						pathname: "/orderstatus",
						orderId: this.state.user.orderId,
						date: this.state.user.date,
						time: this.state.user.time
					}}
				/>
			);
		}
		return (
			<Fragment>
				{!this.state.orderUserConfirmed && (
					<Fragment>
						<OrderForm
							email={this.state.emailValue}
							phone={this.state.phoneValue}
							name={this.state.nameValue}
							setUser={this.setUser}
							total={this.state.total}
							orderItems={this.state.items}
						/>
					</Fragment>
				)}
				{this.state.orderUserConfirmed && (
					<Payments
						orderId={this.state.user.orderId}
						total={this.state.total}
					/>
				)}
			</Fragment>
		);
	}
}
function mapStateToProps({ transaction, orders, auth }) {
	console.log(auth);
	return { transaction, orders, auth };
}

export default connect(
	mapStateToProps,
	{ requestOrder }
)(Order);
