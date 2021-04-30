const ModbusRTU = require("modbus-serial");
const axios = require("axios");
const meterdata = require("../data/meter.json");
const { sweep_api, env, modbus_port } = require("./variables");

/**
 * This is a simple Modbus overlay that allows us to create multiple instances of the client and open multiple streams of data
 */
class Modbus {
    /**
     * @param {object} options - {port, environment}
     */
    constructor(options) {
        this.port = options.port || modbus_port;
        this.client = new ModbusRTU();
        this.environment = options.environment || env;
    }

    /**
     * Sleep is a function that starts a timer on a given ms time
     * @param {number} ms
     * @returns {Promise}
     */
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Sets up a new connection on a new device and readies the client for further instructions
     * @param {number} id - defines which device to read from
     * @return {object} {status, message}
     */
    connect = (id) =>
        new Promise(async (resolve, reject) => {
            await this.client
                .connectTCP(this.environment, { port: this.port })
                .catch((error) => {
                    reject({ status: "rejected", message: error.message });
                });
            this.client.setID(id);

            await this.sleep(1000);

            resolve({
                status: "connected",
                message: `Meter Device id: ${id} . . . TCP Protocol Connected on port ${
                    this.port
                } -- ${new Date().toLocaleString()}`,
            });
        }).catch((error) => error);

    /**
     * Read the Holding Registry data from a given port
     * @param {number} port - port on the device
     * @return {float} serial data buffer
     */
    read = (port) =>
        new Promise((resolve, reject) =>
            this.client.readHoldingRegisters(`${port}`, 2, (error, data) => {
                if (error)
                    reject(
                        `Error reading holding register: ${JSON.stringify(
                            error
                        )}`
                    );
                // console.info(
                // 	`Meter device id: ${this.client.getID()}, reading buffer:  on serial port: ${port}`
                // );
                resolve(data.buffer.readFloatBE());
            })
        );

    /**
     * Read ALL ports on a given device at once
     * @return {array<object>} serial data buffer for each port
     */
    readAll = () =>
        new Promise(async (resolve) => {
            let bufferData = {};
            // console.info(
            //     `Holding Registers for meter device id: ${this.client.getID()}`
            // );
            await Promise.all(
                Object.keys(meterdata).map(async (meter) => {
                    const response = await this.read(meterdata[meter][0]);
                    bufferData[meter] = await {
                        port: meterdata[meter][0],
                        buffer: response,
                    };
                })
            );

            resolve(bufferData);
        });

    /**
     * Open a stream reading holding registry data every 1000ms
     */
    stream = async (elapsed = 1000) => {
        console.info(
            `Reading all holding registers. Total time elapsed ${elapsed}ms.`
        );
        try {
            // output value to console
            const response = await this.readAll();
            console.table(response);
            // wait 1000ms before get another device
            await this.sleep(1000);
        } catch (error) {
            // if error, handle them here (it should not)
            console.error(error);
        } finally {
            // after get all data from salve repeat it again
            setImmediate(() => {
                this.stream(elapsed + 1000);
            });
        }
    };

    /**
     * Open a stream reading holding registry data every 1000ms
     */
    streamToDataset = async (readInterval, streamId, auth) => {
        try {
            // output value to console
            const response = await this.readAll();
            const time = new Date().toISOString();
            // console.info(
            //     `Reading all holding registers In: ${this.client.getID()}`
            // );

            // Ampere A
            let streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/ampere_a/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    timestamp: `${time}`,
                    sample: response.AmpsA.buffer,
                }),
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Ampere B
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/ampere_b/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.AmpsB.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Ampere C
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/ampere_c/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.AmpsC.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Watts 3 Total
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/watts_3_total/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.Watts3Total.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Var 3 Total
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/var_3_total/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.Var3Total.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Va 3 Total
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/va_3_total/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.Va3Total.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Power Factor
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/power_factor/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.PowerFactor.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Neutral Current
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/neutral_current/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.NeutralCurrent.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Watts A
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/watts_a/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.WattsA.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Watts B
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/watts_b/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.WattsB.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Watts C
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/watts_c/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.WattsC.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Var A
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/var_a/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VarA.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Var B
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/var_b/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VarB.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Var C
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/var_c/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VarC.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Va A
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/va_a/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VaA.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Va B
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/va_b/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VaB.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Va C
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/va_c/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.VaC.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Power Factor A
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/power_factor_a/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.PowerFactorA.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Power Factor B
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/power_factor_b/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.PowerFactorB.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // Power Factor C
            streamResponse = await axios({
                method: "post",
                url: `${sweep_api}/stream/${streamId}/ts/power_factor_c/dataset`,
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json",
                },
                data: {
                    timestamp: time,
                    sample: response.PowerFactorC.buffer,
                },
            })
                .then((response) => response.data.status === "ok")
                .catch((error) => {
                    throw error;
                });

            if (!streamResponse)
                throw "Failed to add metric data to stream from the device";

            // wait 1000ms before get another device
            await this.sleep(readInterval);
        } catch (error) {
            // if error, handle them here (it should not)
            console.error(error);
        } finally {
            // after get all data from salve repeat it again
            setImmediate(() => {
                this.streamToDataset(readInterval, streamId, auth);
            });
        }
    };
}

module.exports = Modbus;
