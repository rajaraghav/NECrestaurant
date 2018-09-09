const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
	app.post("/api/login", passport.authenticate("local-login"), (req, res) => {
		let currUser = {
			email: req.user.email,
			name: req.user.name,
			credits: req.user.credits
		};
		res.send(currUser);
	});
	app.post(
		"/api/signup",
		passport.authenticate("local-signup", { session: false }),
		async (req, res) => {
			savedUser = await User.findOne({ email: req.user.email });
			savedUser.name = req.body.name;
			savedUser.phone = req.body.phone;
			savedUser.save();
			res.status(200).send("success");
		}
	);

	app.get(
		"/api/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/checkserver");
		}
	);

	app.get("/api/logout", requireLogin, (req, res) => {
		console.log(req.user);
		req.logout();
		console.log(req.user);
		res.redirect("/checkserver");
	});

	app.get("/api/current_user", requireLogin, (req, res) => {
		const currUser = {};
		currUser.email = req.user.email;
		currUser.credits = req.user.credits;
		currUser.name = req.user.name;
		res.status(200).send(currUser);
	});
};
