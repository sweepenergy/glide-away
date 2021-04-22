const axios = require("axios");
const parser = require("../../utils/parser");
const { domain } = require("../../config/variables");

exports.getAllUsers = async () => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.createUser = async (data) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.getUser = async (id) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.replaceUser = async (id, data) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.updateUser = async (id, data) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.getAuthorization = async (data) => {
    try {
        return await axios({
            method: "post",
            url: `https://${domain}/account/auth`,
            headers: {
                "Content-Type": "application/json",
            },
            data,
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
};

exports.getAccountInformation = async (schema) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.getAPIKeys = async (auth) => {
    try {
        let response = await axios({
            method: "get",
            url: `https://${domain}/account/auth/api_key`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => {
                throw error;
            });

        const apiKey = response.active.filter(
            (key) =>
                key.ttl == "until_revoked" &&
                key.status == "active" &&
                key.scope.global.includes("get") &&
                key.scope.global.includes("post") &&
                key.scope.global.includes("put") &&
                key.scope.global.includes("delete")
        )[0];

        return { api_key: apiKey.api_key, api_token: apiKey.session_token_ref };
    } catch (error) {
        throw error;
    }
};

exports.createAPIKey = async (data) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.deleteAPIKey = async (id) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.verifyAuthentication = async (auth) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.getAPIKey = async (id) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};

exports.updateAccount = async (id) => {
    try {
        // TODO: Add SQL Queries here
    } catch (error) {
        throw error;
    }
};
