const express = require("express");
const dotenv = require("dotenv");
const { pool } = require("./database");
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/todos/:userEmail", async (request, response) => {
  const { userEmail } = request.params;
  try {
    const getAlldata = await pool.query("SELECT * FROM todos");
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

// create todo

app.post("/todos", async (request, response) => {
  const { user_email, title, progress, date } = request.body;

  const id = uuidV4();
  try {
    await pool.query(
      `INSERT INTO todos (id,user_email,title,progress,data) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );

    response.status(200).json({
      message: "done",
    });
  } catch (error) {
    return response.status(400).json({
      ok: false,
      message: "Failed",
    });
  }
});

app.put("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const { user_email, title, progress, date } = request.body;
  try {
    const getAlldata = await pool.query("SELECT * FROM todos");

    const isDataExist = getAlldata.rows.find((data) => data.id === id);
    if (isDataExist) {
      await pool.query(
        "UPDATE todos SET user_email = $1, title = $2, progress = $3, data = $4 WHERE id = $5;",
        [user_email, title, progress, date, id]
      );

      return response.status(200).json({
        data: { user_email, title, progress, date },
      });
    }

    return response.status(400).json({
      data: "Not Found",
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const getAlldata = (await pool.query("SELECT * FROM todos")).rows;
  const findDatatodelete = getAlldata.find((data) => data.id === id);
  if (findDatatodelete) {
    try {
      await pool.query("DELETE FROM todos WHERE id = $1;", [id]);
      return response.status(200).json({
        data: "Deleted with success",
      });
    } catch (error) {
      return response.status(400).json({
        error: error,
      });
    }
  }
  return response.status(404).json({
    data: "No record found with this ID",
  });
});

// Sign up
app.post("/signup", async (request, response) => {
  const { email, password } = request.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);
  try {
    await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1 , $2)",
      [email, hashedpassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    return response.json({ email, token });
  } catch (error) {
    console.error(error);
    if (error) {
      return response.json({ detail: error.detail });
    }
  }
});

// Login

app.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const allUserData = (await pool.query("SELECT * from users")).rows;
    const checkUserexist = await allUserData.find(
      (user) => user.email === email && user.hashed_password === password
    );
    if (checkUserexist) {
      return response.status(200).json({
        data: "Logged in with success",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/users", async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    console.log(allUsers.rows);
    return response.status(200).json({
      users: allUsers.rows,
    });
  } catch (error) {
    console.error(error);
  }
});
app.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
