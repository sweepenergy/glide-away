const axios = require("axios");
const parser = require("../../utils/parser");
const { domain } = require("../../config/variables");

exports.getDirectories = async () => {
    try {
        // TODO: get all directories
    } catch (error) {
        throw error;
    }
};

exports.createDirectory = async (data) => {
    try {
        // TODO: create a new directory with provided name and parent directory
    } catch (error) {
        throw error;
    }
};

exports.verifyDirectorySetup = (auth) =>
    new Promise(async (resolve, reject) => {
        // Get all directories
        let directories = await axios({
            method: "get",
            url: `https://${domain}/directory/home`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => reject(error));

        let hasModbusDirectory = false;
        let hasSensorsDirectory = false;
        let modbusResponse = {};
        let sensorsResponse = {};

        // Check if the required directories exist
        directories.directory.map((directory) => {
            switch (directory.name) {
                case "Modbus Devices": {
                    hasModbusDirectory = true;
                    modbusResponse = directory;
                }
                case "Sensors": {
                    hasSensorsDirectory = true;
                    sensorsResponse = directory;
                }
            }
        });

        // if no Modbus Devices Directory
        if (!hasModbusDirectory) {
            modbusResponse = await axios({
                method: "post",
                url: `https://${domain}/directory`,
                headers: {
                    Authorization: auth,
                },
                data: {
                    name: "Modbus Devices",
                    top_dir: "",
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => reject(error));
            hasModbusDirectory = true;
        }

        if (hasModbusDirectory) {
            let hasModbusStream = false;
            modbusResponse = await axios({
                method: "get",
                url: `https://${domain}/directory/${modbusResponse.id}`,
                headers: {
                    Authorization: auth,
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => reject(error));
            console.log(modbusResponse);
            modbusResponse.stream.map((s) => {
                if (s.name === "Devices") hasModbusStream = true;
            });

            if (!hasModbusStream) {
                await axios({
                    method: "post",
                    url: `https://${domain}/stream`,
                    headers: {
                        Authorization: auth,
                    },
                    data: {
                        directory_id: modbusResponse.directory_id,
                        name: "Devices",
                        inputDataVar: [
                            {
                                var_name: "device_name",
                                display_name: "Device Name",
                                description: "",
                                units: "unitless",
                                type: "text",
                            },
                            {
                                var_name: "device_read_interval",
                                display_name: "Device Read Interval",
                                description: "",
                                units: "unitless",
                                type: "number",
                            },
                            {
                                var_name: "device_port",
                                display_name: "Device Port",
                                description: "",
                                units: "unitless",
                                type: "number",
                            },
                            {
                                var_name: "device_env",
                                display_name: "Device Environment",
                                description: "",
                                units: "unitless",
                                type: "text",
                            },
                        ],
                    },
                }).catch((error) => reject(error));
            }
        }

        // if no Sensors Directory
        if (!hasSensorsDirectory) {
            sensorsResponse = await axios({
                method: "post",
                url: `https://${domain}/directory`,
                headers: {
                    Authorization: auth,
                },
                data: {
                    name: "Senors",
                    top_dir: "",
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => reject(error));
            hasSensorsDirectory = true;
        }

        if (modbusResponse !== {} && sensorsResponse !== {}) {
            directories = await axios({
                method: "get",
                url: `https://${domain}/directory/home`,
                headers: {
                    Authorization: auth,
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => reject(error));

            resolve(directories);
        } else {
            reject(
                "Initial Directories were not setup and was unable to configure account!!"
            );
        }
    });

exports.getDirectory = (id, auth) =>
    new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `https://${domain}/directory/${id}`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => resolve(parser.filterStatus(response.data)))
            .catch((error) => reject(error));
    });

exports.updateDirectory = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteDirectory = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getDirectoryLabels = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.attachLabelToDirectory = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteDirectoryLabel = async (id, labelId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getDirectoryAlerts = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.createDirectoryAlert = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getDirectoryAlert = async (id, alertId) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteDirectoryAlert = async (id, alertId) => {
    try {
    } catch (error) {
        throw error;
    }
};
