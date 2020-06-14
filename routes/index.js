const router = require('express').Router();
const apiRoutes = require('./api');
const mailRoutes = require('./mailer');

//Mail route
router.use("/mail", mailRoutes);

//api route
router.use("/api", apiRoutes);

module.exports = router;