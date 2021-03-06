import React, { Component } from "react";
import LoginGoogle from "./LoginGoogle";
import { connect } from "react-redux";
import { login } from "../../../Action/index";
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			passwordValue: ""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	handleLogin(e) {
		console.log(this.state);
		let user = {
			email: this.state.emailValue,
			password: this.state.passwordValue
		};

		let PasswordCheck = performPasswordCheck(this.state.passwordValue);
		let EmailCheck = performEmailCheck(this.state.emailValue);

		if (!EmailCheck.success) {
			console.log("error", EmailCheck.message);
			this.props.displayLoginError(EmailCheck.message);
		} else if (!PasswordCheck.success) {
			console.log("error", PasswordCheck.message);
			this.props.displayLoginError(PasswordCheck.message);
		} else {
			console.log("Data types ok");
			this.props.removeLoginWindowError();
			console.log(user);
			this.props.login(user);
		}

		e.preventDefault();
	}

	handleEmailChange(e) {
		this.setState({ emailValue: e.target.value });
	}
	handlePasswordChange(e) {
		this.setState({ passwordValue: e.target.value });
	}
	componentWillReceiveProps(props) {
		console.log(props);
	}
	render() {
		return (
			<div class="sign">
				<div class="sH1">Indique</div>
				<div class="sdetails">
					<form onSubmit={this.handleLogin}>
						<input
							id="loginFormEmail"
							class="sEmail"
							type="name"
							name="email"
							placeholder="email"
							value={this.state.emailValue}
							onChange={this.handleEmailChange}
						/>
						<br />
						<input
							id="loginFormPassword"
							class="sPass"
							type="password"
							name="pass"
							placeholder="Password"
							value={this.state.passwordValue}
							onChange={this.handlePasswordChange}
						/>
						<br />
						<button
							onClick={this.handleLogin}
							id="submitL"
							class="blogin"
							type="button"
						>
							Login
						</button>
					</form>
					<div class="orlineL" />
					<div class="or">OR</div>
					<div class="orlineR" />
					<LoginGoogle />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	console.log(auth);
	return { auth };
}

function performPasswordCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false, message: "password poorly formatted" };
	else if (val.split("").length < 0)
		return { success: false, message: "password field cannot be left Empty" };
	else if (val.split("").length < 5)
		return { success: false, message: "password is too short" };
	else return { success: true };
}
function performEmailCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false };
	let re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let k = re.test(String(val).toLowerCase());
	if (k === true) return { success: true };
	else
		return {
			success: false,
			message: "the email is poorly formated"
		};
}

export default connect(
	mapStateToProps,
	{ login }
)(LoginForm);
