const service = require("./user.service");

/**
 * Get all users in the Glide Away Database
 * @return {object} User data
 * @error Internal Server Error
 */
exports.getAllUsers = async (_, response) => {
    try {
        const serviceResponse = await service.getAllUsers();
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not fetch list of all users.\n=>    ${error}`);
    }
};

/**
 * Create a new user
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createUser = async (request, response) => {
    try {
        await service.createUser(request.body);
        return response.status(201).send("Ok");
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not create a new user.\n=>    ${error}`);
    }
};

/**
 * Get user based on user id in the Glide Away Database
 * @param {number} id
 * @return {array} List of Users
 * @error Internal Server Error
 */
exports.getUser = async (request, response) => {
    try {
        const serviceResponse = await service.getUser(request.query.id);
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not fetch user.\n=>    ${error}`);
    }
};

/**
 * Replace all the data on a given user with the new data
 * @param {number} id
 * @param {string?} firstName
 * @param {string?} lastName
 * @param {string?} email
 * @param {string?} password
 * @return {string} Status
 * @error Internal Server Error
 */
exports.replaceUser = async (request, response) => {
    try {
        await service.replaceUser(request.query.id, request.body);
        return response.status(201).send("Replaced");
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not replace all data in user.\n=>    ${error}`);
    }
};

/**
 * Update only specific fields of a given user
 * @param {number} id
 * @param {string?} firstName
 * @param {string?} lastName
 * @param {string?} email
 * @param {string?} password
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateUser = async (request, response) => {
    try {
        await service.updateUser(request.query.id, request.body);
        return response.status(201).send("Created");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[User] Could not update user's information.\n=>    ${error}`
            );
    }
};

/**
 * Delete all data associated with a given user
 * @param {number} id
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteUser = async (request, response) => {
    try {
        await service.deleteUser(request.query.id);
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not delete user.\n=>    ${error}`);
    }
};

/**
 * Get Account Authorization
 * @param {string} email
 * @param {string} password
 * @return {object} Authorization
 * @error Internal Server Error
 */
exports.getAuthorization = async (request, response) => {
    try {
        const serviceResponse = await service.getAuthorization(request.body);
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Account] Could not retrieve account authorization.\n=>    ${error}`
            );
    }
};

/**
 * Get account information
 * @param {string} schema
 * @header Basic Auth
 * @return {object} Account information
 * @error Internal Server Error
 */
exports.getAccountInformation = async (request, response) => {
    try {
        const serviceResponse = await service.getAccountInformation(
            request.query.schema
        );
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Account] Could not retrieve account information.\n=>    ${error}`
            );
    }
};

/**
 * Get all generated API keys
 * @header Basic Auth
 * @return {array} All API keys
 * @error Internal Server Error
 */
exports.getAPIKeys = async (request, response) => {
    try {
        const serviceResponse = await service.getAPIKeys(request.get("Authorization"));
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Account] Could not retrieve API keys.\n=>    ${error}`);
    }
};

/**
 * Create a new API Key
 * @param {array} globalAuth
 * @param {array} localAuth
 * @param {string} ttl
 * @param {string} name
 * @header Basic Auth
 * @return {object} API Key
 * @error Internal Server Error
 */
exports.createAPIKey = async (request, response) => {
    try {
        const serviceResponse = await service.createAPIKey(request.body);
        return response.status(201).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Account] Could not create a new API key.\n=>    ${error}`);
    }
};

/**
 * Delete an API Key
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteAPIKey = async (request, response) => {
    try {
        await service.deleteAPIKey(request.params[0]);
        return response.status(202).send("Accepted");
    } catch (error) {
        return response
            .status(500)
            .send(`[Account] Could not delete API key.\n=>    ${error}`);
    }
};

/**
 * Verify Authentication
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.verifyAuthentication = async (request, response) => {
    try {
        await service.verifyAuthentication(request.get("Authorization")); // TODO: untested to see if the 'a' should be capitalized or not
        return response.status(200).send("Ok");
    } catch (error) {
        return response
            .status(500)
            .send(`[Account] Could not verify authentication.\n=>    ${error}`);
    }
};

/**
 * Get API Key
 * @param {string} id
 * @header Basic Auth
 * @return {object} API Key
 * @error Internal Server Error
 */
exports.getAPIKey = async (request, response) => {
    try {
        const serviceResponse = await service.getAPIKey(request.params[0]);
        return response.status(200).json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[Account] Could not retrieve API key.\n=>    ${error}`);
    }
};

/**
 * Update account information
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} timezone
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateAccount = async (request, response) => {
    try {
        await service.updateAccount(request.query.id);
        return response.status(201).send("Updated");
    } catch (error) {
        return response
            .status(500)
            .send(
                `[Account] Could not update account information.\n=>    ${error}`
            );
    }
};
