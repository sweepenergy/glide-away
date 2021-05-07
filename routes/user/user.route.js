const express = require("express");
const controller = require("./user.controller");

const router = express.Router();

router.route("/").get(controller.getAllUsers).post(controller.createUser);

router
    .route("/auth")
    .get(controller.getAccountInformation)
    .post(controller.getAuthorization)
    .put(controller.updateAccount);

router
    .route("/api_key")
    .get(controller.getAPIKeys)
    .post(controller.createAPIKey);

router
    .route("/api_key/:id")
    .get(controller.getAPIKey)
    .delete(controller.deleteAPIKey);

router.route("/verify").get(controller.verifyAuthentication);

router
    .route("/:id")
    .get(controller.getUser)
    .put(controller.replaceUser)
    .post(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;
