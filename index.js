require("dotenv").config();
const path = require("path");

const app = require("./config/express");
const { express_port, env } = require("./config/variables");

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/app/build/index.html"));
});

// listen to requests
app.listen(express_port, async () => {
    console.info(
        `Glide Away listening for requests on port ${express_port} in ${env} mode!`
    );
});

process.on("warning", (error) => console.warn(error));

process.on("exit", (code) => {
    console.error(`Exit with error code ${code}!`);
    // process.exit(code);
});

process.on("unhandledRejection", (error) =>
    console.error(`Unhandled Rejection: ${error.message}`)
);
