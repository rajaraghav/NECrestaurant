import React, { Component } from "react";
import LoginGoogle from "./LoginGoogle";
import { connect } from "react-redux";
import { signup } from "../../../Action/index";

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailValue: "",
			passwordValue: "",
			confirmPasswordValue: "",
			nameValue: "",
			phoneValue: ""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
			this
		);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}

	handleSignup(e) {
		let user = {
			email: this.state.emailValue,
			password: this.state.passwordValue,
			name: this.state.nameValue,
			phone: this.state.phoneValue
		};

		let EmailCheck = performEmailCheck(this.state.emailValue);
		let PasswordCheck = performPasswordCheck(this.state.passwordValue);
		let PasswordConfirmCheck = performPasswordConfirmCheck(
			this.state.passwordValue,
			this.state.confirmPasswordValue
		);
		let StringCheck = performStringCheck(this.state.nameValue);
		let PhoneCheck = performPhoneCheck(Number(this.state.phoneValue));

		if (!EmailCheck.success) {
			console.log("error", EmailCheck.message);
			this.props.displayLoginError(EmailCheck.message);
		} else if (!PasswordCheck.success) {
			console.log("error", PasswordCheck.message);
			this.props.displayLoginError(PasswordCheck.message);
		} else if (!PasswordConfirmCheck.success) {
			console.log("error", PasswordConfirmCheck.message);
			this.props.displayLoginError(PasswordConfirmCheck.message);
		} else if (!StringCheck.success) {
			console.log("error", StringCheck.message);
			this.props.displayLoginError(StringCheck.message);
		} else if (!PhoneCheck.success) {
			console.log("error", PhoneCheck.message);
			this.props.displayLoginError(PhoneCheck.message);
		} else {
			console.log("Data type ok");
			console.log(user);
			this.props.removeLoginWindowError();
			this.props.signup(user);
		}
		e.preventDefault();
	}

	handleEmailChange(e) {
		this.setState({ emailValue: e.target.value });
	}

	handleNameChange(e) {
		this.setState({ nameValue: e.target.value });
	}
	handlePhoneChange(e) {
		this.setState({ phoneValue: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ passwordValue: e.target.value });
	}
	handleConfirmPasswordChange(e) {
		this.setState({ confirmPasswordValue: e.target.value });
	}

	componentWillReceiveProps(props) {
		if (props.auth.message === "success") this.props.moveToLogin();
		else if (Number(props.auth) === 401)
			this.props.displayLoginError("User already exists");
		else this.props.displayLoginError("Server Error");
	}
	render() {
		return (
			<div class="signSignup">
				<div class="sH1">Indique</div>
				<div id="signupFormContainer" class="sdetails">
					<form onSubmit={this.handleSignup}>
						<input
							id="signupFormEmail"
							className="sEmail signupForm__Form--email"
							placeholder="email"
							type="email"
							value={this.state.emailValue}
							onChange={this.handleEmailChange}
						/>
						<br />
						<input
							id="signupFormPassword"
							className="sPass signupForm__Form--password"
							placeholder="password"
							type="password"
							value={this.state.passwordValue}
							onChange={this.handlePasswordChange}
						/>
						<br />
						<input
							id="signupFormConfirmPassword"
							className="sPass signupForm__Form--confirmPassword"
							placeholder="confirm password"
							type="password"
							value={this.state.confirmPasswordValue}
							onChange={this.handleConfirmPasswordChange}
						/>
						<br />
						<input
							id="signupFormName"
							className="sName signupForm__Form--name"
							placeholder="Name"
							type="text"
							value={this.state.nameValue}
							onChange={this.handleNameChange}
						/>
						<br />
						<input
							id="signupFormPhone"
							className="sMobileNo signupForm__Form--phone"
							placeholder="Phone"
							type="phone"
							value={this.state.phoneValue}
							onChange={this.handlePhoneChange}
						/>
						<br />
						<input
							id="submitS"
							type="submit"
							className="blogin"
							value="Sign up"
						/>
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
	return { auth };
}

function performEmailCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false, message: "Email poorly formatted" };
	var re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let ans = re.test(String(val).toLowerCase());
	return { success: ans, message: "Email is poorly formatted" };
}

function performPhoneCheck(val) {
	if (typeof val !== "number" || val === null || typeof val === "undefined") {
		console.log("nax", typeof val);
		return { success: false, message: "phone poorly formatted" };
	} else if (val.toString().split("").length !== 10) {
		console.log(val.toString().split("").length);
		return {
			success: false,
			message: "phone number must be atleast 10 digits"
		};
	} else return { success: true };
}

function performPasswordCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false, message: "password poorly formatted" };
	else if (val.split("").length < 5)
		return { success: false, message: "password too short" };
	return { success: true };
}

function performStringCheck(val) {
	if (typeof val !== "string" || val === null || typeof val === "undefined")
		return { success: false, message: "name can only contain alphabets" };
	else if (val.length < 1)
		return { success: false, message: "Name cannot be left empty" };
	/*else if ()
    return { success: false, message: "Name can only be an alphabet" };*/ else
		return { success: true };
}

function performPasswordConfirmCheck(val_1, val_2) {
	if (val_1 !== val_2)
		return { success: false, message: "passwords do not match" };
	else return { success: true };
}

export default connect(
	mapStateToProps,
	{ signup }
)(SignupForm);
