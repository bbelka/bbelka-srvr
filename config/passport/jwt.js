// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

// const { User } = require('../../models');

// const opts = {};

// opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET;

// const authorizeJwtToken = (jwtPayload, done) => {

//     User.findById(jwtPayload._id)
//         .then(user => {
//             if (user) {
//                 return done(null, user);
//             }
//             return done(null, false);
//         })
//         .catch(err => {
//             console.log(err);
//             done(null, false);
//         });
// };

// module.exports = new JwtStrategy(opts, (authorizeJwtToken()));