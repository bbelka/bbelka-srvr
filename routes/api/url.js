const router = require("express").Router();
const urlsController = require("../../controllers/urlsController.js"); 

//url routes: '/api/url'
router.route("/")
    // .get(urlsController.findAll)
    .post(urlsController.create);

//url routes by ID: '/api/url/:id'
router.route("/:id")
    .get(urlsController.findById)
    .put(urlsController.update)
    .delete(urlsController.remove);


module.exports = router;