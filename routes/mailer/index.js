const router = require('express').Router();
const sendRoute = require('./send')

router.use('/send', sendRoute);

module.exports = router;