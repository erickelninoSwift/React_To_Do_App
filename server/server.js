const express = require("express");
const dotenv = require("dotenv");
const { pool } = require("./database");
dotenv.config();
const PORT = process.env.PORT ?? 8080;
const app = express();

app.get("/todos", async (request, response) => {
  const email = "erick@yahoo.com";
  try {
    const getAlldata = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [email]
    );
    response.status(200).json({
      data: getAlldata.rows,
    });
    console.log(getAlldata.rows[0]);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
});

app.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
