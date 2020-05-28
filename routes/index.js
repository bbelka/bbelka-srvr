const router = require('express').Router();
const mailRoutes = require('./mailer');

//Mail route
router.use("/mail", mailRoutes);

module.exports = router;