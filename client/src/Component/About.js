import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
export default class About extends Component {
	render() {
		return (
			<Fragment>
				<div class="navbarwrapper">
					<div class="tophalfcontentwrapper">
						<Link to="/">
							<div class="logowrapper">Indique</div>
						</Link>
					</div>
					<div class="bottomhalfcontentwrapper">
						<div className="navbarlinkwrapper">
							<Link className="navbarlink" to="/about">
								ABOUT
							</Link>

							<Link className="navbarlink" to="/booking">
								BOOKING
							</Link>

							<Link className="navbarlink" to="/menu">
								MENU
							</Link>

							<Link className="navbarlink" to="/order">
								DELIVERY
							</Link>
						</div>
					</div>
				</div>
				<div class="aboutbannerwrapper">
					<div class="aboutbannerheading">Our Story</div>
					<div class="aboutbannerquote">
						There is food and then there is dining, <br /> We know the
						difference ...
					</div>
				</div>
				<div class="aboutchefwrapper" />
				<div class="aboutchefrow">
					<img alt="imgchef1" class="aboutchefleft" src="assets/chef1.png" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Mihir kumar</span>
						<span class="aboutchefquote">
							He is an Executive chef of the nec restaurant. His primary role is
							in managing the overall kitchen. He is also responsible for
							managing different outlets of nec restaurant. Another role of him
							is to control kitchen cost and liaising with suppliers and
							creating the menus.
						</span>
					</div>
					<div class="aboutchefright" />
				</div>
				<div class="aboutchefrow">
					<div class="aboutchefleft" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Rakesh singh</span>
						<span class="aboutchefquote">
							He is the Sous-Chef which is the direct assistant of the main
							chef. He works according to assigned the duties of the head chef.
							He is responsible for scheduling the kitchen staff. He works in
							place of the head chef when he is out. His other roles are looking
							after the cleanliness, he also trains the entire staff.
						</span>
					</div>
					<img alt="imgchef1" class="aboutchefright" src="assets/chef2.png" />
				</div>
				<div class="aboutchefrow">
					<img alt="imgchef1" class="aboutchefleft" src="assets/chef3.png" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Ram Singh Gopal</span>
						<span class="aboutchefquote">
							He is a Commis Chef, which is a junior member of staff that works
							under a chef de partie in order to learn the ins and outs of a
							specific station. His work duties are Kitchen Porter and dish
							washer. His speciality is in Italian food.
						</span>
					</div>
					<div class="aboutchefright" />
				</div>
				<div class="aboutchefrow">
					<div class="aboutchefleft" />
					<div class="aboutcheftext">
						<span class="aboutchefname">Jacky </span>
						<span class="aboutchefquote">
							He is a chef de partie which sometimes is called “line cook”. He
							is in charge of a particular area of production. He is responsible
							for the making of the dishes present in the menu. His speciality
							is in north and south Indian food.
						</span>
					</div>
					<img alt="imgchef1" class="aboutchefright" src="assets/chef4.png" />
				</div>

				<div class="navbarwrapper">
					<div class="tophalfcontentwrapper">
						<div class="topleftcontentwrapper" />
					</div>
					<div class="bottomhalfcontentwrapper">
						<div class="navbarlinkwrapper">
							<a class="navbarlink" href="">
								<span class="glyphicon glyphicon-earphone" /> 7656576565
							</a>

							<a class="navbarlink" href=" ">
								This is a working project made for NEC Technologies by Group 4{" "}
							</a>

							<a class="navbarlink" href="">
								<span class="glyphicon glyphicon-envelope" /> hi@indique.com
							</a>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
