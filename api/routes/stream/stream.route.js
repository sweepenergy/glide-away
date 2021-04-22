const express = require("express");
const controller = require("./stream.controller");

const router = express.Router();

router.route("/").post(controller.getStreams);

router
    .route("/:id")
    .get(controller.getStream)
    .put(controller.updateStream)
    .delete(controller.deleteStream);

router
    .route("/:id/labels")
    .get(controller.getStreamLabels)
    .post(controller.createStreamLabel);

router.route("/:id/labels/:label_id").delete(controller.deleteStreamLabel);

router.route("/:id/alerts").get(controller.getStreamAlerts);

router.route("/:id/alerts/:alert_id").delete(controller.deleteStreamAlert);

router.route("/:id/ts").post(controller.createTimeSeries);

router
    .route("/:id/ts/:var_name")
    .put(controller.updateTimeSeries)
    .delete(controller.deleteTimeSeries);

router
    .route("/:id/ts/:var_name/dataset")
    .get(controller.getTimeSeriesDatasets)
    .post(controller.createTimeSeriesDataset);

router
    .route("/:id/ts/:ts_param/labels")
    .get(controller.getTimeSeriesLabels)
    .post(controller.createTimeSeriesLabel);

router
    .route("/:id/ts/:ts_param/labels/:label_id")
    .delete(controller.deleteTimeSeriesLabel);

router
    .route("/:id/ts/:ts_param/alerts")
    .get(controller.getTimeSeriesAlerts)
    .post(controller.createTimeSeriesAlert)
    .put(controller.updateTimeSeriesAlert);

router
    .route("/:id/ts/:ts_param/alerts/:alert_id")
    .get(controller.getTimeSeriesAlert)
    .delete(controller.deleteTimeSeriesAlert);

router
    .route("/:id/ts/:ts_param/dataset/labels")
    .get(controller.getTimeSeriesDatasetLabels)
    .post(controller.createTimeSeriesDatasetLabel);

router
    .route("/:id/ts/:ts_param/dataset/labels/:label_id")
    .get(controller.getTimeSeriesDatasetLabel);

module.exports = router;
