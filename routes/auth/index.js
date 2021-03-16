const router = require("express").Router();
const localRoutes = require("./local");
const logoutRoute = require("./logout")

// local routes
router.use("/login", localRoutes);

//logout
router.use("/logout", logoutRoute);

module.exports = router;