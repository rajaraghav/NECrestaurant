import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Link className="navbarlink" id="adminHref" to="/adminLogin">
				Admin Login
			</Link>
		);
	}
}
