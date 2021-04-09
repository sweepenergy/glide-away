const WebSocket = require("ws");
require("dotenv").config();

const { connected, warning, termination } = require("./src/chalk");
const Modbus = require("./src/modbus");
const meterdata = require("./data/meter.json");

const meterdatalist = Object.keys(meterdata);
const mb = new Modbus();
const socket = new WebSocket(
    `${process.env.ENDPOINT}/?auth_user=${process.env.API_KEY}&auth_key=${process.env.API_TOKEN}`
);

const main = async () => {
    await mb.connect(1);
    await meterdatalist.map(
        async (meter) => await mb.read(meterdata[meter][0])
    );
};

socket.onopen = (error) => {
    if (!error) console.info(connected(`Sending to server`));
};

socket.onmessage = (event) => {
    console.log(`${event.data}`);

    let response = JSON.parse(event.data);

    if (
        response["action_url"] == "/account/verify_auth" &&
        response["status"] == "ok"
    ) {
        console.info(`Starting Sweep WebSocket Realtime Session`);

        const message = {
            ws_action: "watch",
            watch_streams: ["3abeb1e3-9a77-47bc-ba1d-18fe9812f8c0"],
        };

        socket.send(JSON.stringify(message));
        console.log(`Creating a Watch Stream`);

        // Get Home Directory
        const TEST_MESSAGE = {
            action_url: "/directory/home",
            http_type: "GET",
            unique_query_id: "12345",
        };
        socket.send(JSON.stringify(TEST_MESSAGE));
        console.log("Sending GET message");
    } else {
        console.warn(
            warning(`Unable to verify your account on this real time stream. Try again.`)
        );
    }
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.info(
            termination(
                `[close] Connection closed cleanly, code=${event.code}, reason=${event.reason}`
            )
        );
    } else {
        console.warn(warning(`[close] Connection died`));
    }
};

socket.onerror = (error) => {
    console.error(`[error] ${error.message}`);
};

main();
