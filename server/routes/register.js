import express from "express";
import handleNewUser from "../controllers/registerController.js";

const router = express.Router();

const registrationRoute = router.post("/", handleNewUser);

export default registrationRoute;
