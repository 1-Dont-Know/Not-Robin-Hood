import express from "express";
import assetController from "../controllers/user/assetController.js";
import balanceController from "../controllers/user/balanceController.js";
import notificationsController from "../controllers/user/notificationsController.js";
import transactionsController from "../controllers/user/transactionsController.js";
import portfolioController from "../controllers/user/portfolioController.js";
import userInfoController from "../controllers/user/userInfoController.js";
import apiController from "../controllers/api/apiController.js";

const userRouter = express.Router();

// User's general info routes
userRouter.get("/:id/info", userInfoController.getDetails);

// Get Search Stock Results

userRouter.get("/search/:query", userInfoController.getStockTicker);

// User's Notifications routes
userRouter.get(
  "/:userId/notifications",
  notificationsController.getNotifications
);

// User's Asset routes
userRouter.get("/:userId/asset", assetController.getAsset);

// User's Transactions routes
userRouter.get("/:userId/transactions", transactionsController.getTransactions);
userRouter.post(
  "/:userID/transactions/update",
  transactionsController.updateTransactions
);

// User's Balance routes
userRouter.get("/:userId/balance", balanceController.getBalance);
userRouter.patch("/balance/:id", balanceController.changeBalance);

// User's Stocks routes
userRouter.get(
  "/:userId/portfolio/stocks",
  portfolioController.getPortfolioStocks
);
userRouter.post("/portfolio/stocks", portfolioController.addPortfolioStock);

userRouter.patch(
  "/portfolio/stocks/update",
  portfolioController.modifyPortfolioStock
);

userRouter.patch(
  "/portfolio/stocks/return/update",
  portfolioController.setTotalReturnValues
);
userRouter.delete(
  "/portfolio/stocks/:userID/:symbol/:company",
  portfolioController.deletePortfolioStock
);

// User's Change Password route
userRouter.patch("/changepassword/update", apiController.changePassword);

// User's Change Name route
userRouter.patch("/changename/update", apiController.changeName);

export default userRouter;
