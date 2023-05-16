import connectDB from "../../config/database.js";

class PortfolioController {
  async getPortfolioStocks(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userId } = req.params;
    try {
      const query = "SELECT * FROM user_portfolio_stocks WHERE user_id = ?";
      const [rows] = await connection.query(query, [userId]);
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }

  async addPortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, symbol, priceBought, company, share, cost } = req.body;
    console.log(userID, id, symbol, priceBought, company, share, cost);
    try {
      const query =
        "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, amount, share, price, averageCost, totalReturn, equity) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0)";
      const [rows] = await connection.query(query, [
        userID,
        id,
        company,
        symbol,
        priceBought,
        share,
        cost,
      ]);
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }
  async deletePortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, symbol, company } = req.params;
    console.log("delete function called", userID, symbol, company);
    try {
      const query =
        "DELETE FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ? AND name = ? LIMIT 1";
      const [rows] = await connection.query(query, [userID, symbol, company]);
      res.json(rows);
    } catch (err) {
      console.log(err);
    }
  }

  async getPortfolioTotalValue(req, res, next) {}
}

export default new PortfolioController();
