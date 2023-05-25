import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import router from "./routes/root.js";
import userRouter from "./routes/user.js";

// Working with env files
dotenv.config();

// Setting our server's port
const port = process.env.PORT || 5500;

// Initializing our server by using express framework
const app = express();

// Handling options credentials check - before CORS!
// and fetching cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

// Parsing incoming requests with JSON payloads
app.use(express.json());

// Middleware for parsing Cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json(`WELCOME TO HOBIN ROOD REST API`);
});

// Routes
app.use("/api", router);

// Protected requests by JWT verification middleware *** PROTECTED ENDPOINTS
app.use(verifyJWT);

app.use("/user", userRouter);

// TO CHECK IF OUR APP US RUNNING AND ON WHICH PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));
