const service = require("./user.service");

exports.getAllUsers = async (request, response) => {
    try {
        const serviceResponse = await service.getAllUsers();
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not fetch list of all users.\n ${error}`);
    }
};

exports.createUser = async (request, response) => {
    try {
        const serviceResponse = await service.createUser(request.body);
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not create a new user.\n ${error}`);
    }
};

exports.getUser = async (request, response) => {
    try {
        const serviceResponse = await service.getUser(request.query.id);
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not fetch user.\n ${error}`);
    }
};

exports.replaceUser = async (request, response) => {
    try {
        const serviceResponse = await service.replaceUser(
            request.query.id,
            request.body
        );
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not replace all data in user.\n ${error}`);
    }
};

exports.updateUser = async (request, response) => {
    try {
        const serviceResponse = await service.updateUser(
            request.query.id,
            request.body
        );
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not update user's information.\n ${error}`);
    }
};

exports.deleteUser = async (request, response) => {
    try {
        const serviceResponse = await service.deleteUser(request.query.id);
        return response.json(serviceResponse);
    } catch (error) {
        return response
            .status(500)
            .send(`[User] Could not delete user.\n ${error}`);
    }
};
