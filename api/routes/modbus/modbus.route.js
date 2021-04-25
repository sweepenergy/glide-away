const express = require("express");
const controller = require("./modbus.controller");

const router = express.Router();

router.route("/read").get(controller.readAllHoldingRegisters);

router.route("/read/:id").get(controller.readHoldingRegister);

router.route("/stream").get(controller.startStream);

router.route("/:id").get(controller.connectToModbus);

module.exports = router;
