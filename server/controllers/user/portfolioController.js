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
    const { userID, id, symbol, stockPrice, company, share, totalCost, date } =
      req.body;
    console.log(
      userID,
      id,
      symbol,
      stockPrice,
      company,
      share,
      totalCost,
      date
    );
    const averageCost = totalCost / share;
    const totalReturn = 0;

    /*
    total cost = amount of stocks * the price it was purchased (e.x 06/01/23)
      total return = fetched new price * amount of stocks  - total cost
      
    
    */
    const equity = stockPrice * share;
    const query =
      "SELECT * FROM user_portfolio_stocks WHERE user_id = ? AND symbol = ?";
    const [rows] = await connection.query(query, [userID, symbol]);
    const match = rows[0];
    console.log("Matched stock", match);
    if (match) {
      const updatedShare = share;
      const updateStockQuery =
        "UPDATE user_portfolio_stocks SET share = share + ?, stockPrice = stockPrice + ?, totalCost = totalCost + ?, purchased_at = ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [rows] = await connection.query(updateStockQuery, [
        updatedShare,
        stockPrice,
        totalCost,
        date,
        userID,
        match.id,
        symbol,
      ]);
      res.json(rows);
    }
    try {
      if (!match) {
        const query =
          "INSERT INTO user_portfolio_stocks (user_id, id, name, symbol, stockPrice, share, totalCost, averageCost, totalReturn, equity, purchased_at) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)";
        const [rows] = await connection.query(query, [
          userID,
          id,
          company,
          symbol,
          stockPrice,
          share,
          totalCost,
          averageCost,
          totalReturn,
          equity,
          date,
        ]);
        res.json(rows);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async modifyPortfolioStock(req, res, next) {
    // Establishing connection to our PlanetScale DB
    const connection = await connectDB();
    const { userID, id, share, symbol, stockPrice, totalCost, date } = req.body;
    console.log(
      "Info for stock modification:",
      userID,
      id,
      share,
      symbol,
      stockPrice,
      totalCost
    );

    try {
      const query =
        "UPDATE user_portfolio_stocks SET share = ?, stockPrice = stockPrice - ?, totalCost = totalCost - ?, purchased_at = ? WHERE user_id = ? AND id = ? AND symbol = ?";
      const [rows] = await connection.query(query, [
        share,
        stockPrice,
        totalCost,
        date,
        userID,
        id,
        symbol,
      ]);
      res.json(rows);
    } catch (error) {
      console.log(error);
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
