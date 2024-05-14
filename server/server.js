const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT ?? 8080;
const app = express();

app.get("/todos", (request, response) => {
  response.send("<H1>Hello World ! </h1>");
});
app.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
