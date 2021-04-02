const Modbus = require("./src/modbus");
const meterdata = require("./data/meter.json");
const meterdatalist = Object.keys(meterdata);

const mb = new Modbus();

const main = async () => {
    await mb.connect(1);
    await meterdatalist.map(
        async (meter) => await mb.read(meterdata[meter][0])
    );
};

main();
