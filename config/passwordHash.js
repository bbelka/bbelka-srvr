const bcrypt = require('bcrypt-nodejs');
const util = require('util');

const genSalt = util.promisify(bcrypt.genSalt);
const hash = util.promisify(bcrypt.hash);

const passwordHash = async (rawInput) => hash(rawInput, await genSalt(10), (err) => { if (err) console.log(err); });

module.exports = passwordHash;