const axios = require("axios");
const parser = require("../../utils/parser");
const { sweep_api } = require("../../config/variables");
const inputDataVar = require("../../data/stream.json");
const { query } = require("express");

exports.createStream = async (data) => {
    try {
        // Get Directory Information
        const directoryName = await axios({
            method: "get",
            url: `${sweep_api}/directory/${data.directory_id}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .then((response) => response.directory_name)
            .catch((error) => {
                throw error;
            });

        // Create a new stream
        return await axios({
            method: "post",
            url: `${sweep_api}/stream`,
            headers: {
                Authorization: auth,
            },
            data: {
                directory_id: data.directory_id,
                name: `${directoryName}'s Stream`,
                inputDataVar,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
};

exports.getAllDevices = (id, auth, query) =>
    new Promise(async (resolve, reject) => {
        let params = "";

        if (query) {
            params = "?";
            Object.keys(query).map((param, idx) => {
                params += `${param}=${query[param]}`;
                if (Object.keys(query).length - 1 !== idx) params += "&";
            });
        }

        let deviceNames = await axios({
            method: "get",
            url: `${sweep_api}/stream/${id}/ts/device_name/dataset${params}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.removeTimestamps(response.data.dataset))
            .catch((error) => reject(error));

        let deviceReadIntervals = await axios({
            method: "get",
            url: `${sweep_api}/stream/${id}/ts/device_read_interval/dataset${params}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.removeTimestamps(response.data.dataset))
            .catch((error) => reject(error));

        let devicePorts = await axios({
            method: "get",
            url: `${sweep_api}/stream/${id}/ts/device_port/dataset${params}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.removeTimestamps(response.data.dataset))
            .catch((error) => reject(error));

        let deviceEnvironments = await axios({
            method: "get",
            url: `${sweep_api}/stream/${id}/ts/device_env/dataset${params}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.removeTimestamps(response.data.dataset))
            .catch((error) => reject(error));

        let devices = deviceNames.map((device, idx) => {
            return {
                deviceName: device,
                deviceReadInterval: deviceReadIntervals[idx],
                devicePort: devicePorts[idx],
                deviceEnvironment: deviceEnvironments[idx],
            };
        });

        resolve(devices);
    });

exports.getStream = (id, auth) =>
    new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${sweep_api}/stream/${id}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => resolve(parser.filterStatus(response.data)))
            .catch((error) => reject(error));
    });

exports.updateStream = async (id, body) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteStream = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getStreamLabels = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createStreamLabel = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteStreamLabel = async (id, labelId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getStreamAlerts = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteStreamAlert = async (id, alertId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createTimeSeries = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.updateTimeSeries = async (id, varName, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteTimeSeries = async (id, varName) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesDatasets = async (
    id,
    varName,
    span,
    timeScale = null,
    rangeStart = null,
    rangeEnd = null,
    limit = null,
    groupBy = null,
    tsType = null
) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createTimeSeriesDataset = async (id, varName, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesLabels = async (id, tsParam) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createTimeSeriesLabel = async (id, tsParam, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteTimeSeriesLabel = async (id, tsParam, labelId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesAlerts = async (id, tsParam) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createTimeSeriesAlert = async (id, tsParam, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.updateTimeSeriesAlert = async (id, tsParam) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesAlert = async (id, tsParam, alertId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteTimeSeriesAlert = async (id, tsParam, alertId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesDatasetLabels = async (
    id,
    tsParam,
    span = null,
    rangeStart = null,
    rangeEnd = null,
    limit = null,
    timeScale = null
) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createTimeSeriesDatasetLabel = async (id, tsParam, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesDatasetLabel = async (
    id,
    tsParam,
    labelId,
    span = null,
    rangeStart = null,
    rangeEnd = null,
    limit = null,
    timeScale = null
) => {
    try {
    } catch (error) {
        throw error;
    }
};
