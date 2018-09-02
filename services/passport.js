const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				email: profile.emails[0].value
			});
			console.log("existing", existingUser);
			if (existingUser) {
				if (existingUser.googleId === null) {
					console.log("i am existing but don't have account", existingUser);
					//he already has an account just update google info
					const user = existingUser;
					user.googleId = profile.id;
					user.name = profile.displayName;
					await new User(user).save();
					return done(null, user);
				} else return done(null, existingUser);
			} else {
				const user = await new User({
					googleId: profile.id,
					email: profile.emails[0].value,
					name: profile.displayName,
					credits: 0
				}).save();
				done(null, user);
			}
		}
	)
);

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			nameField: "name",
			passReqToCallback: true
		},
		async (req, email, password, name, done) => {
			try {
				const existingUser = await User.findOne({ email: email });
				if (existingUser) {
					return done(JSON.stringify({ message: "already exists" }), false);
				}
				bcrypt.hash(password, saltRounds, async function(err, hash) {
					if (err) return done(err, null);
					let newUser = {
						email: email,
						password: hash,
						name: name
					};
					const user = await new User(newUser).save();
					return done(null, user);
				});
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				const existingUser = await User.findOne({ email: email });
				console.log(password);
				if (existingUser) {
					console.log(existingUser);
					bcrypt.compare(password, existingUser.password, function(err, res) {
						if (err) return done(err, null);
						console.log(res);
						if (!res) return done(null, false);

						return done(null, existingUser);
					});
				}
			} catch (err) {
				done(err, null);
			}
		}
	)
);