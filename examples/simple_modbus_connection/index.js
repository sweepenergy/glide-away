const Modbus = require("./modbus");

const main = async () => {
	mb = new Modbus({ port: 5020, environment: "localhost" });
	response = await mb.connect(1);
	console.log("res msg 1 ", response.message);
	if (response.status === "connected") {
		response = await mb.stream();
	}
};

main();
