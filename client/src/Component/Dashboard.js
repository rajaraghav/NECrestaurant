import React, { Component, Fragment } from "react";
import Footer from "./Footer/Footer";
import { Link } from "react-router-dom";
import Header from "./Header/Header";
class Dashboard extends Component {
	render() {
		return (
			<Fragment>
				<div className="pagewrapper">
					<div className="navbarwrapper">
						<div className="tophalfcontentwrapper">
							<Header />
						</div>
					</div>
					<div className="bottomhalfcontentwrapper">
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
				<div className="featuredboxwrapper">
					<div className="leftwrapper">
						<div className="featuredheadingwrapper">Today's Specials</div>
						<div className="featureddetailswrapper">
							<div className="itemheading">
								Creamy Salmon and Mushroom Fettucine
							</div>
							<div className="details">
								Placeholder text about fettucine and what it is and other stuff
								and dietary info maybe. Placeholder text about fettucine and
								what it is and other stuff and dietary info maybe.
							</div>
						</div>
						<div className="featuredpricewrapper">Rs. 179/-</div>
					</div>
					<div className="rightwrapper">
						<img
							src="assets/todaysspecial.png"
							alt="Cinque Terre"
							width="100%"
						/>
					</div>
				</div>
				<div className="testimonialswrapper">
					<div className="testimonialsheadingwrapper">Testimonials</div>
					<div className="gridwrapwrapper">
						<div className="gridwrapper">
							<div className="griditem">
								<img
									className="reviewavatar"
									src="assets/akc.jpg"
									alt="Review Avatar"
								/>
								<div className="reviewtext">
									<center>
										It's Located near the Startbucks on Boulevard Road. There's
										always rush, and parking is a headache. ut then i've been
										coming here for two years now, and it's always worth it.
									</center>
								</div>
							</div>
							<div className="griditem">
								<img
									className="reviewavatar"
									src="assets/akc1.jpg"
									alt="Review Avatar"
								/>
								<div className="reviewtext">
									<center>
										Had dinner with Girl friends. Menu is perfect, something for
										everyone. Service was awesome and Jason was very
										accommodating. Will be back definitely!
									</center>
								</div>
							</div>
							<div className="griditem">
								<img
									className="reviewavatar"
									src="assets/akc2.jpg"
									alt="Review Avatar"
								/>
								<div className="reviewtext">
									<center>I went with my friends it's amazing.</center>
								</div>
							</div>
							<div className="griditem">
								<img
									className="reviewavatar"
									src="assets/akc3.jpg"
									alt="Review Avatar"
								/>
								<div className="reviewtext">
									<center>
										The food was absolutely wonderful, from preparation to
										presentation, very pleasing. Much love from Gremany.
									</center>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="finalwrapper">
					<div className="bottomleftwrapper">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14035.719692802442!2d77.0528806!3d28.4213713!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x539fa5a15e331403!2sIndique!5e0!3m2!1sen!2sin!4v1537100505729"
							width="100%"
							title="maps"
							height="680px"
							frameBorder="0"
							allowFullScreen
						/>
					</div>
					<div className="bottomrightwrapper">
						<script src="https://cdn.lightwidget.com/widgets/lightwidget.js" />
						<iframe
							src="//lightwidget.com/widgets/8b957057e118514f9b9c7b3b8b647a15.html"
							scrolling="no"
							title="insta"
							allowTransparency
							class="lightwidget-widget"
							width="100%"
						/>
					</div>
				</div>
				<div className="navbarwrapper">
					<div className="tophalfcontentwrapper">
						<div className="topleftcontentwrapper" />
					</div>
					<div className="bottomhalfcontentwrapper">
						<div className="navbarlinkwrapper">
							<a className="navbarlink" href="">
								<span className="glyphicon glyphicon-earphone" /> 7656576565
							</a>

							<p className="navbarlink" href=" ">
								This is a working project made for NEC Technologies by Group 4{" "}
							</p>

							<a className="navbarlink" href="">
								<span className="glyphicon glyphicon-envelope" /> hi@indique.com
							</a>
							<Footer className="navbarlink" style={{ width: "100px" }} />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default Dashboard;
