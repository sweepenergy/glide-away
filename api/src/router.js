const express = require("express");

const userRoutes = require("./routes/user/user.route");
const directoryRoutes = require("./routes/directory/directory.route");
const streamRoutes = require("./routes/stream/stream.route");

const router = express.Router();

/**
 * GET /api/status
 */
router.get("/status", (request, response) => response.send("ok"));

/**
 * GET /api/user
 */
router.get("/user", userRoutes);

/**
 * GET /api/directory
 */
router.get("/directory", directoryRoutes);

/**
 * GET /api/stream
 */
router.get("/stream", streamRoutes);

module.exports = router;