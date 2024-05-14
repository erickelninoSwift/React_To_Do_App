const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: "",
  host: "localhost",
  port: process.env.DBPORT,
  database: process.env.DBNAME,
});

module.exports = { pool };
