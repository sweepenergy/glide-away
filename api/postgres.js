const { Client } = require('pg');

const client = new Client({
    user: "docker",
    host: "localhost",
    database: "glide_away",
    password: "docker",
    port: 5432,
  })
  client.connect();

  client.query('SELECT NOW()', (err, res) => {
    console.log(err,res);
    client.end();
  })
