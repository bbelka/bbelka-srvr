const router = require('express').Router();
const apiRoutes = require('./api');
const mailRoutes = require('./mailer');
const authRoutes = require('./auth')

//Mail route
router.use("/mail", mailRoutes);

//api route
router.use("/api", apiRoutes);

//auth route
router.use("/auth", authRoutes);

//readsessions
router.get("/readsessions", (req,res)=>{
    res.json(req.user)
});

module.exports = router;