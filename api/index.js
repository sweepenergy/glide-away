require("dotenv").config();
require("./config/socket");

const app = require("./config/express");
const { port, env } = require("./config/variables");

// listen to requests
app.listen(port, () =>
    console.info(
        `Glide Away listening for requests on port ${port} in ${env} mode!`
    )
);

process.on("warning", (error) => console.warn(error));

process.on("exit", (code) => {
    console.error(`Exit with error code ${code}!`);
    process.exit(code);
});

process.on("unhandledRejection", (error) => console.error(`Unhandled Rejection: ${error.message}`));