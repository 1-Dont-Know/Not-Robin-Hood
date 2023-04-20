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
import { body, validationResult } from "express-validator";

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
  res.json(`WELCOME TO HOBIN ROOD REST API`);
});

const IS_AUTHORIZED = 1;
const DEFAULT_BALANCE = 0;
const DEFAULT_PHONE = 0;

// ! USER REGISTRATION
app.post(
  "/register",

  // ********************** START OF VALIDATION OF INPUTS VALUES FROM CLIENT (SIGNUP FORM) **********************
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail({ gmail_remove_dots: false }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  // ********************** END OF VALIDATION OF INPUTS VALUES FROM CLIENT (SIGNUP FORM) **********************
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ message: "Name, email and password are requried." });
      }

      // ********************** START OF CHECKING FOR DUPLICATE EMAILS IN DB (SIGNUP FORM) **********************
      const user = await connection.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (user[0].length) {
        return res.status(400).json({ message: "Email already exists." });
      }
      // ********************** END OF CHECKING FOR DUPLICATE EMAILS IN DB (SIGNUP FORM) **********************

      // ********************** START OF REGISTERING USER **********************
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await connection.query(
        "INSERT INTO users (name, email, password, isAuthorized, balance, phone) VALUES (?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          hashedPassword,
          IS_AUTHORIZED,
          DEFAULT_BALANCE,
          DEFAULT_PHONE,
        ]
      );
      res.json({ message: "User successfully registered." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error." });
    }
  }
);
// ********************** END OF REGISTERING USER **********************

// ? DELETE USER

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    const [rows] = await connection.query(deleteQuery, [id]);
    res.json({
      message: "User was deleted",
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// * USER AUTH

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });
  } else if (!isValidEmail(email)) {
    return res.json({
      status: "error",
      error: "Please enter a valid email",
    });
  } else {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (rows.length === 0) {
        return res.json({
          status: "error",
          error: "Email not found",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, rows[0].password);
      if (!isPasswordValid) {
        return res.json({
          status: "error",
          error: "Incorrect password",
        });
      }
      // create JWTs
      // ! ACCESS TOKEN
      const accessToken = jwt.sign(
        { userId: rows[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRY,
        }
      );

      // ! REFRESH TOKEN
      const refreshToken = jwt.sign(
        { userId: rows[0].id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );
      // Store refresh token in a cookie
      res.cookie("refreshToken", refreshToken, {
        // to prevent client-side access to the cookie
        // httpOnly: false,
        // //to ensure the cookie is only transmitted over HTTPS in development (by default), in future should be changed to 'production'
        // secure: process.env.NODE_ENV === "development",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return the access token as a response

      return res.json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
});

// ***** REFRESH TOKEN REQUEST

app.post("/auth/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is missing" });
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken.userId) {
      throw new Error("Invalid refresh token");
    }
    const userId = decodedToken.userId;
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

// Email validation
function isValidEmail(email) {
  // A simple regular expression to check if the email is in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

//? ADD (MUTATE) BALANCE REQUEST

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
  const stock_id = 69;
  const symbol = "BVT";

  try {
    const query =
      "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, amount, share, price, averageCost, totalReturn, equity) VALUES (1, ?, 'Darshwak', ?, 100, 50, 150, 140, 1000, 15000)";
    const [rows] = await connection.query(query, [stock_id, symbol]);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});

// TO CHECK IF OUR APP US RUNNING AND ON WHICH PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));
