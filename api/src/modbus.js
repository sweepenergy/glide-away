const ModbusRTU = require("modbus-serial");
const chalk = require("chalk");
const meterdata = require("../data/meter.json");
const meterdatalist = Object.keys(meterdata);

/**
 * This is a simple Modbus overlay that allows us to create multiple instances of the client and open multiple streams of data
 */
class Modbus {
    constructor() {
        this.port = process.env.PORT || 5020;
        this.client = new ModbusRTU();
        this.environment = () => {
            switch (process.env.NODE_ENV) {
                case "docker":
                    return "host.docker.internal";
                case "prod":
                case "production":
                    return "some_production_url";
                case "dev":
                case "development":
                default:
                    return "localhost";
            }
        };
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
            .connectTCP(this.environment(), { port: this.port })
            .then(() =>
                console.info(
                    `Meter Device id: ${id} . . . TCP Protocol ` +
                        chalk.keyword("orange")("Connected") +
                        ` on port ${chalk.green(this.port)}\n`
                )
            )
            .catch((error) => console.error(chalk.red(error.message)));
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
                            `Error reading holding register: ${chalk.red(
                                JSON.stringify(error)
                            )}`
                        );
                    else {
                        console.info(
                            chalk.white("Meter device id: ") +
                                chalk.blue(this.client.getID()) +
                                chalk.white(", reading buffer: ") +
                                chalk.yellow(data.buffer.readFloatBE()) +
                                chalk.white(" on serial port: ") +
                                chalk.green(port)
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
            await meterdatalist.map(async (meter) => {
                // wait before making request due to promise
                await this.client.readHoldingRegisters(
                    `${meterdata[meter][0]}`,
                    2,
                    (error, data) => {
                        if (error)
                            console.error(
                                `Error reading holding register: ${chalk.red(
                                    JSON.stringify(error)
                                )}`
                            );
                        else {
                            console.info(
                                chalk.white.bold("Data [1099, 2]: ") +
                                    `${chalk.blue(JSON.stringify(data))}` +
                                    chalk.white.bold(", buffer: ") +
                                    `${chalk.yellow(data.buffer.readFloatBE())}`
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
            console.error(chalk.red(error));
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
