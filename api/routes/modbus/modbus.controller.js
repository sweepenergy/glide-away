const service = require("./modbus.service");

/**
 * Read all holding registers
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.readAllHoldingRegisters = async (request, response) => {
    try {
        const serviceResponse = await service.readAllHoldingRegisters(
            request.get("Authorization")
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Modbus] Could not read all of the holding registers.\n\t=>    ${error}`
            );
    }
};

/**
 * Read a specific holding register
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.readHoldingRegister = async (request, response) => {
    try {
        const serviceResponse = await service.readHoldingRegister(
            request.params.id,
            request.get("Authorization")
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Modbus] Could not read specific holding register.\n\t=>    ${error}`
            );
    }
};

/**
 * Start a stream reading the data every said interval of time
 * @param {object} streamData
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.startStream = async (request, response) => {
    try {
        const serviceResponse = await service.startStream(
            request.get("Authorization")
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Modbus] Could not start a read stream.\n\t=>    ${error}`);
    }
};

/**
 * Connect to the Modbus device
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.connectToModbus = async (request, response) => {
    try {
        const serviceResponse = await service.connectToModbus(
            request.params.id,
            request.body,
            request.get("Authorization")
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Modbus] Could not fetch stream id.\n\t=>    ${error}`);
    }
};
