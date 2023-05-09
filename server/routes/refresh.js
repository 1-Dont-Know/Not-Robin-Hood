import express from "express";
import handleRefreshToken from "../controllers/refreshTokenController.js";
const router = express.Router();
const refreshRoute = router.post("/", handleRefreshToken);

export default refreshRoute;
