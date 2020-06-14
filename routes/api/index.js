const router = require("express").Router();
const projectRoutes = require("./project");

//Project routes
router.use("/project", projectRoutes);

module.exports = router;