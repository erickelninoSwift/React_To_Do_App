const express = require("express");
const dotenv = require("dotenv");
const { pool } = require("./database");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT ?? 8080;
const app = express();

app.use(cors());
app.get("/todos/:userEmail", async (request, response) => {
  const email = "erick@yahoo.com";
  const { userEmail } = request.params;
  try {
    const getAlldata = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    return response.status(200).json({
      data: getAlldata.rows,
    });
  } catch (error) {
    console.log(`Error : ${error}`);
    return response.status(404).json({
      message: `Error found ${error}`,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
