const router = require("express").Router();
const localRoutes = require("./local");
const logoutRoute = require("./logout");
const jwtRoutes = require("./jwt")

// local routes
router.use("/login", localRoutes);

//logout
router.use("/logout", logoutRoute);

//new jwt routes
router.use("/jwt", jwtRoutes);

module.exports = router;