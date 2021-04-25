const axios = require("axios");
const parser = require("../../utils/parser");
const { domain } = require("../../config/variables");

exports.getAllUsers = async () => {
    try {
        return { msg: "test" };
    } catch (error) {
        throw error;
    }
};

exports.createUser = async (data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getUser = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.replaceUser = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.updateUser = async (id, data) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getAuthorization = (data) =>
    new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `https://${domain}/account/auth`,
            headers: {
                "Content-Type": "application/json",
            },
            data,
        })
            .then((response) => resolve(parser.filterStatus(response.data)))
            .catch((error) => reject(error));
    });

exports.getAccountInformation = async (schema) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.getAPIKeys = (auth) =>
    new Promise(async (resolve, reject) => {
        const response = await axios({
            method: "get",
            url: `https://${domain}/account/auth/api_key`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => reject(error));

        const apiKey = response.active.filter(
            (key) =>
                key.ttl == "until_revoked" &&
                key.status == "active" &&
                key.scope.global.includes("get") &&
                key.scope.global.includes("post") &&
                key.scope.global.includes("put") &&
                key.scope.global.includes("delete")
        )[0];

        resolve({
            api_key: apiKey.api_key,
            api_token: apiKey.session_token_ref,
        });
    });

exports.createAPIKey = (auth) =>
    new Promise(async (resolve, reject) => {
        const response = await axios({
            method: "post",
            url: `https://${domain}/account/auth/api_key`,
            headers: {
                Authorization: auth,
            },
            data: {
                global_auth: ["get", "put", "post", "delete"],
                local_auth: [],
                ttl: "",
                name: "Glide Away",
            },
        })
            .then((response) => parser.filterStatus(response.data))
            .catch((error) => reject(error));

        resolve({
            api_key: response.session_api_id,
            api_token: response.session_api_token,
        });
    });

exports.deleteAPIKey = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.verifyAuthentication = (auth) =>
    new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `https://${domain}/account/verify_auth`,
            headers: {
                Authorization: auth,
            },
        })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });

exports.getAPIKey = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};

exports.updateAccount = async (id) => {
    try {
    } catch (error) {
        throw error;
    }
};
