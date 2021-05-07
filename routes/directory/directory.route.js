const express = require("express");
const controller = require("./directory.controller");

const router = express.Router();

router
    .route("/")
    .get(controller.getDirectories)
    .post(controller.createDirectory);

router.route("/verify").get(controller.verifyDirectorySetup);

router
    .route("/:id")
    .get(controller.getDirectory)
    .put(controller.updateDirectory)
    .delete(controller.deleteDirectory);

router
    .route("/:id/labels")
    .get(controller.getDirectoryLabels)
    .post(controller.attachLabelToDirectory);

router.route("/:id/labels/:label_id").delete(controller.deleteDirectoryLabel);

router
    .route("/:id/alerts")
    .get(controller.getDirectoryAlerts)
    .post(controller.createDirectoryAlert);

router
    .route("/:id/alerts/:alert_id")
    .get(controller.getDirectoryAlert)
    .delete(controller.deleteDirectoryAlert);

module.exports = router;
