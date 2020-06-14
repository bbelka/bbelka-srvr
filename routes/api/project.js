const router = require("express").Router();
const projectsController = require("../../controllers/projectsController.js");

//project routes: '/api/project'
router.route("/")
    .get(projectsController.findAll)
    .post(projectsController.create);

//project rouges by ID: '/api/project/:id'
router.route("/:id")
    .get(projectsController.findById)
    .put(projectsController.update)
    .delete(projectsController.remove);

module.exports = router;