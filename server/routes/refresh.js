import express from "express";
import handleRefreshToken from "../controllers/refreshTokenController.js";
const router = express.Router();
const refreshRoute = router.get("/", handleRefreshToken);

export default refreshRoute;
