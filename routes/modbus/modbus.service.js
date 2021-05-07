const axios = require("axios");
const parser = require("../../utils/parser");
const { sweep_api, env, modbus_port } = require("../../config/variables");
const Modbus = require("../../config/modbus");
const inputDataVar = require("../../data/stream.json");

exports.readAllHoldingRegisters = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.readHoldingRegister = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.startStream = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.addModbusDevice = (devices_stream_id, sensors_directory_id, data, auth) =>
    new Promise(async (resolve, reject) => {
        const time = new Date().toISOString();
        let response = await axios({
            method: "post",
            url: `${sweep_api}/stream/${devices_stream_id}/ts/device_name/dataset`,
            headers: {
                Authorization: auth,
            },
            data: {
                timestamp: time,
                sample: data.deviceName,
            },
        })
            .then((response) => response.data.status === "ok")
            .catch((error) => reject(error));

        if (!response) reject("Failed to add directory name");

        response = await axios({
            method: "post",
            url: `${sweep_api}/stream/${devices_stream_id}/ts/device_read_interval/dataset`,
            headers: {
                Authorization: auth,
            },
            data: {
                timestamp: time,
                sample: data.deviceReadInterval,
            },
        })
            .then((response) => response.data.status === "ok")
            .catch((error) => reject(error));

        if (!response) reject("Failed to add directory read interval");

        response = await axios({
            method: "post",
            url: `${sweep_api}/stream/${devices_stream_id}/ts/device_port/dataset`,
            headers: {
                Authorization: auth,
            },
            data: {
                timestamp: time,
                sample: data.devicePort,
            },
        })
            .then((response) => response.data.status === "ok")
            .catch((error) => reject(error));

        if (!response) reject("Failed to add directory port");

        response = await axios({
            method: "post",
            url: `${sweep_api}/stream/${devices_stream_id}/ts/device_env/dataset`,
            headers: {
                Authorization: auth,
            },
            data: {
                timestamp: time,
                sample: data.deviceEnvironment,
            },
        })
            .then((response) => response.data.status === "ok")
            .catch((error) => reject(error));

        if (!response) reject("Failed to add directory environment");

        const newDeviceDirectory = await axios({
            method: "post",
            url: `${sweep_api}/directory`,
            headers: {
                Authorization: auth,
            },
            data: {
                name: data.deviceName,
                dirtop: sensors_directory_id,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => reject(error));

        const stream = await axios({
            method: "post",
            url: `${sweep_api}/stream`,
            headers: {
                Authorization: auth,
            },
            data: {
                directory_id: newDeviceDirectory.id,
                name: `${data.deviceName}`,
                inputDataVar,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => reject(error));

        // TODO: handle this better by validating the form data when they are creating a new device
        // this only breaks on a stream
        if (stream.status == 'error_duplicate_name')
            reject("Duplicate Name, please use a different device name")

        const mb = new Modbus({
            port: data.devicePort,
            environment: `${data.deviceEnvironment}`,
        });

        response = await mb.connect(data.deviceNumber);
        console.log(response.message);

        await mb.streamToDataset(
            data.deviceReadInterval,
            stream.stream_id,
            auth
        );

        resolve(
            "New Device has been registered and a stream has started collecting data from it."
        );
    });

exports.connectToModbus = async (
    id,
    data,
    auth,
    port = modbus_port,
    environment = env
) => {
    try {
        // Setup connection to Modbus device
        const mb = new Modbus({ port, environment });
        let response = await mb.connect(id);

        if (response.status === "connected") {
            console.info(response.message);

            // Get Directory Information
            const directory = await axios({
                method: "get",
                url: `${sweep_api}/directory/${data.directory_id}`,
                headers: {
                    Authorization: auth,
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => {
                    throw error;
                });

            // TODO: start stream
            directory.stream.filter((key) => key.name === "modbus data");
            console.log(directory);
        }
    } catch (error) {
        throw error;
    }
};
