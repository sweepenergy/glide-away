const express = require("express");
const controller = require("./user.controller");

const router = express.Router();

router.route("/").get(controller.getAllUsers).post(controller.createUser);

router
    .route("/:id")
    .get(controller.getUser)
    .put(controller.replaceUser)
    .post(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;
