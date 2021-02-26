var ws = require("ws");
// AUTH INFO
auth_user_id = ""; /// user key from api_keys
auth_token = ""; // token from api_keys

endpoint = "wss://rt.sweepapi.com";

let socket = new ws(
	endpoint + "/?auth_user=" + auth_user_id + "&auth_key=" + auth_token
);

queries = 0;
safe_to_send = 0;
socket.onopen = function (e) {
	console.log("Sending to server");
};

socket.onmessage = function (event) {
	queries = queries + 1;

	console.log(event.data);
	res = JSON.parse(event.data);

	if (res["action_url"] == "/account/verify_auth") {
		if (res["status"] == "ok") {
			safe_to_send = 1;
			console.log("Starting Sweep WS Realtime Session");

			// CREATE A WATCH STREAM Requests
			// const msg = {"ws_action": "watch", "watch_streams":["c2ee0061-1b7e-4311-968c-083e1c0d672b"]}
			// socket.send(JSON.stringify(msg));

			// TEST POST Request when using REALTIME API

			// // START : CREATE A DIRECTORY IN TOPLEVEL HOME
			// TEST_MESSAGE = {}
			// TEST_MESSAGE["action_url"] = "/directory";
			// TEST_MESSAGE["http_type"] = "POST";
			// // PAYLOAD defines JSON object sent in body of HTTP Request when using normal HTTP POST api.
			// TEST_MESSAGE["payload"] = {
			//     "name" : "WS Created Directory"
			//   }
			// TEST_MESSAGE["unique_query_id"] = "2345";
			// socket.send(JSON.stringify(TEST_MESSAGE));
			// // END : CREATE A DIRECTORY IN TOPLEVEL HOME

			// TEST GET Requests when using REALTIME API

			// // START : GET HOME DIRECTORY
			// const TEST_MESSAGE = {}
			// TEST_MESSAGE["action_url"] = "/directory/home";
			// TEST_MESSAGE["http_type"] = "GET";
			// TEST_MESSAGE["unique_query_id"] = "12345";
			// socket.send(JSON.stringify(TEST_MESSAGE));
			// console.log("Sending GET message")
			// // END : GET HOME DIRECTORY

			// // START : GET HOME DIRECTORY IN INTERVAL
			// function intervalFunc() {
			//   const TEST_MESSAGE = {}
			//   TEST_MESSAGE["action_url"] = "/directory/home";
			//   TEST_MESSAGE["http_type"] = "GET";
			//   TEST_MESSAGE["unique_query_id"] = "12345";
			//   console.log(TEST_MESSAGE)
			//   socket.send(JSON.stringify(TEST_MESSAGE));
			//   console.log("Sending GET message")
			// }
			//
			// setInterval(intervalFunc, 4000);
			// // END : GET HOME DIRECTORY IN INTERVAL

			// // START : GET DIRECTORY GIVEN id
			// TEST_MESSAGE = {}
			// TEST_MESSAGE["action_url"] = "/directory/_DIRECTORY_ID_";
			// TEST_MESSAGE["http_type"] = "GET";
			// TEST_MESSAGE["unique_query_id"] = "1234";
			// socket.send(JSON.stringify(TEST_MESSAGE));
			// // END : GET DIRECTORY GIVEN id

			// // START : GET STREAM GIVEN id
			// TEST_MESSAGE = {}
			// TEST_MESSAGE["action_url"] = "/stream/_STREAM_ID_";
			// TEST_MESSAGE["http_type"] = "GET";
			// TEST_MESSAGE["unique_query_id"] = "1234";
			// socket.send(JSON.stringify(TEST_MESSAGE));
			// // END : GET STREAM GIVEN id
		} else {
			console.log(
				"Unable to verify your account on thie real time stream. Try again."
			);
		}
	}
};

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log(
			`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
		);
	} else {
		// e.g. server process killed or network down
		// event.code is usually 1006 in this case
		console.log("[close] Connection died");
	}
};

socket.onerror = function (error) {
	console.log(`[error] ${error.message}`);
};

var count = 0;
