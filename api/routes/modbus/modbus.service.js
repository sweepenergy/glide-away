const axios = require("axios");
const parser = require("../../utils/parser");
const { domain, env, modbus_port } = require("../../config/variables");
const Modbus = require("../../config/modbus");

exports.readAllHoldingRegisters = async (id) => {
    try {
        
    } catch (error) {
        throw error;
    }
};

exports.readHoldingRegister = async (id) => {
    try {
        
    } catch (error) {
        throw error;
    }
};

exports.startStream = async (id) => {
    try {
        
    } catch (error) {
        throw error;
    }
};

exports.connectToModbus = async (
    id,
    data,
    auth,
    port = modbus_port,
    environment = env
) => {
    try {
        // Setup connection to Modbus device
        const mb = new Modbus({ port, environment });
        let response = await mb.connect(id);

        if (response.status === "connected") {
            console.info(response.message);

            // Get Directory Information
            const directory = await axios({
                method: "get",
                url: `https://${domain}/directory/${data.directory_id}`,
                headers: {
                    Authorization: auth,
                },
            })
                .then((response) => parser.filterStatus(response.data))
                .catch((error) => {
                    throw error;
                });

            // TODO: start stream
            directory.stream.filter(key => key.name === "modbus data")
            console.log(directory)
        }
    } catch (error) {
        throw error;
    }
};
