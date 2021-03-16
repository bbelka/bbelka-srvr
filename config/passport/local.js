const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

passport.use(
    new LocalStrategy(function (username, password, done) {
console.log(username, password);
        User.findOne({ username: username }, function (err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            // if (user.password != password) {
            //     return done(null, false);
            // }
            // console.log(user);

            // return done(null, user);
            if ( user && user.comparePassword( password ) ) {
                // user found, password is correct. do what you want to do
                return done(null, user);
            } else {
                // user not found or wrong password.
                console.log('Invalid Password');
                return done( null, false );
            }
        });
    })
);