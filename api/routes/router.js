const express = require("express");
const axios = require("axios");

const userRoutes = require("./user/user.route");
const directoryRoutes = require("./directory/directory.route");
const streamRoutes = require("./stream/stream.route");
const { domain } = require("../config/variables");

const router = express.Router();

/**
 * GET /api/status
 * @return {string} Status
 */
router.get("/status", (_, response) => response.status(200).send("ok"));
router.get("/health", async (request, response) => {
    let data = await axios({
        method: "get",
        url: `https://${domain}/platform/healthcheck`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
                request.body.username + ":" + request.body.password
            )}`,
        },
    })
        .then((response) => response.data)
        .catch((error) => error);

    return data?.status === "ok" ? response.status(200).json(data) : response.status(500).send(data);
});

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
