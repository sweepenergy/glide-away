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
    port: process.env.PORT || 5020,
    api: {
        key: process.env.API_KEY,
        token: process.env.API_TOKEN,
    },
    endpoint: process.env.ENDPOINT
}