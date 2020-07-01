const router = require("express").Router();
const projectRoutes = require("./project");
const urlRoutes = require("./url");
const userRoutes = require("./user")

//Project routes
router.use("/project", projectRoutes);

//Url routes
router.use("/url", urlRoutes);

//User routes
router.use("/user", userRoutes);

module.exports = router;