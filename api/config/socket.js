const WebSocket = require("ws");
const Modbus = require("./modbus");
const { endpoint, api } = require("./variables");

const mb = new Modbus();
const socket = new WebSocket(
    `${endpoint}/?auth_user=${api.key}&auth_key=${api.token}`
);

let modbusCounter = 1;
socket.onopen = async (event) => {
    console.info(`[Open] Sending to server`);
    await mb.connect(modbusCounter);
    await modbusCounter++;
    await mb.readAll();
    await mb.connect(modbusCounter);
    await mb.readAll();
};

socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    console.log(response);

    // Check the status of the incoming message
    if (response.status.toLowerCase() === "ok") {
        // Determine which type of message we are dealing with
        if (response?.action_url) {
            // Handle all the different types of action_urls
            switch (response.action_url) {
                case "/account/verify_auth": {
                    console.info(
                        `[Message] Starting Sweep WebSocket Realtime Session.`
                    );
                }
                case "/directory/home": {
                    socket.send(
                        JSON.stringify({
                            action_url: "/directory/home",
                            http_type: "GET",
                            unique_query_id: "12345",
                        })
                    );
                    console.info(`[Message] Retrieving directory.`);
                }
            }
        } else if (response?.action) {
            // Handle all the different types of actions
            switch (response) {
                case "watch_stream_auth": {
                    socket.send(
                        JSON.stringify({
                            ws_action: "watch",
                            watch_streams: [
                                "3abeb1e3-9a77-47bc-ba1d-18fe9812f8c0",
                            ],
                        })
                    );
                    console.log(`[Message] Creating a Watch Stream.`);
                }
            }
        }
    } else {
        // Determine which type of message we are dealing with
        if (response?.action_url) {
            // Handle all the different types of action_urls
            switch (response.action_url) {
                case "/account/verify_auth": {
                    console.warn(
                        `[Message] Unable to verify your account on this real time stream.`
                    );
                }
                case "/directory/home": {
                    console.warn(`[Message] Failed to retrieve directory.`);
                }
            }
        } else if (response?.action) {
            // Handle all the different types of actions
            switch (response) {
                case "watch_stream_auth": {
                    console.warn(`[Message] Unable to create a watch stream.`);
                }
            }
        }
    }
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.info(
            `[close] Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
    } else {
        console.warn(`[close] Connection died`);
    }
};

socket.onerror = (error) => {
    console.error(`[error] ${error.message}`);
};

module.exports = socket;