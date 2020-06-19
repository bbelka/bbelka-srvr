const router = require("express").Router();
const projectRoutes = require("./project");
const urlRoutes = require("./url");

//Project routes
router.use("/project", projectRoutes);

//Url routes
router.use("/url", urlRoutes);

module.exports = router;