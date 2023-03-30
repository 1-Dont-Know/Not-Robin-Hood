import express from "express";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";

// FOR WORKING WITH ENVIRONMENT VARIABLES
dotenv.config();

// CONNECTION TO OUR DATABASE
const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

const port = process.env.PORT || 5500;

// FRAMEWORK WE WILL USE FOR BUILDING OUR API
const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// ? To parse incoming requests with JSON payloads
app.use(express.json());

// ? To Parse Cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("WELCOME TO HOBIN ROOD APP SERVER");
});

// ! USER REGISTRATION

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // // Generate a JWT token
    // const token = jwt.sign({ id: user.id }, "secret", {
    //   expiresIn: "1h",
    // });
    await connection.query(
      "INSERT INTO users (name, email, password, isAuthorized, balance, phone) VALUES (?, ?, ?, 1, 0, 0)",
      [name, email, hashedPassword]
    );

    // res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// * USER AUTH

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // retrieve the user's asset value from the database
    const [rows] = await connection.query(
      "INSERT INTO users (name, password, email, isAuthorized, balance, phone) VALUES (?, ?, ?, 1, 0, 0)",
      [name, email, password]
    );

    // return the user's asset value
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ? USER ID REQUEST
app.get("/users/:id", async (req, res) => {
  try {
    // extract the id from the request
    const id = req.params.id;

    // fetch the user data from the database
    const result = await connection.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    // return the user data
    res.status(200).json(result[0]);
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ASSET VALUE REQUEST
app.get("/users/:userId/asset", async (req, res) => {
  const { userId } = req.params;

  try {
    // retrieve the user's asset value from the database
    const [rows] = await connection.query(
      "SELECT value FROM user_asset_value WHERE user_id = ?",
      [userId]
    );

    // return the user's asset value
    res.json({ value: rows[0].value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// ASSET CONDITION REQUEST
app.get("/users/:userId/condition", async (req, res) => {
  const { userId } = req.params;

  try {
    // retrieve the user's asset condition from the database
    const [rows] = await connection.query(
      "SELECT condition FROM user_asset_value WHERE user_id = ?",
      [userId]
    );

    // return the user's asset condition
    res.json({ condition: rows[0].condition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// ASSET PERCENTAGE REQUEST
app.get("/users/:userId/percentage", async (req, res) => {
  const { userId } = req.params;

  try {
    // retrieve the user's asset condition from the database
    const [rows] = await connection.query(
      "SELECT * FROM user_asset_value WHERE user_id = ?",
      [userId]
    );

    // return the user's asset condition
    res.json({ percentage: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// USER NOTIFICATIONS REQUEST
app.get("/users/:userId/notifications", async (req, res) => {
  const { userId } = req.params;

  try {
    // retrieve the user's asset condition from the database
    const [rows] = await connection.query(
      "SELECT message FROM user_notifications WHERE user_id = ?",
      [userId]
    );

    // return the user's asset condition
    res.json({ message: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// BALANCE REQUEST
app.get("/users/:userId/balance", async (req, res) => {
  const { userId } = req.params;

  try {
    // retrieve the user's balance from the database
    const [rows] = await connection.query(
      "SELECT balance FROM users WHERE id = ?",
      [userId]
    );

    // return the user's balance
    res.json({ balance: rows[0].balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//? ADD BALANCE REQUEST

app.patch("/users/:id", async (req, res) => {
  try {
    // extract the id and balance from the request
    const id = req.params.id;
    const { amount } = req.body;

    // update the balance in the database
    await connection.query(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [amount, id]
    );

    // return a success response
    res.status(200).json({ message: "User balance updated successfully" });
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  GET REQUEST TO DISPLAY USERS

app.get("/users/", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// GET REQUEST TO DISPLAY PORTFOLIO

app.get("/portfolio", async (req, res) => {
  try {
    const query = "SELECT * FROM user_portfolio_stocks";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// * INSERT NEW STOCK INSIDE PORTFOLIO

app.post("/portfolio", async (req, res) => {
  try {
    const query =
      "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, amount, share, price, averageCost, totalReturn, equity) VALUES (1, 6, 'HoangCoing', 'HNC', 100, 50, 150, 140, 1000, 15000)";
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// TO CHECK IF OUR APP US RUNNING AND ON WHICH PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));
