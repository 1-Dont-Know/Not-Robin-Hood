import express from "express";
import ApiController from "../controllers/api/apiController.js";
const router = express.Router();

// User's registration
router.post("/register", ApiController.registration);

// User's login
router.post("/login", ApiController.login);

// User's logout
router.post("/logout", ApiController.logout);

// User's refresh token
router.post("/refresh", ApiController.refresh);

// User's cahnge password
// router.patch("/changepassword",ApiController.changePassword);

export default router;
