const ModbusRTU = require("modbus-serial");

const meterdata = require("../data/meter.json");
const { env, port } = require("./variables");

/**
 * This is a simple Modbus overlay that allows us to create multiple instances of the client and open multiple streams of data
 */
class Modbus {
    constructor() {
        this.port = port;
        this.client = new ModbusRTU();
        this.environment = env;
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
     */
    connect = async (id) => {
        this.client
            .connectTCP(this.environment, { port: this.port })
            .then(() =>
                console.info(
                    `Meter Device id: ${id} . . . TCP Protocol Connected on port ${this.port}`
                )
            )
            .catch((error) => console.error(error.message));
        this.client.setID(id);

        await this.sleep(1000);
    };

    /**
     * Read the Holding Registry data from a given port
     * @param {number} port - port on the device
     * @return {float} serial data buffer
     */
    read = async (port) => {
        try {
            // wait before making request due to promise
            return await this.client.readHoldingRegisters(
                `${port}`,
                2,
                (error, data) => {
                    if (error)
                        console.error(
                            `Error reading holding register: ${
                                JSON.stringify(error)
                            }`
                        );
                    else {
                        console.info(
                            `Meter device id: ${this.client.getID()}, reading buffer: ${data.buffer.readFloatBE()} on serial port: ${port}`
                        );
                        return data.buffer.readFloatBE();
                    }
                }
            );
        } catch (error) {
            console.error(`Error reading holding register: ${error}`);
        }
    };

    /**
     * Read ALL ports on a given device at once
     */
    readAll = async () => {
        let bufferData = {};

        try {
            await Object.keys(meterdata)?.map(async (meter) => {
                // wait before making request due to promise
                await this.client.readHoldingRegisters(
                    `${meterdata[meter][0]}`,
                    2,
                    (error, data) => {
                        if (error)
                            console.error(
                                `Error reading holding register: ${JSON.stringify(
                                    error
                                )}`
                            );
                        else {
                            console.info(
                                `Meter device id: ${this.client.getID()}, reading buffer: ${data.buffer.readFloatBE()} on serial port: ${port}`
                            );
                        }
                        bufferData[meter] = { port, buffer };
                    }
                );
            });
        } catch (error) {
            console.error(`Error reading holding register: ${error}`);
        }

        return bufferData;
    };

    /**
     * Open a stream reading holding registry data every 1000ms
     * @param {number} port - optional
     * @return {Object<string: Object<number, number>>}
     */
    stream = async (port = 1) => {
        let bufferData = [];

        try {
            // output value to console
            if (port) bufferData.push(await this.readAll());
            else bufferData.push(await this.read(port));
            // wait 1000ms before get another device
            await this.sleep(1000);
        } catch (error) {
            // if error, handle them here (it should not)
            console.error(error);
        } finally {
            // after get all data from salve repeat it again
            setImmediate(() => {
                this.stream();
            });
        }

        return bufferData;
    };
}

module.exports = Modbus;
