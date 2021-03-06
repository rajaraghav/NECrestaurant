import React, { Component, Fragment } from "react";
import DataRow from "./DataRow";
import moment from "moment";
import { IconContext } from "react-icons";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { connect } from "react-redux";

import { fetchBookings } from "../../../../Action/index";
import * as firebase from "firebase";
var config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_KEY,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_KEY,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_KEY,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_KEY,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_KEY
};
firebase.initializeApp(config);
class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valuesArray: [],
			ordersArray: [],
			moment: moment(),
			date: "",
			fbBookRef: "bookings/",
			fbOrderRef: "orders/",
			ordersWindowVisible: false
		};
		this.clickNext = this.clickNext.bind(this);
		this.clickPrev = this.clickPrev.bind(this);
		this.moveToBookings = this.moveToBookings.bind(this);
		this.moveToOrders = this.moveToOrders.bind(this);
	}
	componentDidMount() {
		console.log("dadas");
		if (this.state.date === "")
			this.setState({ date: this.state.moment.format("DD-MM-YY") });
	}
	moveToBookings() {
		console.log("hit");
		if (this.state.ordersWindowVisible)
			this.setState({ ordersWindowVisible: false });
	}

	moveToOrders() {
		if (!this.state.ordersWindowVisible)
			this.setState({ ordersWindowVisible: true });
	}
	componentDidUpdate() {
		console.log("updated");
		let db = firebase.database();
		if (this.state.valuesArray.length === 0) {
			let dbRef = db.ref().child(this.state.fbBookRef + this.state.date);
			let dbRef2 = db.ref().child(this.state.fbBookRef);
			dbRef2.on("child_changed", snapshot => {
				console.log(snapshot.val());
				let childData = snapshot.val();
				console.log("child", childData);
				let newData = childData[this.state.date];
				console.log("newData", newData);
				this.url =
					"http://s000.tinyupload.com/download.php?file_id=98495897958912879705&t=9849589795891287970501599";
				this.audio = new Audio(this.url);
				//this.audio.play();
				//TODO Find a supported hosting site
				console.log("playing");
				this.setState({ valuesArray: [newData] });
			});
			dbRef.on("child_added", snapshot => {
				console.log(snapshot.val());
				let ans = this.state.valuesArray;
				ans.push(snapshot.val());
				this.setState({ valuesArray: ans });
			});
		}
		if (this.state.ordersArray.length === 0) {
			let dbRefOrder = db.ref().child(this.state.fbOrderRef + this.state.date);
			let dbRefOrder2 = db.ref().child(this.state.fbOrderRef);
			dbRefOrder2.on("child_changed", snapshot => {
				console.log(snapshot.val());
				let childData = snapshot.val();
				console.log("child", childData);
				let newData = childData[this.state.date];
				console.log("newData", newData);
				this.url =
					"http://s000.tinyupload.com/download.php?file_id=98495897958912879705&t=9849589795891287970501599";
				this.audio = new Audio(this.url);
				//this.audio.play();
				//TODO Find a supported hosting site
				console.log("playing");
				this.setState({ ordersArray: [newData] });
			});
			dbRefOrder.on("child_added", snapshot => {
				console.log(snapshot.val());
				let ans = this.state.ordersArray;
				ans.push(snapshot.val());
				this.setState({ ordersArray: ans });
			});
		}
	}
	clickNext() {
		let currDay = this.state.moment;
		let tomorrow = moment(currDay).add(1, "days");
		console.log(tomorrow);
		this.setState({ moment: tomorrow, date: tomorrow.format("DD-MM-YY") });
		this.props.fetchBookings({ date: tomorrow.format("DD-MM-YY") });
	}
	clickPrev() {
		let currDay = this.state.moment;
		let yesteday = moment(currDay).add(-1, "days");
		console.log(yesteday);
		this.setState({ moment: yesteday, date: yesteday.format("DD-MM-YY") });
		this.props.fetchBookings({ date: yesteday.format("DD-MM-YY") });
	}
	renderData() {
		if (
			this.state.valuesArray[0] === 404 ||
			this.state.valuesArray[0] === "404"
		) {
			return (
				<div className="adminPanel__panel--fetchError">
					No data exists for the specified date.
				</div>
			);
		}
		let key = -1;
		return this.state.valuesArray.map(data => {
			let dat = [];
			for (let slot in data) {
				let currSlot = data[slot];
				for (let booking in currSlot) {
					key += 1;
					let currBooking = currSlot[booking];
					currBooking.slot = slot;
					currBooking.date = this.state.date;
					dat.push(
						<div className="adminPanel__panel__data" key={key}>
							<DataRow renderOrder={false} data={currBooking} />
						</div>
					);
				}
			}
			return dat;
		});
	}
	renderOrdersData() {
		if (
			this.state.ordersArray[0] === 404 ||
			this.state.ordersArray[0] === "404"
		) {
			return (
				<div className="adminPanel__panel--fetchError">
					No data exists for the specified date.
				</div>
			);
		}
		let key = -1;
		return this.state.ordersArray.map(data => {
			let dat = [];
			for (let slot in data) {
				let currSlot = data[slot];
				for (let order in currSlot) {
					key += 1;
					let currOrder = currSlot[order];
					currOrder.time = slot;
					currOrder.date = this.state.date;
					dat.push(
						<div className="adminPanel__panel__data" key={key}>
							<DataRow renderOrder data={currOrder} />
						</div>
					);
				}
			}
			return dat;
		});
	}
	componentWillReceiveProps(props) {
		console.log(props);
		if (!this.state.ordersWindowVisible)
			this.setState({ valuesArray: [props.bookings] });
		if (this.state.ordersWindowVisible)
			this.setState({ ordersArray: [props.orders] });
	}
	render() {
		if (!this.state.ordersWindowVisible) {
			return (
				<Fragment>
					<div className="adminPanel__panel__date">
						<div className="adminPanel__panel__container">
							<div
								onClick={this.clickPrev}
								className="adminPanel__panel__date--prev"
							>
								<IconContext.Provider
									value={{ color: "red", className: "global-class-name" }}
								>
									<Fragment>
										<FiChevronLeft />
									</Fragment>
								</IconContext.Provider>
							</div>
							<div className="adminPanel__panel__date--date">
								{this.state.date}
							</div>
							<div
								onClick={this.clickNext}
								className="adminPanel__panel__date--next"
							>
								<IconContext.Provider
									value={{ color: "red", className: "global-class-name" }}
								>
									<Fragment>
										<FiChevronRight />
									</Fragment>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="adminPanel__panel__header">
						<div className="adminPanel__panel__bookings__container">
							<div className="adminPanel__panel__heading">#Booking Id</div>
							<div className="adminPanel__panel__heading">Name</div>
							<div className="adminPanel__panel__heading">Phone</div>
							<div className="adminPanel__panel__heading">Email</div>
							<div className="adminPanel__panel__heading">Seats</div>
							<div className="adminPanel__panel__heading adminPanel__panel__heading--slot">
								Slot
							</div>
							<div className="adminPanel__panel__heading">Action</div>
						</div>
					</div>
					<div className="adminPanel__panel__body">{this.renderData()}</div>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<div className="adminPanel__panel__date">
					<div className="adminPanel__panel__container">
						<div
							onClick={this.clickPrev}
							className="adminPanel__panel__date--prev"
						>
							<IconContext.Provider
								value={{ color: "red", className: "global-class-name" }}
							>
								<Fragment>
									<FiChevronLeft />
								</Fragment>
							</IconContext.Provider>
						</div>
						<div className="adminPanel__panel__date--date">
							{this.state.date}
						</div>
						<div
							onClick={this.clickNext}
							className="adminPanel__panel__date--next"
						>
							<IconContext.Provider
								value={{ color: "red", className: "global-class-name" }}
							>
								<Fragment>
									<FiChevronRight />
								</Fragment>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<div className="adminPanel__panel__header">
					<div className="adminPanel__panel__bookings__container">
						<div className="adminPanel__panel__heading">#Order Id</div>
						<div className="adminPanel__panel__heading">Name</div>
						<div className="adminPanel__panel__heading">Phone</div>
						<div className="adminPanel__panel__heading">Email</div>
						<div className="adminPanel__panel__heading">Items</div>
						<div className="adminPanel__panel__heading adminPanel__panel__heading--slot">
							Slot
						</div>
						<div className="adminPanel__panel__heading">Action</div>
					</div>
				</div>
				<div className="adminPanel__panel__body">{this.renderOrdersData()}</div>
			</Fragment>
		);
	}
}
function mapStateToProps({ bookings, orders }) {
	console.log(bookings, orders);
	return { bookings, orders };
}
export default connect(
	mapStateToProps,
	{ fetchBookings },
	null,
	{ withRef: true }
)(Panel);
