import express from "express";
import handleLogin from "../controllers/authController.js";

const router = express.Router();
const authRoute = router.post("/", handleLogin);

export default authRoute;
