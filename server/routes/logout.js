import express from "express";
import handleLogout from "../controllers/logoutController.js";
const router = express.Router();

const logoutRoute = router.post("/", handleLogout);

export default logoutRoute;
