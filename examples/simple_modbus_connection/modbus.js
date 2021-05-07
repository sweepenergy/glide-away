const ModbusRTU = require("modbus-serial");

const meterdata = require("../api/data/meter.json");

/**
 * This is a simple Modbus overlay that allows us to create multiple instances of the client and open multiple streams of data
 */
class Modbus {
	constructor(options) {
		this.port = options.port;
		this.client = new ModbusRTU();
		this.environment = options.environment;
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
				// 	`Meter device id: ${this.client.getID()}, reading buffer: ${data.buffer.readFloatBE()} on serial port: ${port}`
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
			console.info(
				`Holding Registers for meter device id: ${this.client.getID()}`
			);
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
	stream = async (running = 1000) => {
		console.info(
			`Reading all holding registers. Total time elapsed ${running}ms.`
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
				this.stream(running + 1000);
			});
		}
	};
}

module.exports = Modbus;
