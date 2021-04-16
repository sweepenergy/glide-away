const service = require("./directory.service");

/**
 * Get list of available directories
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
                `[Directory] Could not fetch list of available Directories.\n\t ${error}`
            );
    }
};

/**
 * Create a new directory
 * @param {string} name
 * @param {string?} parent_directory
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
            .send(`[Directory] Could not create a new directory.\n\t ${error}`);
    }
};

/**
 * Get specific directory based on id
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
            .send(`[Directory] Could not fetch directory.\n\t ${error}`);
    }
};

/**
 * Update specific directory based on id
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
            .send(`[Directory] Could not update directory.\n\t ${error}`);
    }
};

/**
 * Delete Directory at given id
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
            .send(`[Directory] Could not delete directory.\n\t ${error}`);
    }
};

/**
 * Get all labels for a given directory
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
                `[Directory] Could not fetch labels for given directory.\n\t ${error}`
            );
    }
};

/**
 * Add a new label to a directory
 * @return {string} Status
 * @error Internal Server Error
 */
exports.attachLabelToDirectory = async (request, response) => {
    try {
        await service.attachLabelToDirectory(request.params.id);
        return response.status(200).send("ok");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not attach label to directory.\n\t ${error}`
            );
    }
};

/**
 * Delete label from directory
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
                `[Directory] Could not delete label from directory.\n\t ${error}`
            );
    }
};

/**
 * Get directory alerts
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
                `[Directory] Could not fetch directory alerts.\n\t ${error}`
            );
    }
};

/**
 * Create a new alert for a directory
 * @return {object} Directories Available
 * @error Internal Server Error
 */
exports.createDirectoryAlert = async (request, response) => {
    try {
        const serviceResponse = await service.createDirectoryAlert(
            request.params.id
        );
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not create a new alert for a directory.\n\t ${error}`
            );
    }
};

/**
 * Get specific alert for a given directory
 * @return {object} Alert Data
 * @error Internal Server Error
 */
exports.getDirectoryAlert = async (request, response) => {
    try {
        const serviceResponse = await service.getDirectoryAlert(
            request.params.id, request.params.alert_id
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not fetch requested alert.\n\t ${error}`
            );
    }
};

/**
 * Delete directory alert
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteDirectoryAlert = async (request, response) => {
    try {
        await service.deleteDirectoryAlert(
            request.params.id, request.params.alert_id
        );
        return response.status(202).send('Accepted');
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Directory] Could not delete alert for given directory.\n\t ${error}`
            );
    }
};
