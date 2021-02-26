// Basic Modbus connection
const ModbusRTU = require("modbus-serial");
const chalk = require("chalk");
const PORT = 5020;

const client = new ModbusRTU();
client
	.connectTCP("localhost", { port: PORT })
	.then(() => {
		console.log("TCP Protocol " + chalk.keyword("orange")("Connected") + ` on port ${chalk.green(PORT)}`);
	})
	.catch((e) => {
		console.error(chalk.red(e.message));
	});
client.setID(1);

// set a timout for requests default is null (no timeout)
client.setTimeout(500);

const getMetersValue = async () => {
	try {
		// output value to console
		await getMeterValue();
		// wait 100ms before get another device
		await sleep(1000);
	} catch (e) {
		// if error, handle them here (it should not)
		console.error(chalk.red(e));
	} finally {
		// after get all data from salve repeate it again
		setImmediate(() => {
			getMetersValue();
		});
	}
};

const getMeterValue = async () => {
	try {
		// wait before maiking request due to promise
		await client.readHoldingRegisters("1099", 2, (err, data) => {
			if (err)
				console.error(
					`Error reading holding register: ${chalk.red(
						JSON.stringify(err)
					)}`
				);
			else
				console.log(
					chalk.white.bold("Data [1099, 2]: ") +
						`${chalk.blue(JSON.stringify(data))}` +
						chalk.white.bold(", buffer: ") +
						`${chalk.yellow(data.buffer.readFloatBE())}`
				);
		});
		await client.readHoldingRegisters("1101", 2, (err, data) => {
			if (err)
				console.error(
					`Error reading holding register: ${chalk.red(
						JSON.stringify(err)
					)}`
				);
			else
				console.log(
					chalk.white.bold("Data [1101, 2]: ") +
						`${chalk.blue(JSON.stringify(data))}` +
						chalk.white.bold(", buffer: ") +
						`${chalk.yellow(data.buffer.readFloatBE())}`
				);
		});
	} catch (e) {
		console.log(`Error reading holding register: ${e}`);
	}
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// start get value
getMetersValue();

const meterdata = {
	AmpsA: [1100 - 1, 1101 - 1],
	AmpsB: [1102 - 1, 1103 - 1],
	AmpsC: [1104 - 1, 1105 - 1],
	Watts3Total: [1106 - 1, 1107 - 1],
	Var3Total: [1108 - 1, 1109 - 1],
	Va3Total: [1110 - 1, 1111 - 1],
	PowerFactor: [1112 - 1, 1113 - 1],
	"Neutral current": [1114 - 1, 1115 - 1],
	WattsA: [1116 - 1, 1117 - 1],
	WattsB: [1118 - 1, 1119 - 1],
	WattsC: [1120 - 1, 1121 - 1],
	VarA: [1122 - 1, 1123 - 1],
	VarB: [1124 - 1, 1125 - 1],
	VarC: [1126 - 1, 1127 - 1],
	VaA: [1128 - 1, 1129 - 1],
	VaB: [1130 - 1, 1131 - 1],
	VaC: [1132 - 1, 1133 - 1],
	PowerFactorA: [1134 - 1, 1135 - 1],
	PowerFactorB: [1136 - 1, 1137 - 1],
	PowerFactorC: [1138 - 1, 1139 - 1],
};

const meterdatalist = [
	"AmpsA",
	"AmpsB",
	"AmpsC",
	"Watts3Total",
	"Var3Total",
	"Va3Total",
	"PowerFactor",
	"NeutralCurrent",
	"WattsA",
	"WattsB",
	"WattsC",
	"VarA",
	"VarB",
	"VarC",
	"VaA",
	"VaB",
	"VaC",
	"PowerFactorA",
	"PowerFactorB",
	"PowerFactorC",
];
