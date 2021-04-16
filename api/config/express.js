const express = require("express");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("../routes/router");

/**
 * Express Instance
 * @public
 */
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// gzip compression
app.use(compress());

// lets one use HTTP verbs such as PUT or DELETE in places where the client does not support them
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use("/api", routes);

module.exports = app;
