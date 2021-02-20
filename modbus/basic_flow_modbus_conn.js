// Basic Modbus connection
var ModbusRTU = require("modbus-serial");
a = new ModbusRTU();
a.connectTCP("localhost",{ port: 5020 })
a.setID(1)

// wait before maiking request due to promise
a.readHoldingRegisters("1099", 2, function(err, data) {console.log(err);console.log(data);console.log(data.buffer.readFloatBE())})
a.readHoldingRegisters("1101", 2, function(err, data) {console.log(err);console.log(data);console.log(data.buffer.readFloatBE())})






var meterdata = {
"AmpsA"
"AmpsB"
"AmpsC"
"Watts3Total"
"Var3Total"
"Va3Total"
"PowerFactor"
"Neutral current":[1114-1 , 1115-1],
"WattsA":[1116-1 , 1117-1],
"WattsB":[1118-1 , 1119-1],
"WattsC":[1120-1 , 1121-1],
"VarA":[1122-1 , 1123-1],
"VarB":[1124-1 , 1125-1],
"VarC":[1126-1 , 1127-1],
"VaA":[1128-1 , 1129-1],
"VaB":[1130-1 , 1131-1],
"VaC":[1132-1 , 1133-1],
"PowerFactorA":[1134-1 , 1135-1],
"PowerFactorB":[1136-1 , 1137-1],
"PowerFactorC":[1138-1 , 1139-1]
}

var meterdatalist = [
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
"PowerFactorC"
]
