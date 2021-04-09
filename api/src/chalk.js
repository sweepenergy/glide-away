const chalk = require("chalk"); // require chalk module to give colors to console text

const connected = chalk.bold.cyan;
const warning = chalk.bold.yellow;
const termination = chalk.bold.red;

module.exports = {
  connected,
  warning,
  termination
};