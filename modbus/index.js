const Modbus = require("./modbus");

const main = async () => {
	// let mb = new Modbus({ port: 5021, environment: "localhost" });
	// let response = await mb.connect(1);
	// console.log(response.message);
	// if (response.status === "connected") {
	// 	response = await mb.readAll();
	// 	console.table(response);
	// }

	mb = new Modbus({ port: 5020, environment: "localhost" });
	response = await mb.connect(1);
	console.log("res msg 1 ", response.message);
	if (response.status === "connected") {
		response = await mb.stream();
		// console.table("res data 1 ", response);
	}

	// await mb.stream();

	for (let i = 0; i < 20000000; i++) {
		if (i === 20000000 / 2) {
			mb2 = new Modbus({ port: 5020, environment: "localhost" });
			response = await mb2.connect(2);
			console.log("res msg 2 ", response.message);
			if (response.status === "connected") {
				response = await mb2.stream();
				// console.table("res data 2 ", response);
			}
		}
	}
};

main();
