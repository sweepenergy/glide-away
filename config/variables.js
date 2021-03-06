const path = require("path");

// import .env variables
require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});

const environment = () => {
    switch (process.env.NODE_ENV) {
        case "docker":
            return "host.docker.internal";
        case "prod":
        case "production":
            return "some_production_url";
        case "dev":
        case "development":
        default:
            return "localhost";
    }
};

module.exports = {
    env: environment(),
    express_port: process.env.EXPRESS_PORT || 3001,
    modbus_port: process.env.MODBUS_PORT || 5020,
    api: {
        key: process.env.API_KEY,
        token: process.env.API_TOKEN,
    },
    sweep_api: process.env.SWEEP_API
}