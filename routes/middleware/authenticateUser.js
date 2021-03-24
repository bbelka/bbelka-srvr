const passport = require('passport');
const { pass } = require('../../config/passport/jwt');

const authenticateUser = passport.authenticate('jwt', { session: false });

module.exports = authenticateUser;