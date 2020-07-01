const router = require("express").Router();
const usersController = require("../../controllers/usersController.js"); 

//user routes: '/api/user'
router.route("/")
    // .get(usersController.findAll)
    .post(usersController.create);

//user rouges by ID: '/api/user/:id'
router.route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.remove);

module.exports = router;