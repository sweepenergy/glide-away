const service = require("./directory.service");

/**
 * Get list of available directories
 * @header Basic Auth
 * @return {object} Directories Available
 * @error Internal Server Error
 */
exports.getDirectories = async (_, response) => {
    try {
        const serviceResponse = await service.getDirectories();
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not fetch list of available Directories.\n=>    ${error}`
            );
    }
};

/**
 * Create a new directory
 * @param {string} name
 * @param {string?} parent_directory
 * @header Basic Auth
 * @return {object} Directory ID
 * @error Internal Server Error
 */
exports.createDirectory = async (request, response) => {
    try {
        const serviceResponse = await service.createDirectory(request.body);
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not create a new directory.\n=>    ${error}`
            );
    }
};

/**
 * Get specific directory based on id
 * @param {string} id
 * @header Basic Auth
 * @return {object} Directory
 * @error Internal Server Error
 */
exports.getDirectory = async (request, response) => {
    try {
        const serviceResponse = await service.getDirectory(request.params.id);
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not fetch directory.\n=>    ${error}`);
    }
};

/**
 * Update specific directory based on id
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateDirectory = async (request, response) => {
    try {
        await service.updateDirectory(request.params.id, request.body);
        return response.status(201).send("Updated");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not update directory.\n=>    ${error}`);
    }
};

/**
 * Delete Directory at given id
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteDirectory = async (request, response) => {
    try {
        await service.deleteDirectory(request.params.id);
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[Directory] Could not delete directory.\n=>    ${error}`);
    }
};

/**
 * Get all labels for a given directory
 * @param {string} id
 * @header Basic Auth
 * @return {object} Directory Labels
 * @error Internal Server Error
 */
exports.getDirectoryLabels = async (request, response) => {
    try {
        const serviceResponse = await service.getDirectoryLabels(
            request.params.id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not fetch labels for given directory.\n=>    ${error}`
            );
    }
};

/**
 * Add a new label to a directory
 * @param {string} id
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.attachLabelToDirectory = async (request, response) => {
    try {
        await service.attachLabelToDirectory(request.params.id, request.body);
        return response.status(200).send("ok");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not attach label to directory.\n=>    ${error}`
            );
    }
};

/**
 * Delete label from directory
 * @param {string} id
 * @param {string} labelId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteDirectoryLabel = async (request, response) => {
    try {
        await service.deleteDirectoryLabel(
            request.params.id,
            request.params.label_id
        );
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not delete label from directory.\n=>    ${error}`
            );
    }
};

/**
 * Get directory alerts
 * @param {string} id
 * @header Basic Auth
 * @return {object} Directory Alerts
 * @error Internal Server Error
 */
exports.getDirectoryAlerts = async (request, response) => {
    try {
        const serviceResponse = await service.getDirectoryAlerts(
            request.params.id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not fetch directory alerts.\n=>    ${error}`
            );
    }
};

/**
 * Create a new alert for a directory
 * @param {string} id
 * @param {object} alertConfig
 * @header Basic Auth
 * @return {object} Directories Available
 * @error Internal Server Error
 */
exports.createDirectoryAlert = async (request, response) => {
    try {
        const serviceResponse = await service.createDirectoryAlert(
            request.params.id,
            request.body
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not create a new alert for a directory.\n=>    ${error}`
            );
    }
};

/**
 * Get specific alert for a given directory
 * @param {string} id
 * @param {string} alertId
 * @header Basic Auth
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.getDirectoryAlert = async (request, response) => {
    try {
        const serviceResponse = await service.getDirectoryAlert(
            request.params.id,
            request.params.alert_id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not fetch requested alert.\n=>    ${error}`
            );
    }
};

/**
 * Delete directory alert
 * @param {string} id
 * @param {string} alertId
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteDirectoryAlert = async (request, response) => {
    try {
        await service.deleteDirectoryAlert(
            request.params.id,
            request.params.alert_id
        );
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not delete alert for given directory.\n=>    ${error}`
            );
    }
};
