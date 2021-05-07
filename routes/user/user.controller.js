const service = require("./user.service");

/**
 * Get all users in the Glide Away Database
 * @return {object} User data
 * @error Internal Server Error
 */
exports.getAllUsers = (_, response) =>
    new Promise((resolve, reject) => {
        service
            .getAllUsers()
            .then((serviceResponse) =>
                resolve(response.status(200).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[User] Could not fetch list of all users.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Create a new user
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @return {string} Status
 * @error Internal Server Error
 */
exports.createUser = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .createUser(request.body)
            .then((_) => resolve(response.status(201).send("Ok")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[User] Could not create a new user.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Get user based on user id in the Glide Away Database
 * @param {number} id
 * @return {array} List of Users
 * @error Internal Server Error
 */
exports.getUser = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .getUser(request.query.id)
            .then((serviceResponse) =>
                resolve(response.status(200).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(`[User] Could not fetch user.\n\t=>    ${error}`)
                )
            );
    });

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
exports.replaceUser = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .replaceUser(request.query.id, request.body)
            .then((_) => resolve(response.status(201).send("Replaced")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[User] Could not replace all data in user.\n\t=>    ${error}`
                        )
                )
            );
    });

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
exports.updateUser = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .updateUser(request.query.id, request.body)
            .then((_) => resolve(response.status(201).send("Created")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[User] Could not update user's information.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Delete all data associated with a given user
 * @param {number} id
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteUser = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .deleteUser(request.query.id)
            .then((_) => resolve(response.status(202).send("Accepted")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(`[User] Could not delete user.\n\t=>    ${error}`)
                )
            );
    });

/**
 * Get Account Authorization
 * @param {string} email
 * @param {string} password
 * @return {object} Authorization
 * @error Internal Server Error
 */
exports.getAuthorization = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .getAuthorization(request.body)
            .then((serviceResponse) =>
                resolve(response.status(201).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not retrieve account authorization.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Get account information
 * @param {string} schema
 * @header Basic Auth
 * @return {object} Account information
 * @error Internal Server Error
 */
exports.getAccountInformation = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .getAccountInformation(request.query.schema)
            .then((serviceResponse) =>
                resolve(response.status(200).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not retrieve account information.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Get all generated API keys
 * @header Basic Auth
 * @return {array} All API keys
 * @error Internal Server Error
 */
exports.getAPIKeys = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .getAPIKeys(request.get("Authorization"))
            .then((serviceResponse) =>
                resolve(response.status(200).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not retrieve API keys.\n\t=>    ${error}`
                        )
                )
            );
    });

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
exports.createAPIKey = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .createAPIKey(request.get("Authorization"))
            .then((serviceResponse) =>
                resolve(response.status(201).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not create a new API key.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Delete an API Key
 * @param {string} id
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.deleteAPIKey = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .deleteAPIKey(request.params[0])
            .then((_) => resolve(response.status(202).send("Accepted")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not delete API key.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Verify Authentication
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.verifyAuthentication = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .verifyAuthentication(request.get("Authorization"))
            .then((_) => resolve(response.status(200).send("Ok")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not verify authentication.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Get API Key
 * @param {string} id
 * @header Basic Auth
 * @return {object} API Key
 * @error Internal Server Error
 */
exports.getAPIKey = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .getAPIKey(request.params[0])
            .then((serviceResponse) =>
                resolve(response.status(200).json(serviceResponse))
            )
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not retrieve API key.\n\t=>    ${error}`
                        )
                )
            );
    });

/**
 * Update account information
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} timezone
 * @header Basic Auth
 * @return {string} Status
 * @error Internal Server Error
 */
exports.updateAccount = (request, response) =>
    new Promise((resolve, reject) => {
        service
            .updateAccount(request.query.id)
            .then((_) => resolve(response.status(201).send("Updated")))
            .catch((error) =>
                reject(
                    response
                        .status(500)
                        .send(
                            `[Account] Could not update account information.\n\t=>    ${error}`
                        )
                )
            );
    });
