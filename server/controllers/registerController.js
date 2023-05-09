import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import connectDB from "../config/database.js";

// Constants for creating new user, most probably will be changed in future
const IS_AUTHORIZED = 1;
const DEFAULT_BALANCE = 0;
const DEFAULT_PHONE = 0;
const REFRESH_TOKEN = [];

const handleNewUser = async (req, res) => {
  // Establishing connection to our PlanetScale DB
  const connection = await connectDB();

  // Getting credentials from our client, why not :D
  const { name, email, password } = req.body;

  //   Found some express validator with good feedbacks, decided to apply to our registration form validation
  body("name").trim().notEmpty().withMessage("Name is required."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters.");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //   We will not be able to register without provided email / password  / name :)
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Name, email and password are requried." });
  }

  // Before registering new user, we should check if there's a registered user with existing email in our database
  const user = await connection.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  //   Once we found a duplicate, we will send a response with status code 409 and a message
  //   HTTP 409 error status: The HTTP 409 status code (Conflict) indicates that the request could not be processed because of conflict in the request
  if (user[0].length) {
    return res.sendStatus(409).json({ message: "Email already exists." });
  }

  // Let's get started with creating a new user in our database
  try {
    // Adding some salt to our password soup :D
    // Hashing combined with salts protects you against rainbow table attacks!
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create and store new user
    const result = await connection.query(
      "INSERT INTO users (name, email, password, isAuthorized, balance, phone, refreshToken) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        IS_AUTHORIZED,
        DEFAULT_BALANCE,
        DEFAULT_PHONE,
        JSON.stringify(REFRESH_TOKEN),
      ]
    );
    res.status(201).json({ message: "User successfully registered." });
    await connection.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handleNewUser;
