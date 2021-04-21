const service = require("./stream.service");

/**
 * Get all streams
 * @param {object} streamData
 * @header Basic Auth
 * @return {string} Stream Id
 * @error Internal Server Error
 */
exports.getStreams = async (request, response) => {
    try {
        const serviceResponse = await service.getStreams(request.body);
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch stream id.\n\t ${error}`);
    }
};

/**
 * Get specific stream
 * @param {string} id
 * @header Basic Auth
 * @return {object} Stream Data
 * @error Internal Server Error
 */
exports.getStream = async (request, response) => {
    try {
        const serviceResponse = await service.getStream(request.params.id);
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch stream data.\n\t ${error}`);
    }
};

/**
 * Update stream data
 * @param {string} id
 * @param {object} gps
 * @param {string} name
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateStream = async (request, response) => {
    try {
        await service.updateStream(request.params.id, request.body);
        return response.status(201).send("Updated");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not update stream.\n\t ${error}`);
    }
};

/**
 * Delete stream data
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteStream = async (request, response) => {
    try {
        await service.deleteStream(request.params.id);
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete stream.\n\t ${error}`);
    }
};

/**
 * Get stream labels
 * @param {string} id
 * @header Basic Auth
 * @return {object} Stream Labels
 * @error Internal Server Error
 */
exports.getStreamLabels = async (request, response) => {
    try {
        const serviceResponse = await service.getStreamLabels(
            request.params.id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch stream labels.\n\t ${error}`);
    }
};

/**
 * Create new label for stream
 * @param {string} id
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createStreamLabel = async (request, response) => {
    try {
        await service.createStreamLabel(request.params.id, request.body);
        return response.status(201).send("Ok");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not create stream label.\n\t ${error}`);
    }
};

/**
 * Delete stream label
 * @param {string} id
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteStreamLabel = async (request, response) => {
    try {
        await service.deleteStreamLabel(
            request.params.id,
            request.params.label_id
        );
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete stream label.\n\t ${error}`);
    }
};

/**
 * Get all stream alerts
 * @param {string} id
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.getStreamAlerts = async (request, response) => {
    try {
        const serviceResponse = await service.getStreamAlerts(
            request.params.id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch all alerts.\n\t ${error}`);
    }
};

/**
 * Get specific alert for a given directory
 * @param {string} id
 * @param {string} alertId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteStreamAlert = async (request, response) => {
    try {
        await service.deleteStreamAlert(
            request.params.id,
            request.params.alert_id
        );
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete specific alert.\n\t ${error}`);
    }
};

/**
 * Create a new series of time
 * @param {string} id
 * @param {object} timeSeriesConfig
 * @header Basic Auth
 * @return {string} Stream ID
 * @error Internal Server Error
 */
exports.createTimeSeries = async (request, response) => {
    try {
        const serviceResponse = await service.createTimeSeries(
            request.params.id,
            request.body
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not create a new series of time.\n\t ${error}`
            );
    }
};

/**
 * Update the information of a time series stream
 * @param {string} id
 * @param {string} varName
 * @param {object} timeSeriesData
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateTimeSeries = async (request, response) => {
    try {
        await service.updateTimeSeries(
            request.params.id,
            request.params.var_name,
            request.body
        );
        return response.status(201).send('Updated');
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not update time series information.\n\t ${error}`);
    }
};

/**
 * Delete the information on a time series stream
 * @param {string} id
 * @param {string} varName
 * @header Basic Auth
 * @return {object} Stream ID and ts_param
 * @error Internal Server Error
 */
exports.deleteTimeSeries = async (request, response) => {
    try {
        const serviceResponse = await service.deleteTimeSeries(
            request.params.id,
            request.params.var_name
        );
        return response.status(202).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete time series stream.\n\t ${error}`);
    }
};

/**
 * Get dataset for specific time series stream
 * @param {string} id
 * @param {string} varName
 * @param {string?} span
 * @param {string?} timeScale
 * @param {string?} rangeStart
 * @param {string?} rangeEnd
 * @param {number?} limit
 * @param {string?} groupBy
 * @param {string?} tsType
 * @header Basic Auth
 * @return {object} Dataset of Time Series Stream
 * @error Internal Server Error
 */
exports.getTimeSeriesDatasets = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesDatasets(
            request.params.id,
            request.params.var_name,
            request.query.span ? request.query.span : null,
            request.query.time_scale ? request.query.time_scale : null,
            request.query.range_start ? request.query.range_start : null,
            request.query.range_end ? request.query.range_end : null,
            request.query.limit ? request.query.limit : null,
            request.query.group_by ? request.query.group_by : null,
            request.query.ts_type ? request.query.ts_type : null
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch dataset for time series stream.\n\t ${error}`);
    }
};

/**
 * Create a time series dataset
 * @param {string} id
 * @param {string} varName
 * @param {object} data
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createTimeSeriesDataset = async (request, response) => {
    try {
        await service.createTimeSeriesDataset(
            request.params.id,
            request.params.var_name,
            request.body
        );
        return response.status(201).send("ok");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not insert time series data.\n\t ${error}`);
    }
};

/**
 * Get labels based on tsParam value
 * @param {string} id
 * @param {string} tsParam
 * @header Basic Auth
 * @return {object} Label Data
 * @error Internal Server Error
 */
exports.getTimeSeriesLabels = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesLabels(
            request.params.id,
            request.params.ts_param
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch time series labels.\n\t ${error}`);
    }
};

/**
 * Create a new label
 * @param {string} id
 * @param {string} tsParam
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createTimeSeriesLabel = async (request, response) => {
    try {
        await service.createTimeSeriesLabel(
            request.params.id,
            request.params.ts_param,
            request.body
        );
        return response.status(201).send("ok");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not create a new time series label.\n\t ${error}`);
    }
};

/**
 * Delete time series label
 * @param {string} id
 * @param {string} tsParam
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteTimeSeriesLabel = async (request, response) => {
    try {
        await service.deleteTimeSeriesLabel(
            request.params.id,
            request.params.ts_param,
            request.params.label_id
        );
        return response.status(202).send('Accepted');
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete label.\n\t ${error}`);
    }
};

/**
 * Get time series alerts
 * @param {string} id
 * @param {string} tsParam
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.getTimeSeriesAlerts = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesAlerts(
            request.params.id,
            request.params.ts_param
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch requested alert.\n\t ${error}`);
    }
};

/**
 * Create a new alert event for a piece of time series data
 * @param {string} id
 * @param {string} tsParam
 * @param {object} alertData
 * @header Basic Auth
 * @return {string} Alert ID
 * @error Internal Server Error
 */
exports.createTimeSeriesAlert = async (request, response) => {
    try {
        const serviceResponse = await service.createTimeSeriesAlert(
            request.params.id,
            request.params.ts_param,
            request.body
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not create new alert event.\n\t ${error}`);
    }
};

/**
 * Update time series alerts
 * @param {string} id
 * @param {string} tsParam
 * @param {object} alertData
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.updateTimeSeriesAlert = async (request, response) => {
    try {
        const serviceResponse = await service.updateTimeSeriesAlert(
            request.params.id,
            request.params.ts_param
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not update alert data.\n\t ${error}`);
    }
};

/**
 * Get specific alert for a time series
 * @param {string} id
 * @param {string} tsParam
 * @param {string} alertId
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.getTimeSeriesAlert = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesAlert(
            request.params.id,
            request.params.ts_param,
            request.params.alert_id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch requested alert.\n\t ${error}`);
    }
};

/**
 * Delete specific alert for a given time series
 * @param {string} id
 * @param {string} tsParam
 * @param {string} alertId
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.deleteTimeSeriesAlert = async (request, response) => {
    try {
        const serviceResponse = await service.deleteTimeSeriesAlert(
            request.params.id,
            request.params.ts_param,
            request.params.alert_id
        );
        return response.status(202).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete requested alert.\n\t ${error}`);
    }
};

/**
 * Get all dataset specific labels
 * @param {string} id
 * @param {string} tsParam
 * @param {string} span
 * @param {string} range_start
 * @param {string} range_end
 * @param {number} limit
 * @param {string} time_scale
 * @header Basic Auth
 * @return {object} Dataset Labels
 * @error Internal Server Error
 */
exports.getTimeSeriesDatasetLabels = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesDatasetLabels(
            request.params.id,
            request.params.ts_param,
            request.query.span ? request.query.span : null,
            request.query.range_start ? request.query.range_start : null,
            request.query.range_end ? request.query.range_end : null,
            request.query.limit ? request.query.limit : null,
            request.query.time_scale ? request.query.time_scale : null
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch requested dataset labels.\n\t ${error}`);
    }
};

/**
 * Create a new dataset label
 * @param {string} id
 * @param {string} tsParam
 * @param {string} ts_start
 * @param {string} ts_end
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createTimeSeriesDatasetLabel = async (request, response) => {
    try {
        const serviceResponse = await service.createTimeSeriesDatasetLabel(
            request.params.id,
            request.params.ts_param,
            request.body
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not create label for dataset.\n\t ${error}`);
    }
};

/**
 * Get specific label for a given dataset
 * @param {string} id
 * @param {string} tsParam
 * @param {string} labelId
 * @param {string} span
 * @param {string} range_start
 * @param {string} range_end
 * @param {number} limit
 * @param {string} time_scale
 * @header Basic Auth
 * @return {object} Dataset Label
 * @error Internal Server Error
 */
exports.getTimeSeriesDatasetLabel = async (request, response) => {
    try {
        const serviceResponse = await service.getTimeSeriesDatasetLabel(
            request.params.id,
            request.params.ts_param,
            request.params.label_id,
            request.query.span ? request.query.span : null,
            request.query.range_start ? request.query.range_start : null,
            request.query.range_end ? request.query.range_end : null,
            request.query.limit ? request.query.limit : null,
            request.query.time_scale ? request.query.time_scale : null
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch requested dataset label.\n\t ${error}`);
    }
};
